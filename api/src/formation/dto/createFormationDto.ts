import { IsNotEmpty } from 'class-validator';
export class CreateFormationDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
}
