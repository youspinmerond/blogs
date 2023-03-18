import { NextApiRequest, NextApiResponse } from "next";
import readPost from "@/services/posts/read";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "GET") {
    if(!req.query.id) res.status(400).json("Specify id in query.");

    const post = await readPost(Number(req.query.id));
    res.status(200).json(post);

  }
  if(req.method === "POST") {
    res.status(200).json("ok");
  }
}