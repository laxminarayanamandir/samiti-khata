BEGIN;

LOCK TABLE "ReceiptBooks" IN ACCESS EXCLUSIVE MODE;

DO $$
DECLARE
  unassigned_count BIGINT;
BEGIN
  SELECT COUNT(*)
  INTO unassigned_count
  FROM "ReceiptBooks"
  WHERE "committeeId" IS NULL;

  IF unassigned_count > 0 THEN
    RAISE EXCEPTION
      'Cannot require ReceiptBooks.committeeId: % existing receipt book(s) have no committee. Backfill those rows with valid committee IDs, then retry. No rows were modified.',
      unassigned_count;
  END IF;
END
$$;

ALTER TABLE "ReceiptBooks"
  ALTER COLUMN "committeeId" SET NOT NULL;

ALTER TABLE "ReceiptBooks"
  DROP CONSTRAINT "ReceiptBooks_committeeId_fkey",
  ADD CONSTRAINT "ReceiptBooks_committeeId_fkey"
    FOREIGN KEY ("committeeId") REFERENCES "Committee"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

DROP INDEX "ReceiptBooks_bookNumber_fiscalYearId_key";

CREATE UNIQUE INDEX "ReceiptBooks_bookNumber_fiscalYearId_committeeId_key"
  ON "ReceiptBooks"("bookNumber", "fiscalYearId", "committeeId");

COMMIT;
