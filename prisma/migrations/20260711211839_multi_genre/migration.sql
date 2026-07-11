/*
  Warnings:

  - You are about to drop the column `categoryId` on the `WatchItem` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `WatchItem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CategoryToWatchItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToWatchItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToWatchItem_B_fkey" FOREIGN KEY ("B") REFERENCES "WatchItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "score" INTEGER
);
INSERT INTO "new_Tier" ("id", "name", "order", "score") SELECT "id", "name", "order", "score" FROM "Tier";
DROP TABLE "Tier";
ALTER TABLE "new_Tier" RENAME TO "Tier";
CREATE UNIQUE INDEX "Tier_name_key" ON "Tier"("name");
CREATE TABLE "new_WatchItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "posterUrl" TEXT,
    "tierId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WatchItem_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WatchItem" ("createdAt", "favorite", "id", "image", "posterUrl", "tierId", "title", "type") SELECT "createdAt", "favorite", "id", "image", "posterUrl", "tierId", "title", "type" FROM "WatchItem";
DROP TABLE "WatchItem";
ALTER TABLE "new_WatchItem" RENAME TO "WatchItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToWatchItem_AB_unique" ON "_CategoryToWatchItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToWatchItem_B_index" ON "_CategoryToWatchItem"("B");
