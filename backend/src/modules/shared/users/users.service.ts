import { ConflictException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { SignupDto } from '@shared/auth';
import { PrismaService } from '@shared/prisma';
import { Prisma, UserRole } from '@prisma/client';
import { GetQueryDto } from '../../../common/queryString.dto';
import { CreateAdminDto } from './libs/admin.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findAllAdmin(queryDto: GetQueryDto) {
    const [data, totalRows] = await Promise.all([
      // find data
      this.prisma.user.findMany({
        where: {
          role: 'ADMIN',
        },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),
      // count pages
      this.prisma.user.count({}),
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

  async getNameAndEmailById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }

  async createUser(signupDto: SignupDto) {
    const existingUser = await this.findByEmail(signupDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(signupDto.password, salt);

    return this.prisma.user.create({
      data: {
        fullName: signupDto.fullName,
        email: signupDto.email,
        password: hashedPassword,
        address: signupDto.address,
        phoneNumber: signupDto.phoneNumber,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        address: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const existingUser = await this.findByEmail(createAdminDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(createAdminDto.password, salt);

    return this.prisma.user.create({
      data: {
        fullName: createAdminDto.fullName,
        email: createAdminDto.email,
        password: hashedPassword,
        address: createAdminDto.address,
        phoneNumber: createAdminDto.phoneNumber,
        role: createAdminDto.role as UserRole,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        address: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async changeRole(id: number, role: UserRole, tx: Prisma.TransactionClient) {
    return await tx.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
  }
}
