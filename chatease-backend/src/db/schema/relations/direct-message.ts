import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { messages } from "../message";
import { users } from "../user";

export const directMessage = sqliteTable("directMessage", {
  id: text("id").primaryKey(),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiverId")
    .notNull()
    .references(() => users.id),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
});
