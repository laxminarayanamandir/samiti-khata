import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class ApproveUserDto {
  @ApiProperty()
  @IsNumber()
  userId!: number;

  @ApiProperty()
  @IsNumber()
  organizationId!: number;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role!: UserRole;
}
