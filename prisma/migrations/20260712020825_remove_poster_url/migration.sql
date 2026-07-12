/*
  Warnings:

  - You are about to drop the column `posterUrl` on the `WatchItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WatchItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "tierId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WatchItem_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WatchItem" ("createdAt", "favorite", "id", "image", "position", "synopsis", "tierId", "title", "type") SELECT "createdAt", "favorite", "id", "image", "position", "synopsis", "tierId", "title", "type" FROM "WatchItem";
DROP TABLE "WatchItem";
ALTER TABLE "new_WatchItem" RENAME TO "WatchItem";
CREATE UNIQUE INDEX "WatchItem_title_key" ON "WatchItem"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
