import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { AuthorizedOrgMemberDto } from './lib/autorized-org-member.dto';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class AuthorizedOrgMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    authorizedOrgMemberDto: AuthorizedOrgMemberDto,
    organizationId: number,
  ) {
    return await this.prisma.authorizedOrgMember.create({
      data: {
        name: authorizedOrgMemberDto.name,
        address: authorizedOrgMemberDto.address,
        phone: authorizedOrgMemberDto.phone,
        organizationId,
      },
    });
  }

  async getByOrganization(
    organizationId: number,
    queryDto: GetQueryDto = new GetQueryDto(),
  ) {
    const where = { organizationId };
    const [data, totalRows] = await Promise.all([
      this.prisma.authorizedOrgMember.findMany({
        where,
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      this.prisma.authorizedOrgMember.count({ where }),
    ]);

    return {
      results: data,
      meta: {
        pageIndex: queryDto.pageIndex,
        pageSize: queryDto.pageSize,
        totalPages: Math.ceil(totalRows / queryDto.pageSize),
      },
    };
  }
}
