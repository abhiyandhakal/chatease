import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const groups = sqliteTable("groups", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdBy: text("createdBy")
    .notNull()
    .references(() => users.id),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt"),
});
