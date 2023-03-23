import search from "@/services/search";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  req;res;

  if(req.method !== "POST")
    return res.status(400).json({message:"Wrong method, use \"POST\"."});
  if(!req.body)
    return res.status(400).json(
      {message: "Empty request. Specify \"body\" field!"}
    );
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  
  if(!body.query) return res.status(400).json(
    {message: "Specify \"query\" field!"}
  );
  const result = await search(body.query);
  
  res.status(200).json(result);
}