/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PLANNED', 'CANCELLED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_courseId_fkey";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_courseId_startsAt_idx" ON "Session"("courseId", "startsAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
