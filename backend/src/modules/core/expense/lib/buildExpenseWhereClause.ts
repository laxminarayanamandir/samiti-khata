import { Prisma } from '@prisma/client';
import { ExpenseQueryDto } from './expense.query.dto';

export default function buildExpenseWhereClause(
  organizationId: number,
  query: ExpenseQueryDto,
): Prisma.ExpenseWhereInput {
  const searchColumn = query.searchColumn.trim();
  const searchKey = query.searchKey.trim();

  const whereClause: Prisma.ExpenseWhereInput = {
    deletedAt: null,
    Committee: {
      organizationId,
    },
  };

  if (query.categoryId) {
    whereClause.categoryId = Number(query.categoryId);
  }

  if (query.committeeId) {
    whereClause.committeeId = Number(query.committeeId);
  }

  if (!searchColumn || !searchKey) {
    return whereClause;
  }

  if (searchColumn === 'name') {
    whereClause.recepientName = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  if (searchColumn === 'address') {
    whereClause.recepientAddress = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  return whereClause;
}
