import readPost from "@/services/posts/read";
import { NextApiRequest, NextApiResponse } from "next";
import CORSMiddleware from "@/middlewares/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method !== "GET") return res.status(400).json({message: "Wrong method, use GET."});
  CORSMiddleware(req, res);
  const post = await readPost(Number(req.query?.id));
  if(!post) return res.status(500).json({message: "We didn't found post."});
  return res.status(200).json(post);
}