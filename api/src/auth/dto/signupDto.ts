import { IsNotEmpty, IsEmail } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  readonly firstname: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  readonly imageProfile?: string;
}
