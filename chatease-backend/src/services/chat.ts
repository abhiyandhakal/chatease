import { eq, or } from "drizzle-orm";
import { db } from "../db";
import { dmChannel } from "../db/schema/relations/dm-channel";
import { users } from "../db/schema/user";
import { error } from "elysia";
import { v4 } from "uuid";

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
        const isSender = chat.senderId === user.id;
        const otherUserArr = await db
          .select()
          .from(users)
          .where(eq(users.id, isSender ? chat.receiverId : chat.senderId));
        const otherUser = otherUserArr[0];
        return {
          type: "direct",
          id: chat.id,
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

  async createDmChannel(ownUsername: string, otherUserUsername: string) {
    try {
    } catch (err) {
      return error(
        500,
        err instanceof Error ? err.message : "Internal server error",
      );
    }
    const ownUserArr = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, ownUsername));
    if (ownUserArr.length === 0) {
      return error(401);
    }
    const otherUserArr = await db
      .select()
      .from(users)
      .where(eq(users.username, otherUserUsername));
    if (otherUserArr.length === 0) {
      return error(404, "User not found");
    }
    const ownUserId = ownUserArr[0].id;
    const otherUserId = otherUserArr[0].id;

    await db.insert(dmChannel).values({
      id: v4(),
      senderId: ownUserId,
      receiverId: otherUserId,
    });

    return {
      success: true,
      data: <Chat>{
        type: "direct",
        user: {
          fullName: otherUserArr[0].fullName,
          username: otherUserArr[0].username,
          profilePic: otherUserArr[0].profilePic,
        },
      },
    };
  }
}

export default ChatService;
