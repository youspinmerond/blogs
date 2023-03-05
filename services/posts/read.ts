import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function readPost(id:number) {
  const post = await prisma.post.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      body: true,
      userId: true,
      Comment: true,
      createdAt: true
    }
  });
  return post;
}