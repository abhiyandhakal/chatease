import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import chatRoute from "./routes/chat";
import wsRoute from "./routes/ws";
import messageRoute from "./routes/message";

new Elysia()
  .use(swagger())
  .use(cors())
  .use(authRoute)
  .use(userRoute)
  .use(chatRoute)
  .use(wsRoute)
  .use(messageRoute)
  .listen(process.env.PORT || 3000);
