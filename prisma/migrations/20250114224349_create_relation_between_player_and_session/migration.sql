-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "playerId" DROP DEFAULT;
DROP SEQUENCE "Session_playerId_seq";
