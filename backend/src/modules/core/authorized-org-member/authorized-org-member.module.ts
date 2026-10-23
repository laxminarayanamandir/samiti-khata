import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { AuthorizedOrgMemberService } from './authorized-org-member.service';
import { AuthorizedOrgMemberController } from './authorized-org-member.controller';

@Module({
  controllers: [AuthorizedOrgMemberController],
  providers: [AuthorizedOrgMemberService, PrismaService],
})
export class AuthorizedOrgMemberModule {}
