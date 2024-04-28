import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {
  @IsNotEmpty()
  readonly title: string
  @IsNotEmpty()
  readonly link: string
  @IsNotEmpty()
  readonly coursId: number
}