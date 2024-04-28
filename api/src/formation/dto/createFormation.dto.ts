import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFormationDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly logo: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;

}
