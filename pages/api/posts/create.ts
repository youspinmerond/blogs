import { createPost } from "services/posts/create"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== 'POST') return res.status(400).json({message:"Wrong method. Use POST"})

  const post = await createPost(req.body)
  if(post === 'mistake') return res.status(403).json({message:"Wrong token."})
  if(post) return res.status(201).json(post)
  
  res.status(500).json({message:"Something wrong."})
}