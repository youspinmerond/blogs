import { PrismaClient } from "@prisma/client";
import posts from "../posts";

const prisma = new PrismaClient();

interface IBody {
  fieldId: number;
  authorId: number;
  score: "UP" | "DOWN";
}

export default async function update({fieldId, authorId, score}: IBody) {
  const {0: resultAuthorVotes} = await prisma.vote.findMany({
    where: {
      AND: [
        {
          authorId: authorId,
          fieldId: fieldId
        }
      ]
    },
    select: {
      fieldId: true,
      authorId: true,
      score: true
    }
  });
  if(!resultAuthorVotes) return;
  const result = await prisma.vote.updateMany({
    where: {
      AND: [
        {
          authorId: authorId,
          fieldId: fieldId
        }
      ]
    },
    data: {
      score: score
    }
  });

  const post = await posts.readPost(fieldId);
  if(!post) return "didnt found post";

  function countScore() {
    if(post?.rank === undefined) return 0;
    if(score === resultAuthorVotes.score) {
      return post?.rank;
    } else {
      if(score === "UP") return post?.rank + 2;
      return post?.rank-2;
    }
  }

  const postResult = await prisma.post.update({
    where: {
      id: fieldId
    },
    data: {
      rank: countScore()
    }
  });
  return [result, postResult];
}