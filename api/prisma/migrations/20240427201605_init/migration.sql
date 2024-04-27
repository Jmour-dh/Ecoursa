/*
  Warnings:

  - You are about to drop the column `videoId` on the `Cours` table. All the data in the column will be lost.
  - You are about to drop the column `coursId` on the `Progression` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cours" DROP CONSTRAINT "Cours_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Progression" DROP CONSTRAINT "Progression_coursId_fkey";

-- DropIndex
DROP INDEX "Cours_videoId_key";

-- AlterTable
ALTER TABLE "Cours" DROP COLUMN "videoId";

-- AlterTable
ALTER TABLE "Progression" DROP COLUMN "coursId";
