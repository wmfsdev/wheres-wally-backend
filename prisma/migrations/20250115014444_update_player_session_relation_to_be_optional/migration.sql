-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_sessionId_fkey";

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
