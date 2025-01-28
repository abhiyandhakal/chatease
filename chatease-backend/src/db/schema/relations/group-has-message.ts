import { pgTable, text } from "drizzle-orm/pg-core";
import { groups } from "../group";
import { messages } from "../message";

export const groupHasMessage = pgTable("groupHasMessage", {
  id: text("id").primaryKey(),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
});
