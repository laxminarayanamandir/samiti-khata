import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { FiscalYearDto } from './lib/fiscal-year.dto';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class FiscalYearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fiscalYearDto: FiscalYearDto, organizationId: number) {
    const startDateYear = fiscalYearDto.startDateBs.split('-')[0];
    const endDateYear = fiscalYearDto.endDateBs.split('-')[0];
    const name = `${startDateYear}/${endDateYear}`;
    return await this.prisma.fiscalYear.create({
      data: {
        name,
        startDateBs: fiscalYearDto.startDateBs,
        endDateBs: fiscalYearDto.endDateBs,
        startDateIso: fiscalYearDto.startDateIso,
        endDateIso: fiscalYearDto.endDateIso,
        organizationId,
      },
    });
  }

  async getByOrg(
    organizationId: number,
    queryDto: GetQueryDto = new GetQueryDto(),
  ) {
    const where = { organizationId };
    const [data, totalRows] = await Promise.all([
      this.prisma.fiscalYear.findMany({
        where,
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      this.prisma.fiscalYear.count({ where }),
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
