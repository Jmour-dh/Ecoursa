import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional } from 'class-validator';
export class UpdateAccountDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly firstname: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly lastname: string;
  @ApiPropertyOptional()
  @IsOptional()
  readonly imageProfile: string;
}
