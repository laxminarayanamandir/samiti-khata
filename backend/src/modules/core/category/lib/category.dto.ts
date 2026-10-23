import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Category name should at least 2 chars long.' })
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description!: string;
}
