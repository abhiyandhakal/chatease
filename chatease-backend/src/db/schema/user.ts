import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  fullName: text("fullName").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profilePic: text("profilePic"),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt"),
});
