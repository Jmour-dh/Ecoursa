import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional, IsString } from 'class-validator';
export class UpdateAccountDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstname: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastname: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly imageProfile: string;
}
