require("dotenv").config();
import config from "config.json";
import genToken from "../genToken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const salt:string = config.SALT!;

interface IUser {
  email?: string;
  name?: string;
  password: string;
}

export default async function login(user:IUser) {
  let res;

  if(!user.name && !user.email) return;
  if(!user.name) {
    const result: any = await prisma.user.findUnique({
      where: {
        email: user.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        password: true
      }
    });
    const token = genToken(result);
    if(result?.password !== await bcrypt.hash(user.password, salt)) return res = {...result, password: undefined, token: token};
    return res = null;

  } else if (user.name) {
    const result: any = await prisma.user.findUnique({
      where: {
        name: user.name
      },
      select: {
        id: true,
        name: true,
        role: true,
        rank: true,
        email: true,
        status: true,
        avatar: true,
        password: true,
        createdAt: true,
        isVerefied: true
      }
    });
    const token = genToken(result);
    if(result?.password === await bcrypt.hash(user.password, salt)) return res = {...result, password: undefined, token: token};
    return res = null;
  }
  return res;
}