import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetQueryDto } from '../../../../common/queryString.dto';

export class ExpenseQueryDto extends GetQueryDto {
  @ApiPropertyOptional({
    description: 'Category ID',
  })
  @IsString()
  categoryId: string = '';

  @ApiPropertyOptional({
    description: 'Committee ID',
  })
  @IsString()
  committeeId: string = '';
}
