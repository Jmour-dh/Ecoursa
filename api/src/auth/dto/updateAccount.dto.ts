import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageProfile?: string;
}
