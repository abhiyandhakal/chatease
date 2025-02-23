import Elysia, { t } from "elysia";
import { v4 } from "uuid";
import { db } from "../db";
import { messages } from "../db/schema/message";
import { directMessage } from "../db/schema/relations/direct-message";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/user";
import { groupHasMessage } from "../db/schema/relations/group-has-message";

const channelClients = new Map<string, Set<any>>();
export const onlineUsers = new Map<string, Set<string>>();

const wsRoute = new Elysia({ prefix: "/ws" }).ws("/chat", {
  open(ws) {
    const { channelId, id } = ws.data.query;
    if (!channelClients.has(channelId)) {
      channelClients.set(channelId, new Set());
    }
    channelClients.get(channelId)?.add(ws);

    if (!onlineUsers.has(id)) {
      onlineUsers.set(id, new Set());
    }
    onlineUsers.get(id)?.add(channelId);
  },
  async message(ws, { content, createdAt, id: messageId }) {
    const { id, channelId, type } = ws.data.query;
    const newMessage = {
      id: messageId,
      content,
      senderId: id,
      createdAt,
      updatedAt: null,
    };

    await db.insert(messages).values(newMessage);

    if (type === "direct")
      await db.insert(directMessage).values({
        id: v4(),
        channelId: channelId,
        messageId: newMessage.id,
      });
    else
      await db.insert(groupHasMessage).values({
        id: v4(),
        groupId: channelId,
        messageId: newMessage.id,
      });

    const senderArr = await db.select().from(users).where(eq(users.id, id));
    if (senderArr.length === 0) return "Sender not found";
    const sender = senderArr[0];
    const messageToSend: ChatMessage = {
      ...newMessage,
      sender: {
        id: sender.id,
        username: sender.username,
        fullName: sender.fullName,
        profilePic: sender.profilePic,
      },
    };

    // Broadcast the message to clients in the same channel
    const clientsInChannel = channelClients.get(channelId);
    if (clientsInChannel) {
      for (const client of clientsInChannel) {
        client.send(messageToSend);
      }
    }
  },
  close(ws) {
    const { channelId, id } = ws.data.query;

    const clientsInChannel = channelClients.get(channelId);
    if (clientsInChannel) {
      clientsInChannel.delete(ws);

      if (clientsInChannel.size === 0) {
        channelClients.delete(channelId);
      }
    }

    const userChannels = onlineUsers.get(id);
    if (userChannels) {
      userChannels.delete(channelId);

      if (userChannels.size === 0) {
        onlineUsers.delete(id);
      }
    }
  },
  query: t.Object({
    id: t.String(),
    channelId: t.String(),
    type: t.String(),
  }),
  body: t.Object({
    content: t.String(),
    createdAt: t.String(),
    id: t.String(),
    status: t.String(),
  }),
});

export default wsRoute;
