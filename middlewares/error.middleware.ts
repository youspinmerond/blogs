import { Middleware } from "next-api-middleware";

const errorMiddleware: Middleware = async (req, res, next) => {
  if(!req.body) console.log("No body.");
  await next();
};

export default errorMiddleware;