import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly imageProfile?: string;
}
