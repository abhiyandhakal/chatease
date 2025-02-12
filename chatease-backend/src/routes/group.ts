import { Elysia, error, t } from "elysia";
import GroupService from "../services/group";
import authHeaderValidator, {
  authHeaderValidation,
} from "../utils/auth-header-validator";
import { users } from "../db/schema/user";
import { eq } from "drizzle-orm";
import { db } from "../db";

const groupRoute = new Elysia({ prefix: "/group" })
  .decorate("groupService", new GroupService())
  .get(
    "",
    async ({ headers, groupService, query: { offset, limit } }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }
      if (typeof res.user === "string") return error(401);
      const usersArr = await db
        .select()
        .from(users)
        .where(eq(users.username, res.user.username));

      return groupService.getAllGroups(usersArr[0].id, offset, limit);
    },
    {
      ...authHeaderValidation,
      query: t.Object({
        offset: t.Number(),
        limit: t.Number(),
      }),
    },
  )
  .post(
    "/create",
    async ({ groupService, body: { name, description }, headers }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }
      if (typeof res.user === "string") return error(401);
      const usersArr = await db
        .select()
        .from(users)
        .where(eq(users.username, res.user.username));
      return groupService.createGroup({
        name,
        userId: usersArr[0].id,
        description,
      });
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
      }),
      ...authHeaderValidation,
    },
  );

export default groupRoute;
