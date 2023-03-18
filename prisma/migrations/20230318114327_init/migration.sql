-- CreateEnum
CREATE TYPE "VoteScore" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('POST', 'COMMENT', 'USER');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER', 'GUEST', 'BANNED');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('AVIABLE', 'BANNED');

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PostId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "status" "status" NOT NULL DEFAULT 'AVIABLE',

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "status" "status" NOT NULL DEFAULT 'AVIABLE',

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT[] DEFAULT ARRAY['USER']::TEXT[],
    "rank" INTEGER NOT NULL DEFAULT 0,
    "isVerefied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'AVIABLE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "score" "VoteScore" NOT NULL,
    "type" "VoteType" NOT NULL,
    "isVoted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_id_key" ON "User"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_userName_key" ON "Vote"("userId", "userName");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_userName_fkey" FOREIGN KEY ("userId", "userName") REFERENCES "User"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
