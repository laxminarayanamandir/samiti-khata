import { UserRole } from '@prisma/client';
import { OrganizationDto } from './libs/organization.dto';
import { OrganizationService } from './organization.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import type { UserJwtPayload } from '@shared/auth';
import { GetQueryDto } from '../../../common/queryString.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @Roles(UserRole.OWNER)
  @HttpCode(201)
  async create(
    @GetUser() user: UserJwtPayload,
    @Body() organization: OrganizationDto,
  ) {
    const result = await this.organizationService.create(
      organization,
      user.userId,
    );
    return result;
  }

  @Get()
  @Roles(UserRole.OWNER)
  async getAll(
    @GetUser('userId') ownerId: number,
    @Query() queryParams: GetQueryDto,
  ) {
    const result = await this.organizationService.getAll({
      ownerId,
      queryDto: queryParams,
    });
    return result;
  }

  @Get('me')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getUserOrganization(@GetUser('userId') userId: number) {
    return await this.organizationService.getAssignedOrg(userId);
  }

  @Get(':id')
  @Roles(UserRole.OWNER)
  async getById(@Param('id', ParseIntPipe) orgId: number) {
    return await this.organizationService.getById(orgId);
  }
}
