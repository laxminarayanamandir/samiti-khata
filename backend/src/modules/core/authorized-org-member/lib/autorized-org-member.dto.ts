import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class AuthorizedOrgMemberDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name should be at least 2 chars long' })
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address!: string;

  @ApiPropertyOptional()
  @IsString()
  @Matches(/^(\d{10})?$/, {
    message: 'Phone number must be 10 digits or empty',
  })
  @IsOptional()
  phone!: string;
}
