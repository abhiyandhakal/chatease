import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { error } from "elysia";
import { messages } from "../db/schema/message";

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
      .where(and(eq(messages.id, messageId), eq(messages.senderId, userId)));

    if (updatedMessageArr.length === 0) {
      return error(404, { success: false, message: "Message not found" });
    }

    return {
      success: true,
      message: updatedMessageArr[0],
    };
  }
}

export default MessageService;
