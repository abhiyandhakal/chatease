import type { Config } from "drizzle-kit";

const config: Config = {
  out: "./drizzle",
  dialect: "sqlite",
  schema: "./src/db/schema/**/*",
};

export default config;
