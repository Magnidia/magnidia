/*
  Warnings:

  - You are about to drop the column `cityState` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "cityState",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Not specified',
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Not specified';
