import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const messages = sqliteTable("messsages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt"),
});
