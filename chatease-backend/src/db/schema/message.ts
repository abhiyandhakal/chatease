import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const messages = pgTable("messsages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt"),
});
