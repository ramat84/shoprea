/*
  Warnings:

  - The primary key for the `OrderLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `OrderLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "updateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderLog" ("orderId", "status", "updateTime") SELECT "orderId", "status", "updateTime" FROM "OrderLog";
DROP TABLE "OrderLog";
ALTER TABLE "new_OrderLog" RENAME TO "OrderLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
