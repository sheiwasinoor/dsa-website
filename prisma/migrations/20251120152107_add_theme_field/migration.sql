-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "categoryZh" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionZh" TEXT,
    "location" TEXT,
    "client" TEXT,
    "status" TEXT,
    "service" TEXT,
    "keywords" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'landscape',
    "destination" TEXT NOT NULL DEFAULT 'landscape',
    "coverImageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("categoryEn", "categoryZh", "client", "coverImageUrl", "createdAt", "descriptionEn", "descriptionZh", "destination", "id", "keywords", "location", "service", "slug", "status", "titleEn", "titleZh") SELECT "categoryEn", "categoryZh", "client", "coverImageUrl", "createdAt", "descriptionEn", "descriptionZh", "destination", "id", "keywords", "location", "service", "slug", "status", "titleEn", "titleZh" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
