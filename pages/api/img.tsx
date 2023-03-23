import { NextApiHandler, NextApiRequest } from "next";
import { use } from "next-api-middleware";
import CORSMiddleware from "@/middlewares/cors";
import validMethods from "@/middlewares/validMethods.middleware";

const handler: NextApiHandler = async (
  req: NextApiRequest
) => {
  console.log(req.body);
};

export default use(CORSMiddleware, validMethods(["POST"]))(handler);