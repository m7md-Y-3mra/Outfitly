/*
  Warnings:

  - Added the required column `brand` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasedDate` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `WardrobeItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WardrobeItem" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "purchasedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "season" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
