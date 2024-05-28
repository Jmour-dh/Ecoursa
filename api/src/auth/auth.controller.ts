import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Put,
  Get,
  Param
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@ApiTags('Authentification')
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
  resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.authService.resetPasswordDemand(resetPasswordDemandDto);
  }

  @Post('reset-password-confirmation')
  resetPasswordConfirmation(
    @Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    return this.authService.resetPasswordConfirmation(
      resetPasswordConfirmationDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteAccount(
    @Req() request: Request,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    const userId = request.user['id'];
    return this.authService.deleteAccount(userId, deleteAccountDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  update(@Body() updateAccountDto: UpdateAccountDto, @Req() request: Request) {
    const userId = request.user['id'];
    const email =request.user['email'];
    return this.authService.update(userId,email, updateAccountDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.authService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() request: Request) {
    const userId = request.user['id'];
    const token = request.headers.authorization.split(' ')[1];
    return this.authService.logout(userId, token);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getLoggedInUser(@Req() request: Request) {
    const userId = request.user['id'];
    return this.authService.getUserById(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deleteUserByAdmin(@Param('id') id: string){
    const idAsNumber = parseInt(id, 10);
    return this.authService.deleteAccountByAdmin(idAsNumber);
  }
}
