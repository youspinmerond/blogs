import * as user from "@/services/users"
import { NextApiRequest, NextApiResponse } from "next"

interface IUser {
  email?: string
  name?: string
  password: string
}

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
  
  const body:IUser = req.body

  if(!body) return res.status(400).json({message:"Wrong body fields."})
  if(!body.password) return res.status(400).json({message:"You didn't specified \"password\" field."})
  
  const result = await user.login({email: body.email, name: body.name, password: body.password})
  if(!result) return res.status(500).json({message:"Something wrong. Or your data wrong?"})
  return res.status(200).json(result)
  
}