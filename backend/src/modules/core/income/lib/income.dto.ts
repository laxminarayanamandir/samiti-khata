import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMode } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class IncomeDto {
  @ApiProperty()
  @IsNumber()
  receiptBookId!: number;

  @ApiProperty()
  @IsNumber()
  receiptNumber!: number;

  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'Name must be at least 2 chars long.',
  })
  @MaxLength(50, {
    message: 'Name cannot exceed 50 characters.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'Address must be at least 2 chars long.',
  })
  @MaxLength(50, {
    message: 'Address cannot exceed 50 characters.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  address!: string;

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty({
    enum: PaymentMode,
  })
  @IsEnum(PaymentMode)
  paymentMode!: PaymentMode;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  remarks?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'Invalid member assigned.' })
  receiptIssuerId?: number;

  @ApiProperty()
  @IsNumber()
  committeeId!: number;

  @ApiProperty()
  @IsDateString({}, { message: 'Date is required.' })
  date!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
    message: 'Invalid date.',
  })
  nepaliDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'Invalid Sub Committee' })
  subCommitteeId?: number;
}

export class UpdateIncomeDto extends IncomeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'Description should be at least 2 chars long.',
  })
  description!: string;
}

export class SoftDeleteIncomeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, {
    message: 'Reason should be at least 2 chars long.',
  })
  reason!: string;
}