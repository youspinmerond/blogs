import { PrismaClient } from "@prisma/client"
import verify from "services/verify"
const prisma = new PrismaClient()

interface IBody {
  post: {
    title: string;
    body: string;
    rank: number;
  };
  token: string;
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

export async function createPost({post, token}: IBody) {

  const user: IUser = verify(token)
  if(!user) return "mistake"
  if(user.status === "BANNED") return "mistake"

  const result = await prisma.post.create({
    data: {
      title: post.title,
      body: post.body,
      rank: 0,
      userId: user.id
    }
  })
  return result
}