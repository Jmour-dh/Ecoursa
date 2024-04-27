import { IsNotEmpty } from 'class-validator';

export class CreateCoursDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly link: string;
  @IsNotEmpty()
  readonly formationId: number;

}
