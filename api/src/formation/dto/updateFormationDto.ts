import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateFormationDto {
  @IsNotEmpty()
  @IsOptional()
  readonly title?: string;
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
