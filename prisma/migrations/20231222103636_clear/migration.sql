/*
  Warnings:

  - The `image_url` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image_keys" TEXT[],
DROP COLUMN "image_url",
ADD COLUMN     "image_url" TEXT[];
