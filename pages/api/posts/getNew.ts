import getNew from "@/services/posts/getNew";
import { NextApiRequest, NextApiResponse } from "next";
import CORSMiddleware from "@/middleware/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  CORSMiddleware(req, res);
  const posts = await getNew();
  if(!posts) return res.status(500).json({message: "We didn't found posts."});
  return res.status(200).json(posts);
}