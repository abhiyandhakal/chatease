import { and, desc, eq, or } from "drizzle-orm";
import { db } from "../db";
import { dmChannel } from "../db/schema/relations/dm-channel";
import { users } from "../db/schema/user";
import { error } from "elysia";
import { v4 } from "uuid";
import { directMessage } from "../db/schema/relations/direct-message";
import { messages } from "../db/schema/message";
import { groupHasMessage } from "../db/schema/relations/group-has-message";
import { onlineUsers } from "../routes/ws";
import GroupService from "./group";
import { userInGroup } from "../db/schema/relations/user-in-group";

class ChatService {
  constructor() {}

  async getDirectChats(user: typeof users.$inferInsert) {
    const dbRes = await db
      .select()
      .from(dmChannel)
      .where(
        or(eq(dmChannel.senderId, user.id), eq(dmChannel.receiverId, user.id)),
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
            id: otherUser.id,
            username: otherUser.username,
            fullName: otherUser.fullName,
            profilePic: otherUser.profilePic,
            is_online: onlineUsers.has(otherUser.id),
          },
        };
      }),
    );

    return {
      success: true,
      data: chats,
    };
  }

  async getAllChats(username: string) {
    // TODO: Pagination
    const userArr = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (userArr.length === 0) {
      return error(401);
    }
    const user = userArr[0];

    const directChatsRes = await this.getDirectChats(user);
    const hasSuccess = "success" in directChatsRes;
    if (!hasSuccess || !directChatsRes.success) {
      return directChatsRes;
    }
    const directChats = directChatsRes.data;

    const groupService = new GroupService();
    const groupChatsRes = await groupService.getAllGroups(user.id, 0, 100);
    const groupChats = await Promise.all(
      groupChatsRes.groups.map(async (group) => {
        const groupUsersArr = await db
          .select()
          .from(users)
          .innerJoin(userInGroup, eq(users.id, userInGroup.userId))
          .where(eq(userInGroup.groupId, group.id));
        const groupUsers = groupUsersArr.map((item) => ({
          id: item.users.id,
          username: item.users.username,
          fullName: item.users.fullName,
          profilePic: item.users.profilePic,
          is_online: onlineUsers.has(item.users.id),
        }));

        return {
          type: "group",
          id: group.id,
          name: group.name,
          description: group.description,
          owner: {
            id: group.createdBy,
            username: group.createdBy,
            fullName: group.createdBy,
            profilePic: null,
            is_online: false,
          },
          users: groupUsers,
        };
      }),
    );

    return {
      success: true,
      data: [...directChats, ...groupChats],
    };
  }

  async createDmChannel(ownUsername: string, otherUserUsername: string) {
    try {
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

      // Check if a channel already exists
      const existingChannelArr = await db
        .select()
        .from(dmChannel)
        .where(
          or(
            and(
              eq(dmChannel.senderId, ownUserId),
              eq(dmChannel.receiverId, otherUserId),
            ),
            and(
              eq(dmChannel.senderId, otherUserId),
              eq(dmChannel.receiverId, ownUserId),
            ),
          ),
        );

      const newId = v4();

      if (existingChannelArr.length === 0) {
        await db.insert(dmChannel).values({
          id: newId,
          senderId: ownUserId,
          receiverId: otherUserId,
        });
      }

      return {
        success: true,
        data: <Chat>{
          type: "direct",
          id:
            existingChannelArr.length === 0 ? newId : existingChannelArr[0].id,
          user: {
            fullName: otherUserArr[0].fullName,
            username: otherUserArr[0].username,
            profilePic: otherUserArr[0].profilePic,
            is_online: onlineUsers.has(otherUserArr[0].id),
          },
        },
      };
    } catch (err) {
      return error(
        500,
        err instanceof Error ? err.message : "Internal server error",
      );
    }
  }

  async getMessages(
    channelId: string,
    type: "direct" | "group",
    limit: number = 20,
    offset: number = 0,
  ) {
    try {
      const dbRes =
        type === "direct"
          ? await db
              .select()
              .from(messages)
              .innerJoin(
                directMessage,
                eq(messages.id, directMessage.messageId),
              )
              .where(eq(directMessage.channelId, channelId))
              .orderBy(desc(messages.createdAt))
              .limit(limit)
              .offset(offset * limit)
          : await db
              .select()
              .from(messages)
              .innerJoin(
                groupHasMessage,
                eq(messages.id, groupHasMessage.messageId),
              )
              .where(eq(groupHasMessage.groupId, channelId))
              .limit(limit)
              .offset(offset * limit);

      const dbMessages = dbRes.reverse().map((data) => data.messsages);
      const messagesWithUser: ChatMessage[] = await Promise.all(
        dbMessages.map(async (message) => {
          const userArr = await db
            .select()
            .from(users)
            .where(eq(users.id, message.senderId));
          const user = userArr[0];

          return {
            ...message,
            sender: {
              id: user.id,
              username: user.username,
              fullName: user.fullName,
              profilePic: user.profilePic,
              is_online: onlineUsers.has(user.id),
            },
          };
        }),
      );
      return {
        success: true,
        data: {
          chatId: channelId,
          messages: messagesWithUser,
        },
      };
    } catch (err) {
      return error(
        500,
        err instanceof Error ? err.message : "Internal server error",
      );
    }
  }
}

export default ChatService;
