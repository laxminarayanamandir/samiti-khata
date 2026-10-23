import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CommitteeService } from './committee.service';
import { CommitteeController } from './committee.controller';

@Module({
  controllers: [CommitteeController],
  providers: [CommitteeService, PrismaService],
})
export class CommitteeModule {}
