-- CreateTable
CREATE TABLE "ScanToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScanToken_token_key" ON "ScanToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ScanToken_eventId_key" ON "ScanToken"("eventId");

-- AddForeignKey
ALTER TABLE "ScanToken" ADD CONSTRAINT "ScanToken_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
