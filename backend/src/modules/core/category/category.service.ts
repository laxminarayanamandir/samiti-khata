import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CategoryDto } from './lib/category.dto';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoryDto: CategoryDto, organizationId: number) {
    return await this.prisma.category.create({
      data: {
        name: categoryDto.name,
        description: categoryDto.description,
        organizationId,
      },
    });
  }

  async getByOrg(organizationId: number, queryDto: GetQueryDto) {
    const where = {
      organizationId,
      deletedAt: null,
    };

    const [data, totalRows] = await Promise.all([
      this.prisma.category.findMany({
        where,
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      this.prisma.category.count({ where }),
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

  async getById(categoryId: number) {
    return await this.prisma.category.findUniqueOrThrow({
      where: { id: categoryId },
    });
  }

  async update(categoryDto: CategoryDto, categoryID: number) {
    return await this.prisma.category.update({
      where: { id: categoryID },
      data: categoryDto,
    });
  }

  async softDelete(categoryId: number) {
    return await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  }
}
