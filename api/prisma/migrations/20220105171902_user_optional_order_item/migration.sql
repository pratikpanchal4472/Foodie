-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
