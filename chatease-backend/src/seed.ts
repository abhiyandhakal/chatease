import { v4 } from "uuid";
import { db } from "./db";
import { users } from "./db/schema/user";

await db.insert(users).values([
  {
    id: v4(),
    email: "test@tsd",
    password: "test",
    username: "test",
    profilePic: "https://avatars.githubusercontent.com/u/96732471?v=4",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "test2@tsd",
    password: "test",
    username: "test2",
    profilePic: "https://avatars.githubusercontent.com/u/96732471?v=4",
    createdAt: new Date().toISOString(),
  },
]);

console.log(`Seeding complete.`);
