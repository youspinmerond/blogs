import getNew from "@/services/posts/getNew";
import { NextApiRequest, NextApiResponse } from "next";
import CORSMiddleware from "@/middlewares/cors";
import { use } from "next-api-middleware";

const handler = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  const posts = await getNew();
  if(!posts) return res.status(500).json({message: "We didn't found posts."});
  return res.status(200).json(posts);
};

export default use(CORSMiddleware)(handler);