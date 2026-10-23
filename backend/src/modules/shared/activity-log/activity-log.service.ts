import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { TActivityLog } from './lib/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(log: TActivityLog, tx: Prisma.TransactionClient) {
    await tx.activityLog.create({
      data: {
        ...log,
        previousData: log.previousData ?? '{}',
        currentData: log.currentData ?? '{}',
      },
    });
  }
}
