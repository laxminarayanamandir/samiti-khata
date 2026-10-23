import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { SubCommitteeDto } from './lib/subCommittee.dto';
import { CommitteeService } from '@core/committee';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class SubCommitteeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly committee: CommitteeService,
  ) {}

  async create(subCommittee: SubCommitteeDto) {
    const mainCommittee = await this.committee.findById(
      subCommittee.mainCommitteeId,
    );

    if (!mainCommittee)
      throw new UnprocessableEntityException("Main committee doesn't exists");

    return this.prisma.subCommittee.create({
      data: {
        name: subCommittee.name,
        description: subCommittee.description,
        mainCommitteeId: subCommittee.mainCommitteeId,
      },
    });
  }

  async getByCommittee(committeeId: number) {
    return this.prisma.subCommittee.findMany({
      where: {
        mainCommitteeId: committeeId,
      },
    });
  }

  async get(id: number) {
    return this.prisma.subCommittee.findFirst({
      where: {
        id,
      },
    });
  }

  async getAll(organizationId: number, queryDto: GetQueryDto) {
    const [data, totalRows] = await Promise.all([
      this.prisma.subCommittee.findMany({
        where: {
          Committee: {
            organizationId,
          },
        },
        include: {
          Committee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      this.prisma.subCommittee.count({
        where: {
          Committee: {
            organizationId,
          },
        },
      }),
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
