/*
  Warnings:

  - You are about to drop the column `order` on the `ProductCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Product" ("description", "id", "image", "price", "shortDesc", "title") SELECT "description", "id", "image", "price", "shortDesc", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_ProductCategory" (
    "productID" INTEGER NOT NULL,
    "categoryID" INTEGER NOT NULL,

    PRIMARY KEY ("productID", "categoryID"),
    CONSTRAINT "ProductCategory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductCategory" ("categoryID", "productID") SELECT "categoryID", "productID" FROM "ProductCategory";
DROP TABLE "ProductCategory";
ALTER TABLE "new_ProductCategory" RENAME TO "ProductCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
