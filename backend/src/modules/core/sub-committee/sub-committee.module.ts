import { Module } from '@nestjs/common';
import { SubCommitteeController } from './sub-committee.controller';
import { SubCommitteeService } from './sub-committee.service';
import { PrismaService } from '@shared/prisma';
import { CommitteeService } from '@core/committee';

@Module({
  controllers: [SubCommitteeController],
  providers: [SubCommitteeService, PrismaService, CommitteeService],
})
export class SubCommitteeModule {}
