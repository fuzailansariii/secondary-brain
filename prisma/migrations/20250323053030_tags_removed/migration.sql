/*
  Warnings:

  - You are about to drop the column `tags` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "tags",
ALTER COLUMN "title" DROP NOT NULL;
