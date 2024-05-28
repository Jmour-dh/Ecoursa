import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { MailerService } from 'src/mailer/mailer.service';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemand.dto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmation.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { UtilsService } from 'src/utils/utils.service';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly mailerService: MailerService,
    private readonly JwtService: JwtService,
    private readonly ConfigService: ConfigService,
  ) {}
  async signup(signupDto: SignupDto) {
    const { firstname, lastname, email, password, imageProfile } = signupDto;
    // ** Vérifier si l'utilisateur est déjà inscrit **
    const isRegistered = await this.utilsService.isUserRegistered(email);
    if (isRegistered)
      throw new NotFoundException('Cet utilisateur est déjà inscrit');
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
    /** Vérifier si l'utilisateur est inscrit */
    const isRegistered = await this.utilsService.isUserRegistered(email);
    if (!isRegistered) {
      throw new NotFoundException("Cet utilisateur n'est pas inscrit");
    }

    // Récupérer les informations de l'utilisateur depuis la base de données
    const user = await this.PrismaService.user.findUnique({ where: { email } });
    /**Comparer le mot de passe */
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Mot de passe incorrect');
    /**Retourner un token JWT */
    const payload = {
      sub: user.id,
      email: user.email,
      is_admin: user.is_admin,
    };
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
        is_admin: user.is_admin,
      },
    };
  }

  async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
    const { email } = resetPasswordDemandDto;
    /** Vérifier si l'utilisateur est inscrit */
    const isRegistered = await this.utilsService.isUserRegistered(email);
    if (!isRegistered) {
      throw new NotFoundException("Cet utilisateur n'est pas inscrit");
    }
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
    const isRegistered = await this.utilsService.isUserRegistered(email);
    if (!isRegistered) {
      throw new NotFoundException("Cet utilisateur n'est pas inscrit");
    }
    const match = speakeasy.totp.verify({
      secret: this.ConfigService.get('OTP_CODE'),
      token: code,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    });
    if (!match) throw new UnauthorizedException('Code incorrect/token expire');
    const hash = await bcrypt.hash(password, 10);
    await this.PrismaService.user.update({
      where: { email },
      data: { password: hash },
    });
    return { data: 'Mot de passe mis à jour' };
  }

  async deleteAccount(id: number, deleteAccountDto: DeleteAccountDto) {
    const { password } = deleteAccountDto;
    /** Vérifier si l'utilisateur est inscrit */
    const user = await this.PrismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException("Cet utilisateur n'est pas inscrit");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Mot de passe incorrect');
    await this.PrismaService.user.delete({ where: { id } });
    return { data: 'Compte supprimé' };
  }

  async update(
    userId: number,
    email: string,
    updateAccountDto: UpdateAccountDto,
  ) {
    const isRegistered = await this.utilsService.isUserRegistered(email);
    if (!isRegistered) {
      throw new NotFoundException("Cet utilisateur n'est pas inscrit");
    }
    await this.PrismaService.user.update({
      where: { id: userId },
      data: { ...updateAccountDto },
    });
    return { data: 'Compte mis à jour' };
  }

  async getAll() {
    return await this.PrismaService.user.findMany({
      where: { is_admin: false },
      include: {
        progressions: true,
      },
    }).then(users =>
      users.map(({ password, ...user }) => user)
    );
  }

  async logout(userId: number, token: string) {
    await this.PrismaService.revokedToken.create({
      data: {
        userId,
        token,
        revokedAt: new Date(),
      },
    });
    return { data: 'Déconnexion réussie' };
  }

  async getUserById(userId: number) {
    const user = await this.PrismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }
    
    const { password, ...userData } = user;

    return userData;
  }

  async deleteAccountByAdmin(id: number) {
    await this.PrismaService.user.delete({ where: { id } });
    return { data: 'Compte supprimé par un administrateur' };
  }
  
  

}
