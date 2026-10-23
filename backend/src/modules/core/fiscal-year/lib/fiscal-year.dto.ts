import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, Matches } from 'class-validator';

export class FiscalYearDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  startDateBs!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDateIso!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  endDateBs!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDateIso!: string;
}
