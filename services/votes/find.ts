import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function find(authorId: number, fieldId: number) {
  const response = await prisma.vote.findMany({
    where: {
      AND: [
        {
          authorId: authorId,
          fieldId: fieldId
        }
      ]
    },
    select: {
      authorId: true,
      score: true,
      type: true
    }
  });
  return response;
}