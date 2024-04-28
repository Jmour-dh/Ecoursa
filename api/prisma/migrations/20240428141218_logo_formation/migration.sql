/*
  Warnings:

  - Added the required column `logo` to the `Formation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Formation" ADD COLUMN     "logo" VARCHAR(255) NOT NULL;
