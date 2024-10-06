import { db } from "./db";
import { users } from "./db/schema/user";

const result = await db.select().from(users);
console.log(result);
