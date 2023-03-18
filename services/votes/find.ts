import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function find(id: number) {
  const response = await prisma.vote.findUnique({
    where: {
      authorId: id
    },
    select: {
      authorId: true,
      score: true,
      type: true
    }
  });
  return response;
}