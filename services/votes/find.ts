import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function find(id: number) {
  const response = await prisma.vote.findUnique({
    where: {
      userId: id
    },
    select: {
      score: true,
      user: true
    }
  });
  return response;
}