import { pgTable, text } from "drizzle-orm/pg-core";
import { groups } from "../group";
import { users } from "../user";

export const userInGroup = pgTable("userInGroup", {
  id: text("id").primaryKey(),
  groupId: text("groupId")
    .notNull()
    .references(() => groups.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});
