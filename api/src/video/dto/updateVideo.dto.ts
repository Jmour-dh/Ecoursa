import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVideoDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly link: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  readonly coursId: number;
}
