import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCoursDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly link: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly formationId: number;
}
