import { Config } from "drizzle-kit";

const config: Config = {
  dialect: "postgresql",
  schema: "./src/db/schema/**/*.ts",
  out: "./drizzle",
};

export default config;
