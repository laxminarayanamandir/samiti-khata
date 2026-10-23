import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Prisma, UserRole, UserStatus } from '@prisma/client';
import { UsersService } from '@shared/users';

@Injectable()
export class UserOrganizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Get details of organization that is assigned to user
   * @param userId Id of the user
   * @returns details of organization that is assigned to user
   */
  async getByUserId(userId: number) {
    return await this.prisma.userOrganization.findUnique({
      where: { userId },
    });
  }

  /**
   * Approves the admin or operator account by assigning organization
   * @param userId id of the user
   * @param organizationId  id of the organization
   * @param role desired role of the user
   * @returns newly created details
   */
  async approveUser(userId: number, organizationId: number, role: UserRole) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // 1. integrate user in the organization
        await tx.userOrganization.create({
          data: {
            organizationId,
            userId,
            status: 'ACTIVE',
          },
        });

        // 2. change role of the user
        // default is operator so if user is operator, no need to update
        if (role === 'OPERATOR') return;

        await this.userService.changeRole(userId, role, tx);

        return {
          userId,
          organizationId,
          role,
        };
      },
    );
  }

  /**
   * Update Account Status of the organization admin or operator.
   * @param status Status that is to be set, of type UserStatus
   * @param userId Id of the user to update
   * @returns nothing
   */

  async updateAccountStatus(status: UserStatus, userId: number) {
    return await this.prisma.userOrganization.update({
      where: {
        userId,
      },
      data: {
        status,
      },
    });
  }
}
