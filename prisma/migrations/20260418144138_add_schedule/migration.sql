-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
