import { Injectable } from '@nestjs/common';
import { BookStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@shared/prisma';
import { ReceiptBookDto } from './lib/receipt-book.dto';
import { GetQueryDto } from '../../../common/queryString.dto';
import { CursorPaginationDto } from '../../../common/cursorPagination.dto';
import { UpdateBookStatusDto } from './lib/updateBookStatus.dto';

@Injectable()
export class ReceiptBookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(receiptBookDto: ReceiptBookDto, organizationId: number) {
    return await this.prisma.receiptBooks.create({
      data: {
        bookNumber: receiptBookDto.bookNumber,
        receiptStartingNumber: receiptBookDto.receiptStartingNumber,
        receiptEndingNumber: receiptBookDto.receiptEndingNumber,
        fiscalYearId: receiptBookDto.fiscalYearId,
        assignedTo: receiptBookDto.assignedTo,
        assignedAt: receiptBookDto.assignedAt,
        status: receiptBookDto.status,
        returnedAt: receiptBookDto.returnedAt,
        organizationId,
      },
    });
  }

  async getAllViaCursorPaginated(
    organizationId: number,
    cursorPaginationDto: CursorPaginationDto,
  ) {
    const { limit, cursor } = cursorPaginationDto;
    const data = await this.prisma.receiptBooks.findMany({
      take: limit + 1,
      where: {
        organizationId,
      },
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      orderBy: {
        id: 'desc',
      },
    });

    const hasNextPage = data.length === limit + 1;

    if (hasNextPage) data.pop();

    return {
      results: data,
      meta: {
        nextCursor: hasNextPage ? data[data.length - 1].id : null,
        hasNextPage,
      },
    };
  }

  async getAll(
    whereClause: Prisma.ReceiptBooksWhereInput,
    queryDto: GetQueryDto,
  ) {
    const [data, totalRows] = await Promise.all([
      // find data
      this.prisma.receiptBooks.findMany({
        where: whereClause,

        include: {
          fiscalYear: {
            select: {
              id: true,
              name: true,
            },
          },
          assignedMember: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),

      // get rows count
      this.prisma.receiptBooks.count({
        where: whereClause,
      }),
    ]);

    return {
      results: data,
      meta: {
        pageIndex: queryDto.pageIndex,
        pageSize: queryDto.pageSize,
        totalPages: Math.ceil(totalRows / queryDto.pageSize),
      },
    };
  }

  async getById(id: number, organizationId: number) {
    return await this.prisma.receiptBooks.findFirstOrThrow({
      where: {
        id,
        organizationId,
      },
      include: {
        assignedMember: {
          select: {
            id: true,
            name: true,
          },
        },
        fiscalYear: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateBookStatus(
    bookId: number,
    updateBookStatusDto: UpdateBookStatusDto,
  ) {
    return await this.prisma.receiptBooks.update({
      where: {
        id: bookId,
      },
      data: {
        status: updateBookStatusDto.status,
        assignedTo: updateBookStatusDto.assignedTo,
        assignedAt: updateBookStatusDto.assignedAt,
        returnedAt: updateBookStatusDto.returnedAt,
      },
    });
  }
}
