import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import verify from "@/services/verify";
import vote from "@/services/votes";

interface IBody {
  articleId: number;
  token: string;
  score: "UP" | "DOWN";
}

const handler
: NextApiHandler =
async (
  req: NextApiRequest & {body: IBody},
  res: NextApiResponse
) => {
  const body: IBody = req.body;

  if(req.method == "POST") {
    if(!body.token) res.status(403).json("Forbidden.");
    const user = verify(body.token);
    if(typeof user === "boolean" || typeof user === "string") return;
    
    let resl = await vote.find(body.articleId);
    if(!resl) {
      const creating = await vote.create(
        {score: body.score, type: "POST", fieldId: body.articleId, authorId: user.id}
      );
      res.status(200).json(creating);
    }

  } else {
    res.status(400).json("wrong method, use POST.");
  }
};

export default handler;