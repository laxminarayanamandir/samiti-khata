import { Prisma } from '@prisma/client';
import { ReceiptBookQueryDto } from './receipt-book.query.dto';

export default function buildReceiptWhereClause(
  organizationId: number,
  query: ReceiptBookQueryDto,
): Prisma.ReceiptBooksWhereInput {
  const searchColumn = query.searchColumn.trim();
  const searchKey = query.searchKey.trim();

  const whereClause: Prisma.ReceiptBooksWhereInput = {
    organizationId,
  };

  if (query.fiscalYearId) {
    whereClause.fiscalYearId = Number(query.fiscalYearId);
  }

  if (query.assignedTo) {
    whereClause.assignedTo = Number(query.assignedTo);
  }

  if (query.status) {
    whereClause.status =
      query.status as Prisma.ReceiptBooksWhereInput['status'];
  }

  if (!searchColumn || !searchKey) {
    return whereClause;
  }

  if (searchColumn === 'bookNumber') {
    whereClause.bookNumber = Number(searchKey);
  }

  if (searchColumn === 'receiptStartNumber') {
    whereClause.receiptStartingNumber = Number(searchKey);
  }

  if (searchColumn === 'receiptEndNumber') {
    whereClause.receiptEndingNumber = Number(searchKey);
  }

  return whereClause;
}
