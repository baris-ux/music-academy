-- AlterTable
ALTER TABLE "InscriptionRequest" ADD COLUMN     "isParent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentFirstName" TEXT,
ADD COLUMN     "parentLastName" TEXT;

-- CreateTable
CREATE TABLE "InscriptionRequestCourse" (
    "id" TEXT NOT NULL,
    "inscriptionRequestId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "InscriptionRequestCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InscriptionRequestCourse_inscriptionRequestId_courseId_key" ON "InscriptionRequestCourse"("inscriptionRequestId", "courseId");

-- AddForeignKey
ALTER TABLE "InscriptionRequestCourse" ADD CONSTRAINT "InscriptionRequestCourse_inscriptionRequestId_fkey" FOREIGN KEY ("inscriptionRequestId") REFERENCES "InscriptionRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionRequestCourse" ADD CONSTRAINT "InscriptionRequestCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
