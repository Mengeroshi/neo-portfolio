/*
  Warnings:

  - Made the column `slug` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Playlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "slug" SET NOT NULL;
