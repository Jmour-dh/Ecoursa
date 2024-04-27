import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  readonly firstname: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @ApiPropertyOptional()
  @IsOptional()
  readonly imageProfile?: string;
}
