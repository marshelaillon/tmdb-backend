/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "user_favorites";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_favorites" JSON[];

-- DropTable
DROP TABLE "favorites";
