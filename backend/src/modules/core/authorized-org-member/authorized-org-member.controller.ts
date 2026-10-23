import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { AuthorizedOrgMemberDto } from './lib/autorized-org-member.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { type UserJwtPayload } from '@shared/auth';
import { AuthorizedOrgMemberService } from './authorized-org-member.service';
import { GetQueryDto } from '../../../common/queryString.dto';

@Controller('authorized-org-member')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.OPERATOR)
export class AuthorizedOrgMemberController {
  constructor(
    private readonly authorizedOrgMemberService: AuthorizedOrgMemberService,
  ) {}

  @Post()
  async create(
    @Body() authrizedOrgMemberDto: AuthorizedOrgMemberDto,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.authorizedOrgMemberService.create(
      authrizedOrgMemberDto,
      user.organizationId,
    );
  }

  @Get()
  async getByUserOrg(
    @GetUser() user: UserJwtPayload,
    @Query() query: GetQueryDto,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return this.authorizedOrgMemberService.getByOrganization(
      user.organizationId,
      query,
    );
  }

  @Get(':organizationId')
  async getByOrg(
    @Param('organizationId', ParseIntPipe) organizationId: number,
  ) {
    return this.authorizedOrgMemberService.getByOrganization(organizationId);
  }
}
