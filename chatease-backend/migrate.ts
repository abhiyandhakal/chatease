import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL || "");
const db = drizzle(client);
migrate(db, { migrationsFolder: "./drizzle" });
