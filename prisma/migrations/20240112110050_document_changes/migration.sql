/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_author_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "author" SET DATA TYPE TEXT,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "content" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
