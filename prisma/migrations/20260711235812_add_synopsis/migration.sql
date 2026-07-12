/*
  Warnings:

  - Added the required column `synopsis` to the `WatchItem` table without a default value. This is not possible if the table is not empty.

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
    "posterUrl" TEXT,
    "tierId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WatchItem_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WatchItem" ("createdAt", "favorite", "id", "image", "position", "posterUrl", "tierId", "title", "type") SELECT "createdAt", "favorite", "id", "image", "position", "posterUrl", "tierId", "title", "type" FROM "WatchItem";
DROP TABLE "WatchItem";
ALTER TABLE "new_WatchItem" RENAME TO "WatchItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
