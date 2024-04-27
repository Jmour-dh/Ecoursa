/*
  Warnings:

  - You are about to drop the column `description` on the `Cours` table. All the data in the column will be lost.
  - Added the required column `link` to the `Cours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cours" DROP COLUMN "description",
ADD COLUMN     "link" VARCHAR(255) NOT NULL;
