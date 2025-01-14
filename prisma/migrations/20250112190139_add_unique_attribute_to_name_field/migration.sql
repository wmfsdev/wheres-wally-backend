/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ImageBoard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageBoard_name_key" ON "ImageBoard"("name");
