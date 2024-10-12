import { Elysia, error } from "elysia";
import authHeaderValidator, {
  authHeaderValidation,
} from "../utils/auth-header-validator";
import ChatService from "../services/chat";

const chatRoute = new Elysia({ prefix: "/chat" }).get(
  "",
  ({ headers }) => {
    const res = authHeaderValidator(headers);
    if (res.type === "error") {
      return res.error;
    }
    if (typeof res.user === "string") return error(401);
    return new ChatService().getAllChats(res.user.username);
  },
  authHeaderValidation,
);

export default chatRoute;
