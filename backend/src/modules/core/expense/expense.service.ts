import { PrismaService } from '@shared/prisma';
import { Expense, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';
import { SortDirection } from '../../../common/types';
import { Injectable } from '@nestjs/common';
import { ExpenseDto, UpdateExpenseDto } from './lib/expense.dto';
import findDiffsForUpdate from '../../../common/findDiffsForUpdate';
import { LogInfo, TActivityLog } from '@shared/activity-log/lib/types';
import { ActivityLogService } from '@shared/activity-log';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async create(expenseDto: ExpenseDto, createdBy: number) {
    return await this.prisma.expense.create({
      data: {
        date: expenseDto.date,
        nepaliDate: expenseDto.nepaliDate,
        recepientName: expenseDto.recepientName,
        recepientAddress: expenseDto.recepientAddress,
        particulars: expenseDto.particulars,
        quantity: expenseDto.quantity,
        amount: expenseDto.amount,
        paymentMode: expenseDto.paymentMode,
        billNumber: expenseDto.billNumber,
        voucherNumber: expenseDto.voucherNumber,
        payerId: expenseDto.payerId,
        categoryId: expenseDto.categoryId,
        committeeId: expenseDto.committeeId,
        subCommitteeId: expenseDto.subCommitteeId,
        remarks: expenseDto.remarks,
        createdBy,
      },
    });
  }

  async getExpenses(
    whereClause: Prisma.ExpenseWhereInput,
    queryDto: GetQueryDto,
  ) {
    const [data, totalRows] = await Promise.all([
      this.prisma.expense.findMany({
        where: whereClause,
        include: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
          Committee: {
            select: {
              id: true,
              name: true,
            },
          },
          AuthorizedOrgMember: {
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
      this.prisma.expense.count({
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
    return await this.prisma.expense.findFirst({
      where: {
        id,
        Committee: {
          organizationId,
        },
      },
      include: {
        Category: true,
        User: {
          select: {
            id: true,
            fullName: true,
            address: true,
            email: true,
          },
        },
        AuthorizedOrgMember: true,
        Committee: true,
      },
    });
  }

  async update(id: number, expenseDto: UpdateExpenseDto, logInfo: LogInfo) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // 1. fetch current row
        const existingData = await tx.expense.findFirstOrThrow({
          where: {
            id,
          },
        });

        const updatePayload: Expense = {
          ...expenseDto,
          amount: Decimal(expenseDto.amount),
          id: existingData.id,
          documentImageUrl: null,
          date: new Date(expenseDto.date),
          recepientAddress: expenseDto.recepientAddress || '',
          createdAt: existingData.createdAt,
          updatedAt: existingData.updatedAt,
          createdBy: existingData.createdBy,
          deletedAt: existingData.deletedAt,
          remarks: existingData.remarks ?? "",
        };

        const { current, previous } = findDiffsForUpdate<Expense>(
          existingData,
          updatePayload,
        );

        const updatedData = await tx.expense.update({
          where: {
            id,
          },
          data: {
            amount: updatePayload.amount,
            billNumber: updatePayload.billNumber,
            categoryId: updatePayload.categoryId,
            committeeId: updatePayload.committeeId,
            createdAt: updatePayload.createdAt,
            createdBy: updatePayload.createdBy,
            date: updatePayload.date,
            deletedAt: updatePayload.deletedAt,
            documentImageUrl: updatePayload.documentImageUrl,
            nepaliDate: updatePayload.nepaliDate,
            particulars: updatePayload.particulars,
            payerId: updatePayload.payerId,
            paymentMode: updatePayload.paymentMode,
            quantity: updatePayload.quantity,
            recepientAddress: updatePayload.recepientAddress,
            recepientName: updatePayload.recepientName,
            subCommitteeId: updatePayload.subCommitteeId,
            voucherNumber: updatePayload.voucherNumber,
            remarks: updatePayload.remarks,
          },
        });

        // create log
        const payload: TActivityLog = {
          action: 'UPDATE',
          committeeId: updatedData.committeeId,
          currentData: JSON.stringify(current),
          description: logInfo.description,
          entityType: 'EXPENSE',
          organizationId: logInfo.organizationId,
          previousData: JSON.stringify(previous),
          userId: logInfo.userId,
        };

        await this.activityLog.create(payload, tx);
        return updatedData;
      },
    );
  }

  async softDelete(id: number, logInfo: LogInfo) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updated = await tx.expense.update({
          where: {
            id,
          },
          data: {
            deletedAt: new Date().toISOString(),
          },
        });

        // activity log here
        const payload: TActivityLog = {
          action: 'DELETE',
          committeeId: updated.committeeId,
          currentData: null,
          description: logInfo.description,
          entityType: 'EXPENSE',
          organizationId: logInfo.organizationId,
          previousData: null,
          userId: logInfo.userId,
        };

        await this.activityLog.create(payload, tx);
        return updated;
      },
    );
  }
}
