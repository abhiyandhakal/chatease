import { Elysia, t } from "elysia";

let chat: { id: string; message: string; time: number }[] = [];
const connectedClients: Set<any> = new Set();

new Elysia()
  .ws("/ws", {
    open(ws) {
      connectedClients.add(ws);
      ws.send(JSON.stringify(chat));
    },
    message(ws, { message }) {
      const { id } = ws.data.query;
      const newMessage = { id, message, time: Date.now() };
      chat = [...chat, newMessage];

      // Broadcast the updated chat to all connected clients
      for (const client of connectedClients) {
        client.send(JSON.stringify(chat));
      }
    },
    close(ws) {
      connectedClients.delete(ws);
    },
    query: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      message: t.String(),
    }),
  })
  .listen(4000);
