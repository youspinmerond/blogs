/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isVoted` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fieldId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_userName_fkey";

-- DropIndex
DROP INDEX "User_name_id_key";

-- DropIndex
DROP INDEX "Vote_userId_userName_key";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "isVoted",
DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "fieldId" INTEGER NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_fieldId_key" ON "Vote"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_authorId_key" ON "Vote"("authorId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
