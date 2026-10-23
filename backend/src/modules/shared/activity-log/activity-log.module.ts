import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';

@Module({
  controllers: [ActivityLogController],
  providers: [ActivityLogService, PrismaService],
  exports: [ActivityLogService],
})
export class ActivityLogModule {}
