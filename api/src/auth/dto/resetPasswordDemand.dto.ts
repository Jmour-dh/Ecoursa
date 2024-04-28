import { IsEmail, IsString } from 'class-validator';
export class ResetPasswordDemandDto {
  @IsEmail()
  @IsString()
  readonly email: string;

}
