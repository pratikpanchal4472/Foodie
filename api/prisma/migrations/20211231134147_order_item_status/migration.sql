-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('IN_PROGRESS', 'PLACED');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "state" "OrderItemStatus" NOT NULL DEFAULT E'IN_PROGRESS';
