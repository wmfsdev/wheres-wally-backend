/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[coordinates]` on the table `Coordinate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Coordinate" DROP CONSTRAINT "Coordinate_xyId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_gameId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT DEFAULT 'guest',
    "gameLength" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageBoard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "ImageBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_coordinates_key" ON "Coordinate"("coordinates");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_xyId_fkey" FOREIGN KEY ("xyId") REFERENCES "ImageBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
