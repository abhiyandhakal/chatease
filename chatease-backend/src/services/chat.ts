import { eq, or } from "drizzle-orm";
import { db } from "../db";
import { dmChannel } from "../db/schema/relations/dm-channel";
import { users } from "../db/schema/user";
import { error } from "elysia";

class ChatService {
  constructor() {}

  async getAllChats(username: string) {
    // TODO: Get group chats as well
    const userArr = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (userArr.length === 0) {
      return error(401);
    }
    const user = userArr[0];

    const dbRes = await db
      .select()
      .from(dmChannel)
      .where(
        or(
          eq(dmChannel.senderId, username),
          eq(dmChannel.receiverId, username),
        ),
      );
    const chats: Chat[] = await Promise.all(
      dbRes.map(async (chat) => {
        // const userId =
        //   chat.senderId === user.id ? chat.receiverId : chat.senderId;
        const isSender = chat.senderId === user.id;
        const otherUserArr = await db
          .select()
          .from(users)
          .where(eq(users.id, isSender ? chat.receiverId : chat.senderId));
        const otherUser = otherUserArr[0];
        return {
          type: "direct",
          user: {
            username: otherUser.username,
            fullName: otherUser.fullName,
            profilePic: otherUser.profilePic,
          },
        };
      }),
    );

    return {
      success: true,
      data: chats,
    };
  }
}

export default ChatService;
