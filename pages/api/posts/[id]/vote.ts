import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import verify from "@/services/verify";

const handler
: NextApiHandler =
async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if(req.method == "POST") {
    if(!req.body.token) res.status(403).json("Forbidden.");
    const user = verify(req.body.token);
    user;
    // console.log(fin)
    res.status(200).json("ok.");

  } else {
    res.status(400).json("wrong method, use POST.");
  }
};

export default handler;