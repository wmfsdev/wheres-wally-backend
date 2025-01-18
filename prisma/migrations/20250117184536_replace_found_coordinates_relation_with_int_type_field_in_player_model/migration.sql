/*
  Warnings:

  - You are about to drop the `FoundCoordinates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoundCoordinates" DROP CONSTRAINT "FoundCoordinates_xyId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "foundCoordinates" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "FoundCoordinates";
