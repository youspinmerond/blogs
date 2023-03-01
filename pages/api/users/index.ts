import { NextApiRequest, NextApiResponse } from "next";
import * as user from 'services/users/index'

interface IBody {
  id: number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "GET") return res.status(500).json({message: "Wrong method. Use GET."})
  const body: IBody = req.body
  
  if(!body.id) return res.status(400).json({message:"Send \"id\" fields with member's id. Dont forget about token."})
  if(typeof body.id !== 'number') return res.status(400).json({message:"Wrong datatype. Send please number ID."})

  const User = await user.find(body.id)
  if(User === null || User === undefined) return res.status(400).json({message:"We're couldn't to find your friend."})
  res.status(200).json(User)
}