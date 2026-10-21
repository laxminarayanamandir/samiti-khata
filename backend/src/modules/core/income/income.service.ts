import { PrismaService } from '@shared/prisma';
import { Income, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';
import { ActivityLogService } from '@shared/activity-log';
import { Injectable } from '@nestjs/common';
import { IncomeDto, UpdateIncomeDto } from './lib/income.dto';
import findDiffsForUpdate from '../../../common/findDiffsForUpdate';
import { LogInfo, TActivityLog } from '@shared/activity-log/lib/types';
import { GetQueryDto } from '../../../common/queryString.dto';
import ExcelJS from 'exceljs';

@Injectable()
export class IncomeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async create(incomeDto: IncomeDto, userId: number) {
    return await this.prisma.income.create({
      data: {
        receiptNumber: incomeDto.receiptNumber,
        receiptBookId: incomeDto.receiptBookId,
        name: incomeDto.name,
        address: incomeDto.address,
        amount: incomeDto.amount,
        paymentMode: incomeDto.paymentMode,
        remarks: incomeDto.remarks,
        committeeId: incomeDto.committeeId,
        receiptIssuerId: incomeDto.receiptIssuerId,
        createdBy: userId,
        date: incomeDto.date,
        nepaliDate: incomeDto.nepaliDate,
        subCommitteeId: incomeDto.subCommitteeId,
      },
    });
  }

  async getFilteredIncomes(
    whereClause: Prisma.IncomeWhereInput,
    queryDto: GetQueryDto,
  ) {
    const [data, totalRows] = await Promise.all([
      this.prisma.income.findMany({
        where: whereClause,
        include: {
          receiptBook: {
            select: {
              id: true,
              bookNumber: true,
            },
          },
          Committee: {
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
      this.prisma.income.count({
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

  async exportFilteredIncomes(
    whereClause: Prisma.IncomeWhereInput,
    sortDir: 'asc' | 'desc',
  ): Promise<Buffer> {
    const incomes = await this.prisma.income.findMany({
      where: whereClause,
      include: {
        receiptBook: {
          select: {
            bookNumber: true,
          },
        },
        Committee: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: sortDir,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Income');
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 14 },
      { header: 'Nepali Date', key: 'nepaliDate', width: 16 },
      { header: 'Receipt Book', key: 'receiptBook', width: 16 },
      { header: 'Receipt Number', key: 'receiptNumber', width: 18 },
      { header: 'Name', key: 'name', width: 24 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Amount', key: 'amount', width: 16 },
      { header: 'Payment Mode', key: 'paymentMode', width: 16 },
      { header: 'Committee', key: 'committee', width: 24 },
      { header: 'Remarks', key: 'remarks', width: 30 },
    ];
    worksheet.getRow(1).font = { bold: true };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
    worksheet.autoFilter = 'A1:J1';

    for (const income of incomes) {
      worksheet.addRow({
        date: income.date,
        nepaliDate: income.nepaliDate,
        receiptBook: income.receiptBook?.bookNumber ?? '',
        receiptNumber: income.receiptNumber,
        name: income.name,
        address: income.address,
        amount: Number(income.amount),
        paymentMode: income.paymentMode,
        committee: income.Committee.name,
        remarks: income.remarks,
      });
    }

    worksheet.getColumn('date').numFmt = 'yyyy-mm-dd';
    worksheet.getColumn('amount').numFmt = '#,##0.00';

    return Buffer.from(await workbook.xlsx.writeBuffer());
  }

  async getById(id: number, organizationId: number) {
    return await this.prisma.income.findFirst({
      where: {
        id,
        Committee: {
          organizationId,
        },
      },
      include: {
        receiptBook: {
          select: {
            id: true,
            bookNumber: true,
          },
        },
        AuthorizedOrgMember: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            fullName: true,
          },
        },
        SubCommittee: {
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
      },
    });
  }

  async update(id: number, incomeDto: UpdateIncomeDto, logInfo: LogInfo) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // 1. fetch current row
        const existingData = await tx.income.findFirstOrThrow({
          where: {
            id,
          },
        });

        const updatePayload: Income = {
          ...incomeDto,
          id: existingData.id,
          amount: Decimal(incomeDto.amount),
          createdAt: existingData.createdAt,
          updatedAt: existingData.updatedAt,
          createdBy: existingData.createdBy,
          deletedAt: existingData.deletedAt,
          receiptImageUrl: '',
          remarks: incomeDto.remarks ?? "",
          date: incomeDto.date as unknown as Date,
          receiptIssuerId: incomeDto.receiptIssuerId ?? null,
          subCommitteeId: incomeDto.subCommitteeId ?? null,
        };

        const { current, previous } = findDiffsForUpdate<Income>(
          existingData,
          updatePayload,
        );

        const updatedData = await tx.income.update({
          where: {
            id,
          },
          data: {
            address: updatePayload.address,
            amount: updatePayload.amount,
            committeeId: updatePayload.committeeId,
            createdAt: updatePayload.createdAt,
            createdBy: updatePayload.createdBy,
            date: updatePayload.date,
            deletedAt: updatePayload.deletedAt,
            name: updatePayload.name,
            nepaliDate: updatePayload.nepaliDate,
            paymentMode: updatePayload.paymentMode,
            receiptBookId: updatePayload.receiptBookId,
            receiptImageUrl: updatePayload.receiptImageUrl,
            receiptIssuerId: updatePayload.receiptIssuerId,
            receiptNumber: updatePayload.receiptNumber,
            remarks: updatePayload.remarks,
            subCommitteeId: updatePayload.subCommitteeId,
          },
        });

        // create log
        const payload: TActivityLog = {
          action: 'UPDATE',
          committeeId: updatedData.committeeId,
          currentData: JSON.stringify(current),
          description: logInfo.description,
          entityType: 'INCOME',
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
        const updated = await tx.income.update({
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
          entityType: 'INCOME',
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
