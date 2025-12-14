-- CreateEnum
CREATE TYPE "WardrobeStyle" AS ENUM ('CASUAL', 'FORMAL', 'WORK', 'SPORTY', 'STREETWEAR', 'LOUNGEWEAR', 'PARTY');

-- AlterTable
ALTER TABLE "WardrobeItem" ADD COLUMN     "style" "WardrobeStyle" NOT NULL DEFAULT 'CASUAL';
