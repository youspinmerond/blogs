import { NextApiRequest, NextApiResponse } from "next";
import comments from "@/services/comments";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if(req.method !== "GET") return res.status(400).json({message: "Wrong method. Use GET."})
  
  const result = await comments.read(req.body)

  if(!result) return res.status(500).json({message:"Something wrong."})


  return res.status(200).json(result)
}