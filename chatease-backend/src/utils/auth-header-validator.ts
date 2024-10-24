import { error, t } from "elysia";
import jwt from "jsonwebtoken";

export const authHeaderValidation = {
  headers: t.Object({
    authorization: t.String(),
  }),
};

function authHeaderValidator({ authorization }: { authorization: string }):
  | {
      type: "success";
      user: string | jwt.JwtPayload;
    }
  | {
      type: "error";
      error: ReturnType<typeof error>;
    } {
  try {
    if (!authorization) {
      return {
        type: "error",
        error: error(401),
      };
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      return {
        type: "error",
        error: error(401),
      };
    }

    const user = jwt.verify(token, process.env.JWT_SECRET || "");
    return {
      type: "success",
      user,
    };
  } catch (err) {
    return {
      type: "error",
      error: error(401),
    };
  }
}

export default authHeaderValidator;
