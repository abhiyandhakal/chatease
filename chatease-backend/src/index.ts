import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import chatRoute from "./routes/chat";

new Elysia()
  .use(swagger())
  .use(cors())
  .use(authRoute)
  .use(userRoute)
  .use(chatRoute)
  .listen(process.env.PORT || 3000);
