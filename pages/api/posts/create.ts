import { createPost } from "services/posts/create";
import { NextApiRequest, NextApiResponse } from "next";
import CORSMiddleware from "@/middleware/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST") return res.status(400).json({message:"Wrong method. Use POST"});
  CORSMiddleware(req, res);

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  if(!body.post.title) return res.status(400).json({message:"Specify \"title\" field;"});
  if(!body.post.body) return res.status(400).json({message:"Specify \"body\" field;"});

  const post = await createPost(body);
  if(post === "mistake") return res.status(403).json({message:"Wrong token."});
  if(post) return res.status(201).json(post);
  
  res.status(500).json({message:"Something wrong."});
}