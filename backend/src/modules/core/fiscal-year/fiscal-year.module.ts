import { Module } from '@nestjs/common';
import { FiscalYearController } from './fiscal-year.controller';
import { FiscalYearService } from './fiscal-year.service';
import { PrismaService } from '@shared/prisma';

@Module({
  controllers: [FiscalYearController],
  providers: [FiscalYearService, PrismaService],
})
export class FiscalYearModule {}
