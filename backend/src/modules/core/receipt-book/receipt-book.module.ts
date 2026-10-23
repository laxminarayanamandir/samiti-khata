import { Module } from '@nestjs/common';
import { ReceiptBookController } from './receipt-book.controller';
import { ReceiptBookService } from './receipt-book.service';
import { PrismaService } from '@shared/prisma';

@Module({
  controllers: [ReceiptBookController],
  providers: [ReceiptBookService, PrismaService],
})
export class ReceiptBookModule {}
