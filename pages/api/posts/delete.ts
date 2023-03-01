import deletePost from "@/services/posts/delete"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== 'DELETE') return res.status(400).json({message:"Wrong method. Use DELETE"})
  
  const post = await deletePost(req.body)
  if(post === 'mistake') return res.status(403).json({message:"Wrong token."})
  if(post) return res.status(204)
  
  res.status(500).json({message:"Something wrong."})
}