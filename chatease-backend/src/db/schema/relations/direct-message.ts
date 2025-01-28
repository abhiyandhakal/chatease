import { pgTable, text } from "drizzle-orm/pg-core";
import { messages } from "../message";
import { dmChannel } from "./dm-channel";

export const directMessage = pgTable("directMessage", {
  id: text("id").primaryKey(),
  channelId: text("channelId")
    .notNull()
    .references(() => dmChannel.id),
  messageId: text("messageId")
    .notNull()
    .references(() => messages.id),
});
