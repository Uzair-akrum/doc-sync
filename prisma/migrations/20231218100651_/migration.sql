/*
  Warnings:

  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "url" TEXT NOT NULL;
