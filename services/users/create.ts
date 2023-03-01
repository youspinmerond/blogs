require("dotenv").config()
import genToken from "../genToken"
import config from "config.json"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
const salt:string = config.SALT!
const prisma = new PrismaClient()

interface IUser {
  name: string;
  email: string;
  password: string;
  password1: undefined;
  password2: undefined;
}
export default async function create(user: IUser) {

  if(user === undefined || user === null) return "mistake"
  if(user.password.length <= 4) return "mistake"
  try {
    let result: any = await prisma.user.create({
      data: {
        avatar: "null",
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, salt)
      }
    })
    const token = genToken(result)
    result = {...result, password: undefined}
    return {result, token}
  } catch (e) {
    return "mistake"
  }
}