import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-api-middleware";


const CORSMiddleware: Middleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  await next();
};

export default CORSMiddleware;