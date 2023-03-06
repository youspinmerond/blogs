import verify from "services/verify";
import { NextApiRequest, NextApiResponse } from "next";

interface IBody {
  token: string;
  tokenCheck: string;
}

interface IUser {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  role: string[];
  rank: number;
  isVerefied: boolean;
  createdAt: Date;
  password: string;
  status: "AVIABLE" | "BANNED";
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== "POST") return res.status(400).json({message: "You sent wrong method. Use POST."});

  const body: IBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if(!body) return res.status(400).json({message:"You didn't sent body"});
  if(!body.token) return res.status(400).json({message: "You didn't specified \"token\"."});


  const user: IUser = verify(body.token);
  if(!user) return res.status(400).json({message: "No user found."});
  if(!user.role.includes("ADMIN")) {

    const result = verify(body.tokenCheck);
    res.status(400);
    return res.status(200).json({ ...result, password: undefined, iat: undefined});
  }

  if(!body.tokenCheck) return res.status(400).json({message: "We didn't found token for check. Send it in \"tokenCheck\" field."});

  return res.status(200).json(verify(body.tokenCheck));
}