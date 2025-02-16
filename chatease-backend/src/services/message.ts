import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { error } from "elysia";
import { messages } from "../db/schema/message";
import { directMessage } from "../db/schema/relations/direct-message";
import { groupHasMessage } from "../db/schema/relations/group-has-message";

class MessageService {
  constructor() {}

  async editMessage({
    messageId,
    userId,
    message,
  }: {
    messageId: string;
    userId: string;
    message: string;
  }) {
    const updatedMessageArr = await db
      .update(messages)
      .set({ content: message })
      .where(and(eq(messages.id, messageId), eq(messages.senderId, userId)))
      .returning();

    if (updatedMessageArr.length === 0) {
      return error(404, { success: false, message: "Message not found" });
    }

    return {
      success: true,
      message: updatedMessageArr[0],
    };
  }

  async deleteMessage(userId: string, messageId: string) {
    try {
      // Check if the message exists and belongs to the user
      const messageArr = await db
        .select()
        .from(messages)
        .where(eq(messages.id, messageId));

      if (messageArr.length === 0 || messageArr[0]?.senderId !== userId) {
        return error(404, { success: false, message: "Message not found" });
      }

      await db.transaction(async (tx) => {
        // Delete references in groupHasMessage (if it's a group message)
        await tx
          .delete(groupHasMessage)
          .where(eq(groupHasMessage.messageId, messageId));

        // Delete references in directMessage (if it's a DM)
        await tx
          .delete(directMessage)
          .where(eq(directMessage.messageId, messageId));

        // Now safely delete from messages
        const deletedMessageArr = await tx
          .delete(messages)
          .where(and(eq(messages.id, messageId), eq(messages.senderId, userId)))
          .returning();

        if (deletedMessageArr.length === 0) {
          throw new Error("Message not found"); // Trigger rollback if message doesn't exist
        }
      });

      return {
        success: true,
        message: `Message ${messageId} deleted successfully`,
      };
    } catch (err) {
      console.error("Error deleting message:", err);
      return error(500, { success: false, message: "Internal server error" });
    }
  }
}

export default MessageService;
