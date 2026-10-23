import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class OrganizationDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'Organization name should be at least 2 chars long.',
  })
  name!: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Address should be at least 2 chars long' })
  address!: string;

  @ApiProperty()
  @IsNumberString()
  @Length(10, 10)
  phoneNumber!: string;
}
