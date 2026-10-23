import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsDateAfterOrEqual } from '../../../../common/customDtoDecorator/isDateAfterOrEqual.decorator';

export class UpdateBookStatusDto {
  @ApiProperty({
    enum: BookStatus,
  })
  @IsEnum(BookStatus)
  status!: BookStatus;

  @ApiPropertyOptional()
  @ValidateIf(
    (dto) =>
      dto.status === BookStatus.ASSIGNED || dto.status === BookStatus.RETURNED,
  )
  @IsNotEmpty({
    message: 'assignedTo is required when book is assigned or returned',
  })
  @IsNumber()
  @Min(1, { message: 'Invalid user id' })
  assignedTo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  assignedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @IsDateAfterOrEqual('assignedAt', {
    message: 'returnedAt must be after assignedAt',
  })
  returnedAt?: string;
}
