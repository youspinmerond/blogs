import getNew from "@/services/posts/getNew";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const posts = await getNew();
    if(!posts) return res.status(500).json({message: "We didn't found posts."});
    return res.status(200).json(posts);
  } catch {
    return res.status(500).json({message: "We didn't found posts."});
  }
}