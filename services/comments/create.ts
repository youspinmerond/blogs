import { PrismaClient } from "@prisma/client";
import verify from "services/verify";
import IUser from "@/types/user";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

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

export default async function create({comment, token}: IBody) {
  const user: IUser | boolean | JwtPayload | string = await verify(token);
  
  if(typeof user === "boolean" || typeof user === "string") return "mistake";
  if(!user) return "mistake";
  if(user.status === "BANNED") return "mistake";
  
  if(!comment) return "mistake";
  if(!comment.body) return "mistake";
  if(!comment.PostId) return "mistake";

  const result = await prisma.comment.create({
    data:{
      body: comment.body,
      PostId: comment.PostId,
      UserId: user.id
    }
  });
  return result;

}