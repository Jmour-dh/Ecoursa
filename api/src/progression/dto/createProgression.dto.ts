import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProgressionDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly percentage: number;
  @IsNotEmpty()
  @IsNumber()
  readonly formationId: number;
  @IsNotEmpty()
  @IsNumber()
  readonly coursId: number;
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
