import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import authRoute from "./routes/auth";

new Elysia()
  .use(swagger())
  .use(authRoute)
  .listen(process.env.PORT || 3000);
