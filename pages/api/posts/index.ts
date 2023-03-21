import validMethods from "@/middlewares/validMethods.middleware";
import { NextApiRequest, NextApiResponse } from "next";
import posts from "@/services/posts/index";
import { use } from "next-api-middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "GET") {
    const post = await posts.readPost(Number(req.query?.id));
    if(!post) return res.status(500).json({message: "We didn't found post."});
    res.status(200).json(post);
  }
  if(req.method === "POST") {
    const { body } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if(!body.post.title) return res.status(400).json({message:"Specify \"title\" field;"});
    if(!body.post.body) return res.status(400).json({message:"Specify \"body\" field;"});

    const post = await posts.createPost(body);
    if(post === "mistake") return res.status(403).json({message:"Wrong token."});
    if(post) return res.status(201).json(post);
  }
  if(req.method === "PUT") {

  }
  if(req.method === "DELETE") {

  }
};

export default use(validMethods(["GET","POST", "PUT", "DELETE"]))(handler);