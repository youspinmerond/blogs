import vote from "@/services/votes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  if(req.method === "POST") {
    res.status(201).json({message:"voted"});
  }
  if(req.method === "GET") {
    const result = await vote.find(req.body.authorId, req.body.articleId);
    res.status(200).json(result);
  }
};

export default handler;