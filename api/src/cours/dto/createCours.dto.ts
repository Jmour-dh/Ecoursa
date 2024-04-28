import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCoursDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly link: string;
  @IsNotEmpty()
  @IsNumber()
  readonly formationId: number;

}
