import readPost from "@/services/posts/read";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method !== "GET") return res.status(400).json({message: "Wrong method, use GET."});
  
  try {
    const post = await readPost(req.body?.id);
    if(!post) return res.status(500).json({message: "We didn't found post."});
    return res.status(200).json(post);
  } catch {
    return res.status(500).json({message: "We didn't found post."});
  }
}