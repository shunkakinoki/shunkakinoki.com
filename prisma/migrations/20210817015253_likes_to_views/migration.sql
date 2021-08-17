/*
  Warnings:

  - You are about to drop the column `likes` on the `Views` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Views` DROP COLUMN `likes`,
    ADD COLUMN `views` INTEGER NOT NULL DEFAULT 1;
