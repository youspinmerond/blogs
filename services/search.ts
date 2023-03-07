import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function search(query: any) {
  const users = await prisma.user.findMany({
    where: {
      name: query
    },
    select: {
      id: true,
      name: true,
      rank: true,
      createdAt: true,
      status: true
    },
    take: 10
  });
  const postsByTitle = await prisma.post.findMany({
    where: {
      title: query
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true
    },
    take: 10
  });
  const postsByBody = await prisma.post.findMany({
    where: {
      body: query
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true
    },
    take: 10
  });
  const comments = await prisma.comment.findMany({
    where: {
      body: query
    },
    select: {
      id: true,
      body: true,
      createdAt: true,
      PostId: true,
      UserId: true
    }
  });
  return {users, postsByTitle, postsByBody, comments};
}