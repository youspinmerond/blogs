import comment from "services/comments";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== 'DELETE') return res.status(400).json({message:"Wrong method. Use DELETE"})
  
  const result = await comment.deleteComment(req.body)

  if(!result || result === "mistake") return res.status(500).json({message:"Something wrong."})
  if(result === "succesful") return res.status(200).json({message:"Comment deleted."})
  
  return res.status(500).json({message:"Something wrong."})
}