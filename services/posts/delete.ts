import verify from "../verify";
import { PrismaClient } from "@prisma/client";
import readPost from "./read";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

interface IBody {
  token: string;
  id: number;
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

export default async function deletePost({token, id}:IBody) {
  
  const user: boolean | string | JwtPayload | IUser = verify(token);
  if(typeof user === "boolean" || typeof user === "string") return;
  if(!user) return "mistake";
  if(user.status === "BANNED") return "mistake";

  const findPost = await readPost(id);
  if(findPost === null) return "mistake";
  if(findPost?.userId !== user.id) return "mistake";

  let result;
  try {
    await prisma.post.delete({
      where: {
        id: id
      }
    });
    result = "succesful";
  } catch {
    result = "mistake";
  }
  return result;
}