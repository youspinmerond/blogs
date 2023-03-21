import verify from "@/services/verify";
import { NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";

const AuthMiddleware: Middleware = async (req: any, res: NextApiResponse, next) => {

  const token = req.body.token;
  if(token === undefined) return;
  const user = verify(token);
  req.user = user;
  await next();
};

export default AuthMiddleware;