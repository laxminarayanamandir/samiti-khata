import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CommitteeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 chars long.' })
  name!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Description must be at least 2 chars long.' })
  description!: string;
}
