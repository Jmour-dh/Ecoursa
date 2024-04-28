import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class ResetPasswordConfirmationDto {
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  readonly code: string;
}
