import { IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetQueryDto } from '../../../../common/queryString.dto';

export class IncomeQueryDto extends GetQueryDto {
  @ApiPropertyOptional({
    description: 'Receipt Book ID',
  })
  @IsString()
  receiptBookId: string = '';

  @ApiPropertyOptional({
    description: 'Committee ID',
  })
  @IsString()
  committeeId: string = '';

  @ApiPropertyOptional({
    description: 'Minimum Amount range filter',
  })
  @IsNumber()
  minAmount: number = -1;

  @ApiPropertyOptional({
    description: 'Maximum Amount range filter',
  })
  @IsNumber()
  maxAmount: number = -1;

}
