import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CommitteeDto } from './lib/committee.dto';
import type { UserJwtPayload } from '@shared/auth';
import { CommitteeService } from './committee.service';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { GetQueryDto } from '../../../common/queryString.dto';

@Controller('committee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(
    @Body() committeeDto: CommitteeDto,
    @GetUser() user: UserJwtPayload,
  ) {
    const { userId, organizationId } = user;
    if (!organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.committeeService.create(
      committeeDto,
      userId,
      organizationId,
    );
  }

  @Get('/organization')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getAll(@GetUser() user: UserJwtPayload, @Query() query: GetQueryDto) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id is required.');

    return await this.committeeService.findAll(user.organizationId, query);
  }

  @Put(':committeeId')
  @Roles(UserRole.ADMIN)
  async updateCommittee(
    @Body() committeeDto: CommitteeDto,
    @Param('committeeId', ParseIntPipe) committeeId: number,
  ) {
    return await this.committeeService.update(committeeDto, committeeId);
  }

  @Patch('/active-status/:committeeId')
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Body('status', ParseBoolPipe) status: boolean,
    @Param('committeeId', ParseIntPipe) committeeId: number,
  ) {
    return await this.committeeService.updateStatus(status, committeeId);
  }

  @Delete(':committeeId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('committeeId', ParseIntPipe) committeeId: number) {
    return await this.committeeService.softDelete(committeeId);
  }

  @Get(':committeeId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getById(@Param('committeeId', ParseIntPipe) committeeId: number) {
    return await this.committeeService.findById(committeeId);
  }
}
