import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { PrismaService } from '@shared/prisma';
import { ActivityLogService } from '@shared/activity-log';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService, PrismaService, ActivityLogService],
})
export class IncomeModule {}
