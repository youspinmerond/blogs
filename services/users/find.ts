import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function find(id:number) {
  const result = await prisma.user.findUnique({
    where:{
      id: id
    },
    select:{
      avatar: true,
      id: true,
      name: true,
      role: true,
      rank: true,
      isVerefied: true,
      createdAt: true,
      status: true
    }
  })
  return result
}