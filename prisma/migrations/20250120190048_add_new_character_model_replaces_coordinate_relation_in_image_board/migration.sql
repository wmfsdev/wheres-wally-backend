-- DropForeignKey
ALTER TABLE "Coordinate" DROP CONSTRAINT "Coordinate_xyId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "board" TEXT;

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "nameId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "ImageBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordinate" ADD CONSTRAINT "Coordinate_xyId_fkey" FOREIGN KEY ("xyId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
