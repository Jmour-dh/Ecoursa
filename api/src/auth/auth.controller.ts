import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { AuthGuard } from '@nestjs/passport';
import {Request} from "express"
import { DeleteAccountDto } from './dto/deleteAccountDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('reset-password')
  resetPasswordDemand(@Body () resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.authService.resetPasswordDemand(resetPasswordDemandDto)
  }

  @Post('reset-password-confirmation')
  resetPasswordConfirmation(@Body () resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
    return this.authService.resetPasswordConfirmation(resetPasswordConfirmationDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteAccount(@Req() request : Request, @Body() deleteAccountDto: DeleteAccountDto) {
    const userId= request.user['id'];
    return this.authService.deleteAccount(userId, deleteAccountDto)
  }

}
