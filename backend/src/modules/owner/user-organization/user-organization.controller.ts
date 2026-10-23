import { UserRole } from '@prisma/client';
import { UsersService } from '@shared/users';
import { ApproveUserDto } from './lib/approveUser.dto';
import { OrganizationService } from '@owner/organization';
import { UserOrganizationService } from './user-organization.service';
import {
  Body,
  Controller,
  NotFoundException,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UpdateStatusDto } from './lib/updateStatus.dto';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user-organization')
export class UserOrganizationController {
  constructor(
    private readonly userOrganizationService: UserOrganizationService,
    private readonly userService: UsersService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Post()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async approveUser(@Body() approveUserDto: ApproveUserDto) {
    const user = await this.userService.findById(approveUserDto.userId);
    const org = await this.organizationService.getById(
      approveUserDto.organizationId,
    );
    if (!user) throw new NotFoundException('User not found');
    if (!org) throw new NotFoundException('Organization not found');

    // restrict if role is owner
    if (approveUserDto.role === 'OWNER')
      throw new UnprocessableEntityException('Invalid user role OWNER');

    return await this.userOrganizationService.approveUser(
      approveUserDto.userId,
      approveUserDto.organizationId,
      approveUserDto.role,
    );
  }

  @Patch()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return await this.userOrganizationService.updateAccountStatus(
      updateStatusDto.status,
      updateStatusDto.userId,
    );
  }
}
