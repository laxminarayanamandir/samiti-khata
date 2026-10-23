import { Module } from '@nestjs/common';
import { UserSessionService } from './user-session.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserSessionService, PrismaService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
