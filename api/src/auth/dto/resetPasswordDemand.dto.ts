import { IsEmail } from 'class-validator';
export class ResetPasswordDemandDto {
  @IsEmail()
  readonly email: string;

}
