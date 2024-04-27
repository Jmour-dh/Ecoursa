import { IsNotEmpty, IsEmail } from 'class-validator';
export class SigninDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
