import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import authRoute from "./routes/auth";

new Elysia()
  .use(swagger())
  .use(cors())
  .use(authRoute)
  .listen(process.env.PORT || 3000);
