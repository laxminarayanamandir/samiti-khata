import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ enum: UserStatus })
  @IsEnum(UserStatus, { message: 'Unknown Status' })
  status!: UserStatus;

  @ApiProperty()
  @IsNumber()
  userId!: number;
}
