import { Elysia, error, t } from "elysia";
import MessageService from "../services/message";
import authHeaderValidator, {
  authHeaderValidation,
} from "../utils/auth-header-validator";
import { db } from "../db";
import { users } from "../db/schema/user";
import { eq } from "drizzle-orm";

const messageRoute = new Elysia({ prefix: "/message" })
  .decorate("messageService", new MessageService())
  .put(
    "/:messageId",
    async ({
      params: { messageId },
      headers,
      messageService,
      body: { message },
    }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }
      if (typeof res.user === "string") return error(401);
      const usersArr = await db
        .select()
        .from(users)
        .where(eq(users.username, res.user.username));
      if (usersArr.length === 0) {
        return error(404, { success: false, message: "User not found" });
      }
      return messageService.editMessage({
        messageId,
        userId: usersArr[0].id,
        message,
      });
    },
    {
      ...authHeaderValidation,
      params: t.Object({
        messageId: t.String(),
      }),
      body: t.Object({
        message: t.String(),
      }),
    },
  )
  .delete(
    "/:messageId",
    async ({
      params: { messageId },
      headers,
      messageService,
      query: { isDirect },
    }) => {
      const res = authHeaderValidator(headers);
      if (res.type === "error") {
        return res.error;
      }
      if (typeof res.user === "string") return error(401);
      const usersArr = await db
        .select()
        .from(users)
        .where(eq(users.username, res.user.username));
      if (usersArr.length === 0) {
        return error(404, { success: false, message: "User not found" });
      }
      return messageService.deleteMessage(usersArr[0].id, messageId, isDirect);
    },
    { ...authHeaderValidation, query: t.Object({ isDirect: t.Boolean() }) },
  );

export default messageRoute;
