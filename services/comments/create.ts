import verify from "../verify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface IBody {
  comment: comment;
  token: string;
}
interface comment {
  body: string;
  createdAt: Date;
  PostId: number;
  UserId: number;
  status: "AVIABLE" | "BANNED";
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

export default async function create({comment, token}: IBody) {
  const user: IUser = await verify(token)
  if(!user) return "mistake"
  if(user.status === "BANNED") return "mistake"

  if(!comment) return "mistake"
  if(!comment.body) return "mistake"
  if(!comment.PostId) return "mistake"

  const result = await prisma.comment.create({
    data:{
      body: comment.body,
      PostId: comment.PostId,
      UserId: user.id
    }
  })
  return result


}