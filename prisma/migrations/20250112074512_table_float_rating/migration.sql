/*
  Warnings:

  - You are about to alter the column `rating` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `rating` DOUBLE NOT NULL;
