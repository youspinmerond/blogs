import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function read(id: number) {
  const result = await prisma.comment.findUnique({
    where:{
      id: id
    },
    select: {
      id: true,
      body: true,
      createdAt: true,
      PostId: true,
      UserId: true,
      status: true

    }
  })
  return result
}