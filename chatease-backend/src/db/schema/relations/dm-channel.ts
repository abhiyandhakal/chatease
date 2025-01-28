import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "../user";

export const dmChannel = pgTable("dmChannel", {
  id: text("id").primaryKey(),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id),
  receiverId: text("receiverId")
    .notNull()
    .references(() => users.id),
});
