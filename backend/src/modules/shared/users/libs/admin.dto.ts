import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  fullName!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Address must be at least 2 characters long' })
  address!: string;

  @ApiProperty()
  @IsString()
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  phoneNumber!: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role!: UserRole;
}
