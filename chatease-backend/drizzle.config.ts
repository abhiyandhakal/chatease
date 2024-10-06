import { Config } from "drizzle-kit";

const config: Config = {
  dialect: "sqlite",
  schema: "./src/db/schema/**/*.ts",
  out: "./drizzle",
};

export default config;
