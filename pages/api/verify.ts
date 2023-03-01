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

  if(req.method !== "GET") return res.status(400).json({message: "You sent wrong method. Use GET."})

  const body: IBody = req.body

  if(!body) return res.status(400).json({message:"You didn't sent body"})
  if(!body.token) return res.status(400).json({message: "You didn't specified \"token\"."})
  const user: IUser = verify(body.token)
  console.log(user)
  if(!user) return
  if(!user.role.includes("ADMIN")) return res.status(403).json({message:"Not enough level."})
  if(!body.tokenCheck) return res.status(400).json({message: "We didn't found token for check. Send it in \"tokenCheck\" field."})

  return res.status(200).json(verify(body.tokenCheck))
}