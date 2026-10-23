import { Prisma } from '@prisma/client';
import { IncomeQueryDto } from './income.query.dto';

export default function buildIncomeWhereClause(
  organizationId: number,
  query: IncomeQueryDto,
): Prisma.IncomeWhereInput {
  const searchColumn = query.searchColumn.trim();
  const searchKey = query.searchKey.trim();

  const whereClause: Prisma.IncomeWhereInput = {
    deletedAt: null,
    Committee: {
      organizationId,
    },
  };

  if (query.receiptBookId) {
    whereClause.receiptBookId = Number(query.receiptBookId);
  }

  if (query.committeeId) {
    whereClause.committeeId = Number(query.committeeId);
  }

  if (query.minAmount >= 0 && query.maxAmount >= 0) {
    whereClause.amount = {
      gte: query.minAmount,
      lte: query.maxAmount,
    };
  } else if (query.minAmount >= 0) {
    whereClause.amount = {
      gte: query.minAmount,
    };
  } else if (query.maxAmount >= 0) {
    whereClause.amount = {
      lte: query.maxAmount,
    };
  }

  if (!searchColumn || !searchKey) {
    return whereClause;
  }

  if (searchColumn === 'name') {
    whereClause.name = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  if (searchColumn === 'address') {
    whereClause.address = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  if (searchColumn === 'receiptNumber') {
    whereClause.receiptNumber = Number(searchKey);
  }

  if (searchColumn === 'receiptBookId') {
    whereClause.receiptBookId = Number(searchKey);
  }

  return whereClause;
}
