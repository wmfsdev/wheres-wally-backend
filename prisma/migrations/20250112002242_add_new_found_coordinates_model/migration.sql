/*
  Warnings:

  - You are about to drop the column `found` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "found";

-- CreateTable
CREATE TABLE "FoundCoordinates" (
    "id" SERIAL NOT NULL,
    "xyId" INTEGER NOT NULL,
    "coordinates" INTEGER[],

    CONSTRAINT "FoundCoordinates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoundCoordinates" ADD CONSTRAINT "FoundCoordinates_xyId_fkey" FOREIGN KEY ("xyId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
