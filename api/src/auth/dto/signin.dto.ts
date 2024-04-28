import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class SigninDto {
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
