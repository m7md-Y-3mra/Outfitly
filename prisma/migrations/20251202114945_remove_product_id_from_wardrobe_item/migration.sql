/*
  Warnings:

  - You are about to drop the column `productId` on the `WardrobeItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WardrobeItem" DROP CONSTRAINT "WardrobeItem_productId_fkey";

-- DropIndex
DROP INDEX "WardrobeItem_productId_idx";

-- AlterTable
ALTER TABLE "WardrobeItem" DROP COLUMN "productId",
ALTER COLUMN "source" SET DEFAULT 'manual';

-- CreateIndex
CREATE INDEX "WardrobeItem_variantId_idx" ON "WardrobeItem"("variantId");
