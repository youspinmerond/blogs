import { NextApiRequest, NextApiResponse } from "next";
import comment from "services/comments";

export default async function create(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== "POST") return res.status(400).json({message:"Wrong method. Use POST"});

  const result = await comment.create(req.body);
  if(!result) return res.status(500).json({message:"Something wrong"});
  if(result === "mistake") return res.status(500).json({message:"Something wrong"});


  return res.status(200).json(result);
}