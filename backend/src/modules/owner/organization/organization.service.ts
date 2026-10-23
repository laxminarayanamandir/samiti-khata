import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { OrganizationDto } from './libs/organization.dto';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  /***
   * Creates an organization
   * @param organizationDto: Payload required for organization creation
   * @param ownerId: Id of OWNER user role. Only OWNER can create organization
   * @returns newly created organization details from database
   */
  async create(organizationDto: OrganizationDto, ownerId: number) {
    const orgExists = await this.getByEmail(organizationDto.email);
    if (orgExists)
      throw new ConflictException(
        'The email is already assigned to another organization.',
      );
    return await this.prisma.organization.create({
      data: {
        address: organizationDto.address,
        email: organizationDto.email,
        name: organizationDto.name,
        phoneNumber: organizationDto.phoneNumber,
        createdBy: ownerId,
      },
    });
  }

  /**
   * Get all organizations created by ownerId
   * @param ownerId Id of OWNER role.
   * @returns object with results and meta.
   */

  async getAll({
    ownerId,
    queryDto,
  }: {
    ownerId: number;
    queryDto: GetQueryDto;
  }) {
    const [data, totalRows] = await Promise.all([
      // find data
      this.prisma.organization.findMany({
        where: {
          createdBy: ownerId,
        },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      // count pages
      this.prisma.organization.count({
        where: {
          createdBy: ownerId,
        },
      }),
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

  /**
   * Get an organization by it's Id
   * @param orgId: Organization Id
   * @returns Organization that matches the Id
   */

  async getById(orgId: number) {
    const org = await this.prisma.organization.findFirst({
      where: {
        id: orgId,
      },
    });

    return org;
  }

  /**
   * Get an organization by it's email
   * @param email Email of the organization
   * @returns Organization
   */

  async getByEmail(email: string) {
    return await this.prisma.organization.findFirst({
      where: {
        email,
      },
    });
  }

  /**
   * Get an organization that is assigned to the user
   * @param userId
   * @returns
   */
  async getAssignedOrg(userId: number) {
    return await this.prisma.organization.findFirst({
      where: {
        UserOrganization: {
          every: {
            userId,
          },
        },
      },
    });
  }
}
