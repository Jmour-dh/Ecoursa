import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProgressionDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly percentage: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly formationId: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly coursId: number;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly userId: number;
}
