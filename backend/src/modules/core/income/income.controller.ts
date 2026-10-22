import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { Response } from 'express';
import { IncomeService } from './income.service';
import { type UserJwtPayload } from '@shared/auth';
import buildIncomeWhereClause from './lib/buildIncomeWhereClause';
import {
  IncomeDto,
  SoftDeleteIncomeDto,
  UpdateIncomeDto,
} from './lib/income.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { RequireAdminOrOperator } from '@shared/auth/decorators/adminOrOperator.decorator';
import { IncomeQueryDto } from './lib/income.query.dto';
import { IncomeExportDto, IncomeExportScope } from './lib/income-export.dto';

@Controller('income')
@RequireAdminOrOperator()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(
    @Body() incomeDto: IncomeDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.incomeService.create(incomeDto, userId);
  }

  @Get()
  async getIncomes(
    @GetUser('organizationId') organizationId: number,
    @Query() query: IncomeQueryDto,
  ) {
    const whereClause = buildIncomeWhereClause(organizationId, query);
    return await this.incomeService.getFilteredIncomes(whereClause, query);
  }

  @Post('export')
  async exportIncomes(
    @GetUser() user: UserJwtPayload,
    @Body() exportDto: IncomeExportDto,
    @Res() response: Response,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');

    const whereClause = buildIncomeWhereClause(user.organizationId, exportDto);
    const workbook = await this.incomeService.exportIncomes({
      whereClause,
      query: exportDto,
      userId: user.userId,
      organizationId: user.organizationId,
      scope: exportDto.scope,
      password: exportDto.password,
      paginate: exportDto.scope === IncomeExportScope.CURRENT_PAGE,
    });

    response.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="income-export.xlsx"',
      'Content-Length': workbook.length,
    });

    return response.send(workbook);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.incomeService.getById(id, organizationId);
  }

  @Put(':id')
  async update(
    @Body() updateIncomeDto: UpdateIncomeDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.incomeService.update(id, updateIncomeDto, {
      description: updateIncomeDto.description,
      organizationId: user.organizationId,
      userId: user.userId,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('id', ParseIntPipe) id: number,
    @Body() softDeleteIncomeDto: SoftDeleteIncomeDto,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.incomeService.softDelete(id, {
      description: softDeleteIncomeDto.reason,
      organizationId: user.organizationId,
      userId: user.userId,
    });
  }
}
