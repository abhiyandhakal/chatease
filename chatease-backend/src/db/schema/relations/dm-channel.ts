import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "../user";

export const dmChannel = sqliteTable("dmChannel", {
  id: text("id").primaryKey(),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiverId")
    .notNull()
    .references(() => users.id),
});
