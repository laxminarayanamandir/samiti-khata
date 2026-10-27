ALTER TABLE "ReceiptBooks" ADD COLUMN "committeeId" INTEGER;

ALTER TABLE "ReceiptBooks"
ADD CONSTRAINT "ReceiptBooks_committeeId_fkey"
FOREIGN KEY ("committeeId") REFERENCES "Committee"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
