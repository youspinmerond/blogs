-- DropIndex
DROP INDEX "User_id_key";

-- DropIndex
DROP INDEX "Vote_fieldId_key";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
