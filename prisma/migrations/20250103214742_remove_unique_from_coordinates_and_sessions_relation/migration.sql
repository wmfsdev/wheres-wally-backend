/*
  Warnings:

  - You are about to drop the column `playerId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_playerId_fkey";

-- DropIndex
DROP INDEX "Coordinate_coordinates_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "found" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "playerId";
