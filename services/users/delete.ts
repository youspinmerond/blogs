require("dotenv").config()
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function Delete(id: number) {

  if(id === undefined || id === null) return
  
  const result = await prisma.user.delete({
    where:{
      id: id
    }
  })
  return result
}