import Elysia, { t } from "elysia";
import { v4 } from "uuid";
import { db } from "../db";
import { messages } from "../db/schema/message";
import { directMessage } from "../db/schema/relations/direct-message";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/user";

// TODO: Implement group chat

const channelClients = new Map<string, Set<any>>();

const wsRoute = new Elysia({ prefix: "/ws" }).ws("/chat", {
  open(ws) {
    const { channelId } = ws.data.query;
    console.log("channelId", channelId);
    if (!channelClients.has(channelId)) {
      channelClients.set(channelId, new Set());
    }
    channelClients.get(channelId)?.add(ws);
  },
  async message(ws, { content, timestamp }) {
    const { id, channelId } = ws.data.query;
    const newMessage = {
      id: v4(),
      content,
      senderId: id,
      createdAt: new Date(timestamp).toISOString(),
      updatedAt: null,
    };

    await db.insert(messages).values(newMessage);
    await db.insert(directMessage).values({
      id: v4(),
      channelId: channelId,
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
    const { channelId } = ws.data.query;

    const clientsInChannel = channelClients.get(channelId);
    if (clientsInChannel) {
      clientsInChannel.delete(ws);

      if (clientsInChannel.size === 0) {
        channelClients.delete(channelId);
      }
    }
  },
  query: t.Object({
    id: t.String(),
    channelId: t.String(),
  }),
  body: t.Object({
    content: t.String(),
    timestamp: t.Number(),
  }),
});

export default wsRoute;
