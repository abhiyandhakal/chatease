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
    fullName,
    password,
  }: {
    email: string;
    username: string;
    profilePic?: string;
    password: string;
    fullName: string;
  }) {
    try {
      // Encrypt password
      const encryptedPassword = await Bun.password.hash(password);

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
          fullName,
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

  async login({ username, password }: { username: string; password: string }) {
    try {
      // Check if user exists
      const userList = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
      const user = userList[0];
      if (!user) {
        return error(400, {
          success: false,
          message: "User not found",
        });
      }

      // Verify password
      if (!(await Bun.password.verify(password, user.password))) {
        return error(400, {
          success: false,
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          profilePic: user.profilePic,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "1d",
        },
      );

      return {
        success: true,
        message: "User logged in successfully",
        token,
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
