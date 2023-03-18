import { PrismaClient } from "@prisma/client";
import posts from "../posts";
const prisma = new PrismaClient();

interface IVote {
  score: "UP" | "DOWN";
  type: "POST" | "COMMENT" | "USER";
  fieldId: number;
  authorId: number
}

export default async function create({score, type, fieldId, authorId}: IVote) {
  const result = await prisma.vote.create({
    data: {
      score: score,
      type: type,
      fieldId: fieldId,
      authorId: authorId
    }
  });
  
  const readPost = await posts.readPost(fieldId);
  if(readPost?.rank === undefined) return "mistake";
  
  const resultPost = await prisma.post.update({
    where: {
      id: fieldId
    },
    data: {
      rank: score === "UP" ? readPost?.rank+1 : readPost?.rank - 1 
    }
  });
  console.log(result, resultPost);
  return [result, resultPost];
}