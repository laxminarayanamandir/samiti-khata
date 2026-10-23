import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ActivityLogService } from '@shared/activity-log';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, ActivityLogService, PrismaService],
})
export class ExpenseModule {}
