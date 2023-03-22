import verify from "@/services/verify";
import { Middleware } from "next-api-middleware";

const AuthMiddleware: Middleware = async (
  req,
  res,
  next
) => {

  let token: string | undefined = req.body.token;
  if(token === undefined) token = req.cookies.token;
  const user = token === undefined ? false : verify(token);
  if(typeof user === "boolean" || typeof user === "string")
    return res.status(500);
  req.user = user;
  await next();
};

export default AuthMiddleware;