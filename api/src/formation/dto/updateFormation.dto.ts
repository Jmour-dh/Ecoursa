import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateFormationDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly title?: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
