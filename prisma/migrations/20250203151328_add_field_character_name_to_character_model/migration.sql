/*
  Warnings:

  - A unique constraint covering the columns `[characterName]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "characterName" TEXT NOT NULL DEFAULT 'defaultchar';

-- CreateIndex
CREATE UNIQUE INDEX "Character_characterName_key" ON "Character"("characterName");
