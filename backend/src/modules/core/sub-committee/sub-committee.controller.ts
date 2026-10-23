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
import { SubCommitteeDto } from './lib/subCommittee.dto';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { SubCommitteeService } from './sub-committee.service';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { GetQueryDto } from '../../../common/queryString.dto';

@Controller('sub-committee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubCommitteeController {
  constructor(private readonly subCommitteeService: SubCommitteeService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() subCommitteeDto: SubCommitteeDto) {
    return await this.subCommitteeService.create(subCommitteeDto);
  }

  @Get('committee:committeeId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getByCommittee(
    @Param('committeeId', ParseIntPipe) committeeId: number,
  ) {
    return await this.subCommitteeService.getByCommittee(committeeId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getAll(
    @GetUser('organizationId') organizationId: number,
    @Query() query: GetQueryDto,
  ) {
    return await this.subCommitteeService.getAll(organizationId, query);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getCommittee(@Param('id', ParseIntPipe) committeeId: number) {
    return await this.subCommitteeService.get(committeeId);
  }
}
