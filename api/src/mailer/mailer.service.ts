import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private async transport() {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      ignoreTLS: true
    })
    return transport;
  }

  async sendSignupConformation(userEmail: string) {
    (await this.transport()).sendMail({
      from: "Ecoursa <app@localhost.com>",
      to: userEmail,
      subject: "Inscription",
      html:"<h3>Confirmation de l'inscription</h3>"
    })
  }

  async sendResetPassword(userEmail: string, url:string, code: string) {
    (await this.transport()).sendMail({
      from: "Ecoursa <app@localhost.com>",
      to: userEmail,
      subject: "reset password",
      html:`
      <a href="${url}">Reset password</a>
      <p>Code secret : ${code}</p>
      <p>Le code expirera dans 15 minutes</p>
      `
    })
  }
}
