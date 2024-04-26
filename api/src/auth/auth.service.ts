import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly mailerService: MailerService,
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
}
