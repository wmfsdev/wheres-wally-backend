/*
  Warnings:

  - You are about to drop the column `imageURL` on the `ImageBoard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "characterName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ImageBoard" DROP COLUMN "imageURL";
