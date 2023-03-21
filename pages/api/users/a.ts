import errorMiddleware from "@/middlewares/error.middleware";
import validMethods from "@/middlewares/validMethods.middleware";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-middleware";

const handler: NextApiHandler = (req: NextApiRequest,res: NextApiResponse) => {
  console.log(req.body);
  res.status(200).json("Hi");
};

export default use(errorMiddleware, validMethods("GET"))(handler);