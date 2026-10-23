import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SubCommitteeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 chars long.' })
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description!: string;

  @ApiProperty()
  @IsNumber()
  mainCommitteeId!: number;
}
