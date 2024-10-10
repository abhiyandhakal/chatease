import { Elysia, error, t } from "elysia";
import authHeaderValidator, {
  authHeaderValidation,
} from "../utils/auth-header-validator";
import { db } from "../db";
import { users } from "../db/schema/user";
import { eq } from "drizzle-orm";

const userRoute = new Elysia({ prefix: "/user" })
  // Get your own profile
  .get(
    "/profile",
    async ({ headers }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }
      return res.user;
    },
    authHeaderValidation,
  )
  // Get another user's profile
  .get(
    "/:username",
    async ({ params, headers }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }

      const userArr = await db
        .select()
        .from(users)
        .where(eq(users.username, params.username));

      if (userArr.length === 0) {
        return error(404, { success: false, message: "User not found" });
      }

      const user = userArr[0];
      const publicUser: PublicUser = {
        username: user.username,
        fullName: user.fullName,
        profilePic: user.profilePic,
      };
      return publicUser;
    },
    {
      params: t.Object({
        username: t.String(),
      }),
      ...authHeaderValidation,
    },
  );

export default userRoute;
