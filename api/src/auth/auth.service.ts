import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { MailerService } from 'src/mailer/mailer.service';
import { SigninDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly JwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}
  async signup(signupDto: SignupDto) {
    const { firstname, lastname, email, password, imageProfile } = signupDto;
    // ** Vérifier si l'utilisateur est déjà inscrit **
    const user = await this.PrismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('Cet utilisateur est déjà inscrit');
    // ** Hasher le mot de passe **
    const hash = await bcrypt.hash(password, 10);
    // ** Enregistrer l'utilisateur dans la base de données **
    await this.PrismaService.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hash,
        imageProfile,
        is_admin: false,
      },
    });
    // ** Envoyer un email de confirmation **
    await this.mailerService.sendSignupConformation(email);
    return { data: 'Utilisateur inscrit avec succes' };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    /** Vérifier si l'utilisateur est inscrit */ const user =
      await this.PrismaService.user.findUnique({ where: { email } });
    if (!user) throw new ConflictException("Cet utilisateur n'est pas inscrit");
    /**Comparer le mot de passe */
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Mot de passe incorrect');
    /**Retourner un token JWT */
    const payload = { sub: user.id, email: user.email };
    const token = this.JwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.ConfigService.get('SECRET_KEY'),
    });
    return {
      token,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        imageProfile: user.imageProfile,
      },
    };
  }

  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;
    /** Vérifier si l'utilisateur est inscrit */ const user =
      await this.PrismaService.user.findUnique({ where: { email } });
    if (!user) throw new ConflictException("Cet utilisateur n'est pas inscrit");
    const code = speakeasy.totp({
      secret: this.ConfigService.get('OTP_CODE'),
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    });
    const url = 'http://localhost:3001/auth/reset-password-confirmation';
    await this.mailerService.sendResetPassword(email, url, code);
    return { data: 'Code envoyé' };
  }

  async resetPasswordConfirmation(
    resetPasswordConfirmationDto: ResetPasswordConfirmationDto,
  ) {
    const { email, code, password } = resetPasswordConfirmationDto;
    /** Vérifier si l'utilisateur est inscrit */
    const user = await this.PrismaService.user.findUnique({ where: { email } });
    if (!user) throw new ConflictException("Cet utilisateur n'est pas inscrit");
    const match = speakeasy.totp.verify({
      secret: this.ConfigService.get('OTP_CODE'),
      token: code,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    })
    if (!match) throw new UnauthorizedException('Code incorrect/token expire');
    const hash = await bcrypt.hash(password, 10);
    await this.PrismaService.user.update({
      where: { email },
      data: { password: hash },
    });
    return { data: 'Mot de passe mis à jour' };
  }
}
