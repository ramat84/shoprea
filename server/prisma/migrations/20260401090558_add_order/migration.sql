-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_ProductCategory" (
    "productID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("productID", "categoryID"),
    CONSTRAINT "ProductCategory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductCategory" ("categoryID", "productID") SELECT "categoryID", "productID" FROM "ProductCategory";
DROP TABLE "ProductCategory";
ALTER TABLE "new_ProductCategory" RENAME TO "ProductCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
