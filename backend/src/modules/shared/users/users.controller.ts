import { UserRole } from '@prisma/client';
import { UsersService } from './users.service';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { GetQueryDto } from '../../../common/queryString.dto';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateAdminDto } from './libs/admin.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/admin')
  @Roles(UserRole.OWNER)
  async getAllAdmin(@Query() queryParams: GetQueryDto) {
    const result = await this.usersService.findAllAdmin(queryParams);
    return result;
  }

  @ApiBody({ type: 'CreateAdminDto' })
  @Post('/admin')
  @Roles(UserRole.OWNER)
  @HttpCode(201)
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const result = await this.usersService.createAdmin(createAdminDto);
    return result;
  }
}
