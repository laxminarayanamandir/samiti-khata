import { IsEnum, IsString, MinLength } from 'class-validator';
import { IncomeQueryDto } from './income.query.dto';

export enum IncomeExportScope {
  ALL_MATCHING = 'all-matching',
  CURRENT_PAGE = 'current-page',
}

export class IncomeExportDto extends IncomeQueryDto {
  @IsString()
  @MinLength(1)
  password!: string;

  @IsEnum(IncomeExportScope)
  scope!: IncomeExportScope;
}
