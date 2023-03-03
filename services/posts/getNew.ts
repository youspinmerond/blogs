import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getNew() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 14
  });
  return posts;
}