import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMode } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ExpenseDto {
  @ApiProperty()
  @IsDateString({}, { message: 'Date is required.' })
  date!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Nepali date must be in YYYY-MM-DD format',
  })
  nepaliDate!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Recepient Name should be at least 2 chars long.' })
  recepientName!: string;

  @ApiPropertyOptional()
  @IsString()
  recepientAddress?: string = '';

  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'Particulars is required' })
  particulars!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  quantity!: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Amount must be greater than 0' })
  amount!: number;

  @ApiProperty({ enum: PaymentMode })
  @IsEnum(PaymentMode)
  paymentMode!: PaymentMode;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  voucherNumber!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  billNumber!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  remarks!: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Category is required' })
  categoryId!: number;

  @ApiProperty()
  @IsNumber({}, { message: 'Committee is required' })
  committeeId!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  subCommitteeId!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  payerId!: number;
}

export class UpdateExpenseDto extends ExpenseDto {
  @IsString({ message: 'Please provide description for update reason.' })
  @MinLength(5, { message: 'Description should be at least 10 chars long.' })
  description!: string;
}
