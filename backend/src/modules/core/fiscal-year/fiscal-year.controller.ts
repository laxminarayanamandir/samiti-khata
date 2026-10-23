import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { FiscalYearService } from './fiscal-year.service';
import { FiscalYearDto } from './lib/fiscal-year.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { GetQueryDto } from '../../../common/queryString.dto';

@Controller('fiscal-year')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class FiscalYearController {
  constructor(private readonly fiscalYearService: FiscalYearService) {}

  @Post()
  async create(
    @Body() fiscalYearDto: FiscalYearDto,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.fiscalYearService.create(fiscalYearDto, organizationId);
  }

  @Get()
  async getByOrg(
    @GetUser('organizationId') organizationId: number,
    @Query() query: GetQueryDto,
  ) {
    return await this.fiscalYearService.getByOrg(organizationId, query);
  }
}
