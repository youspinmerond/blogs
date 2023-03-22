import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import readPost from "@/services/posts/read";
import { use } from "next-api-middleware";
import validMethods from "@/middlewares/validMethods.middleware";

const handler: NextApiHandler = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  if(req.method === "GET") {
    const post = await readPost(Number(req.query.id));
    res.status(200).json(post);
  }
  if(req.method === "POST") {
    res.status(200).json("ok");
  }
  if(req.method === "DELETE") {
    res.status(204);
  }
};

export default use(validMethods(["GET","POST", "DELETE"]))(handler);