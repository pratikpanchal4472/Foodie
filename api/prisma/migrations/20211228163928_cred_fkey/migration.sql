/*
  Warnings:

  - You are about to drop the column `userCredId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserCred` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userCredId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userCredId";

-- CreateIndex
CREATE UNIQUE INDEX "UserCred_userId_key" ON "UserCred"("userId");

-- AddForeignKey
ALTER TABLE "UserCred" ADD CONSTRAINT "UserCred_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
