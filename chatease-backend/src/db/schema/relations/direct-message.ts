import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { messages } from "../message";
import { dmChannel } from "./dm-channel";

export const directMessage = sqliteTable("directMessage", {
  id: text("id").primaryKey(),
  channelId: text("channelId")
    .notNull()
    .references(() => dmChannel.id),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
});
