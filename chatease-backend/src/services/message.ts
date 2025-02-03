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

  async deleteMessage(userId: string, messageId: string, is_direct: boolean) {
    // check if the message is of the user
    const messageArr = await db
      .select()
      .from(messages)
      .where(eq(messages.id, messageId));

    if (messageArr.length === 0 || messageArr[0]?.senderId !== userId) {
      return error(404, { success: false, message: "Message not found" });
    }

    if (is_direct) {
      await db
        .delete(directMessage)
        .where(eq(directMessage.messageId, messageId));
    } else {
      await db
        .delete(groupHasMessage)
        .where(eq(groupHasMessage.messageId, messageId));
    }

    const deletedMessageArr = await db
      .delete(messages)
      .where(and(eq(messages.id, messageId), eq(messages.senderId, userId)))
      .returning();

    if (deletedMessageArr.length === 0) {
      return error(404, { success: false, message: "Message not found" });
    }

    return {
      success: true,
      message: deletedMessageArr[0],
    };
  }
}

export default MessageService;
