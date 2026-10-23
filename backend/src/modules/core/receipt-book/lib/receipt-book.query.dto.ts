import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetQueryDto } from '../../../../common/queryString.dto';

export class ReceiptBookQueryDto extends GetQueryDto {
  @ApiPropertyOptional({
    description: 'Fiscal Year ID',
  })
  @IsString()
  fiscalYearId: string = '';

  @ApiPropertyOptional({
    description: 'Assigned To ID',
  })
  @IsString()
  assignedTo: string = '';

  @ApiPropertyOptional({
    description: 'Status of the receipt book',
  })
  @IsString()
  status: string = '';
}
