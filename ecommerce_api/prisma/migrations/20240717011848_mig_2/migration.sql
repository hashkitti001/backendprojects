/*
  Warnings:

  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "userUserId" INTEGER;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0.00,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
