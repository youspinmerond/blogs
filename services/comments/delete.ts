import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import verify from "../verify";
const prisma = new PrismaClient();

interface IComment {
  id: number;
  body: string;
  createdAt: Date;
  PostId: number;
  UserId: number;
  status: "AVIABLE" | "BANNED";
}
interface IBody {
  token: string;
  comment: IComment;
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

export default async function deleteComment({comment, token}: IBody) {
  const user: IUser | boolean | string | JwtPayload = await verify(token);

  if(typeof user === "boolean" || typeof user === "string") return "mistake";
  if(!user) return "mistake";
  if(user.status === "BANNED") return "mistake";

  if(!comment) return "mistake";

  if(!user.role.includes("ADMIN")) return "mistake";
  await prisma.comment.delete({
    where: {
      id: comment.id
    }
  });
  return "succesful";
}