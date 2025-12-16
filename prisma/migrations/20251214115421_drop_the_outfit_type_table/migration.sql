/*
  Warnings:

  - You are about to drop the column `typeId` on the `OutfitItem` table. All the data in the column will be lost.
  - You are about to drop the `OutfitItemType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OutfitItem" DROP CONSTRAINT "OutfitItem_typeId_fkey";

-- DropIndex
DROP INDEX "OutfitItem_typeId_idx";

-- AlterTable
ALTER TABLE "OutfitItem" DROP COLUMN "typeId";

-- DropTable
DROP TABLE "OutfitItemType";
