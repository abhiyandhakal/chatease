import { Elysia, t } from "elysia";
import AuthService from "../services/auth";

const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/signup",
    async ({ body }) => {
      return await new AuthService().signup(body);
    },
    {
      body: t.Object({
        email: t.String(),
        username: t.String(),
        profilePic: t.Optional(t.String()),
        password: t.String(),
      }),
    },
  )
  .post(
    "login",
    async ({ body }) => {
      return await new AuthService().login(body);
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  );

export default authRoute;
