import { IsNumber, IsOptional, NotEquals } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CursorPaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cursor?: number;

  @ApiProperty()
  @IsNumber()
  @NotEquals(0, { message: 'Limit cannot be 0' })
  limit: number = 10;
}
