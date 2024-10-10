import { Elysia } from "elysia";
import authHeaderValidator, {
  authHeaderValidation,
} from "../utils/auth-header-validator";

const userRoute = new Elysia({ prefix: "/user" }).get(
  "/profile",
  async ({ headers }) => {
    const res = authHeaderValidator(headers);
    if (res.type === "error") {
      return res.error;
    }
    return res.user;
  },
  authHeaderValidation,
);

export default userRoute;
