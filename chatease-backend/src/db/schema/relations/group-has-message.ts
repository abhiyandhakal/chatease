import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { groups } from "../group";
import { messages } from "../message";

export const groupHasMessage = sqliteTable("groupHasMessage", {
  id: text("id").primaryKey(),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
});
