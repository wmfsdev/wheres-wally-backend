/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `gameLength` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "gameLength" INTEGER NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'guest';

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" INTEGER NOT NULL,
    "xyId" INTEGER NOT NULL,
    "coordinates" INTEGER[],

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_xyId_fkey" FOREIGN KEY ("xyId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
