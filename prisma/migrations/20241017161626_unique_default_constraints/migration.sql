/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `rssLinks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sources` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "rssLinks" ALTER COLUMN "latestPostTime" SET DEFAULT -1;

-- CreateIndex
CREATE UNIQUE INDEX "rssLinks_link_key" ON "rssLinks"("link");

-- CreateIndex
CREATE UNIQUE INDEX "sources_name_key" ON "sources"("name");
