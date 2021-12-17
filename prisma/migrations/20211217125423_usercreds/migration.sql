/*
  Warnings:

  - Added the required column `userCredId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userCredId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserCred" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCred_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("userCredId") REFERENCES "UserCred"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
