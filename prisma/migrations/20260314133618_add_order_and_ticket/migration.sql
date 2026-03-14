/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyerEmail` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyerName` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrCode]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ticket_code_key";

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
DROP COLUMN "buyerEmail",
DROP COLUMN "buyerName",
DROP COLUMN "code",
DROP COLUMN "quantity",
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "qrCode" TEXT NOT NULL,
ADD COLUMN     "usedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ticket_id_seq";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_qrCode_key" ON "Ticket"("qrCode");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
