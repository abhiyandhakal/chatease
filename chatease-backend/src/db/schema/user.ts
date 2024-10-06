import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profilePic: text("profilePic").notNull(),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt"),
});
