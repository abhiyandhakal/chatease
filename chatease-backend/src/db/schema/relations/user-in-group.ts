import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { groups } from "../group";
import { users } from "../user";

export const userInGroup = sqliteTable("userInGroup", {
  id: text("id").primaryKey(),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});
