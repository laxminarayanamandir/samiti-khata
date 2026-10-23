import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { IsGreaterThan } from '../../../../common/customDtoDecorator/isGreaterThan.decorator';
import { BookStatus } from '@prisma/client';

export class ReceiptBookDto {
  @ApiProperty()
  @IsNumber()
  @Min(1, {
    message: 'Receipt Book Number should start from 1.',
  })
  bookNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1, {
    message: 'Receipt Starting Number should start from 1.',
  })
  receiptStartingNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('receiptStartingNumber')
  receiptEndingNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fiscalYearId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  assignedTo?: number;

  @ApiPropertyOptional({
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  assignedAt?: string;

  @ApiPropertyOptional({
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  returnedAt?: string;

  @ApiProperty({
    enum: BookStatus,
  })
  @IsEnum(BookStatus)
  status!: BookStatus;
}
