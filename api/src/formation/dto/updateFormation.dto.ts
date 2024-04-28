import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateFormationDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly logo: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description?: string;
}
