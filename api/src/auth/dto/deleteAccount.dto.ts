import { IsNotEmpty, IsString } from "class-validator";

export class DeleteAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}