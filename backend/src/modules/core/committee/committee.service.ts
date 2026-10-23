import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CommitteeDto } from './lib/committee.dto';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class CommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    committee: CommitteeDto,
    userId: number,
    organizationId: number,
  ) {
    return await this.prisma.committee.create({
      data: {
        name: committee.name,
        description: committee.description,
        createdBy: userId,
        organizationId,
      },
    });
  }

  async update(committee: CommitteeDto, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
        deletedAt: null,
      },
      data: {
        name: committee.name,
        description: committee.description,
      },
    });
  }

  async updateStatus(status: boolean, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
        deletedAt: null,
      },
      data: {
        isActive: status,
      },
    });
  }

  async softDelete(committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  }

  async findById(committeeId: number) {
    return await this.prisma.committee.findUniqueOrThrow({
      where: { id: committeeId, deletedAt: null },
    });
  }

  async findAll(organizationId: number, queryDto: GetQueryDto) {
    const [data, totalRows] = await Promise.all([
      this.prisma.committee.findMany({
        where: { organizationId, deletedAt: null },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),

      // get rows count
      this.prisma.committee.count({
        where: { organizationId, deletedAt: null },
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
