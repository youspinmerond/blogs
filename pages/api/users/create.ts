import * as user from "@/services/users";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  
  const body: IUser = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  if(!body) return res.status(400).json({message:"Wrong body fields."});
  if(!body.name) return res.status(400).json({message:"You didn't specified \"name\" field."});
  if(!body.email) return res.status(400).json({message:"You didn't specified \"email\" field."});
  if(!body.password1 || !body.password2) return res.status(400).json({message:"You didn't specified \"password1\" and \"password2\" field."});
  
  const result = await user.create({...body, password: body.password1, password1: undefined, password2: undefined});
  if(result === "mistake" || result === undefined || result === null) return res.status(500).json({message:"Might it busy?"});
  return res.status(201).json(result?.result);
  
}