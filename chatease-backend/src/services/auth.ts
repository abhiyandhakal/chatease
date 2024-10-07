import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../db/schema/user";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import { error } from "elysia";

class AuthService {
  constructor() {}

  async signup({
    email,
    username,
    profilePic,
    password,
  }: {
    email: string;
    username: string;
    profilePic?: string;
    password: string;
  }) {
    try {
      // Encrypt password
      const encryptedPassword = jwt.sign(
        { password },
        process.env.JWT_SECRET || "",
      );

      // Don't allow duplicate emails and usernames
      const existingUserWithUsername = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
      if (existingUserWithUsername.length > 0) {
        return error(400, {
          success: false,
          message: `User with username "${username}" already exists`,
        });
      }
      const existingUserWithemail = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (existingUserWithemail.length > 0) {
        return error(400, {
          success: false,
          message: `User with email "${email}" already exists`,
        });
      }

      // Save user to database
      const result = await db
        .insert(users)
        .values({
          id: v4(),
          email,
          username,
          profilePic,
          password: encryptedPassword,
          createdAt: new Date().toISOString(),
        })
        .returning();

      return {
        success: true,
        message: "User created successfully",
        user: result[0],
      };
    } catch (err) {
      if (err instanceof Error) {
        return error(500, {
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      }
    }
  }
}

export default AuthService;
