import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transport() {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true,
      auth : {
        user: testAccount.user,
        pass: testAccount.pass}
    })
    return transport
  }
  async sendSignupConformation(userEmail: string) {
    (await this.transport()).sendMail({
      from: "Ecoursa <app@localhost.com>",
      to: userEmail,
      subject: "Inscription",
      html:"<h3>Confirmation de l'inscription</h3>"
    })
  }
}
