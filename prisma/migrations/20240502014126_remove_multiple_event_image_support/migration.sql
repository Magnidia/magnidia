/*
  Warnings:

  - You are about to drop the column `images` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "images",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://via.placeholder.com/150';
