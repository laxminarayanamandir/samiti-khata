import { type SortDirection } from './types';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum SortDirn {
  'asc',
  'desc',
}

export class GetQueryDto {
  @ApiProperty({ default: 10, description: 'Page size' })
  @IsNumber()
  pageSize: number = 10;

  @ApiProperty({ default: 1, description: 'Page number' })
  @IsNumber()
  pageIndex: number = 1;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
    description: 'Sort direction',
  })
  @IsEnum(SortDirn)
  sortDir: SortDirection = 'desc';

  @ApiPropertyOptional({
    description: 'Search key',
  })
  @IsString()
  searchKey: string = '';

  @ApiPropertyOptional({
    description: 'Search column',
  })
  @IsString()
  searchColumn: string = '';
}
