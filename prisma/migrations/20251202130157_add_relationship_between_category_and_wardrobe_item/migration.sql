/*
  Warnings:

  - Added the required column `categoryId` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WardrobeItem" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WardrobeItem" ADD CONSTRAINT "WardrobeItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
