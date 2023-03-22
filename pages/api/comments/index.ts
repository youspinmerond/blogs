import validMethods from "@/middlewares/validMethods.middleware";
import comments from "@/services/comments";
import { NextApiRequest, NextApiResponse } from "next";
import { use } from "next-api-middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method === "GET") {
    const result = await comments.read(req.body);
    if(!result) return res.status(500).json({message:"Something wrong."});
    
    return res.status(200).json(result);
  }
  if(req.method === "POST") {
    const { body } = typeof req.body === "string" ?
      JSON.parse(req.body) : req.body;
      
    const result = await comments.create(body);
    
    if(!result || result === "mistake") return res.status(500).json(
      {message:"Something wrong"}
    );
    
    return res.status(200).json(result);
  }
  if(req.method === "DELETE") {
    const result = await comments.deleteComment(req.body);

    if(!result || result === "mistake") return res.status(400).json(
      {message:"Something wrong."}
    );
    if(result === "succesful") return res.status(200).json(
      {message:"Comment deleted."}
    );
    return res.status(500).json({message:"Something wrong."});
  }
};

export default use(validMethods(["POST","GET", "DELETE"]))(handler);