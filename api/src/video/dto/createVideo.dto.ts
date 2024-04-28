import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string
  @IsNotEmpty()
  @IsString()
  readonly link: string
  @IsNotEmpty()
  @IsNumber()
  readonly coursId: number
}