import { MailOutside, SendMailData } from "../mail-outside";
import nodemailer from  'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0cb761cb75b62e",
    pass: "ff9e422642b0eb"
  }
});


export class NodemailerMailOutside implements MailOutside {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <1felipersilva1@gmail.com>",
      to: "Felipe Silva <1felipersilva1@gmail.com>",
      subject,
      html: body,
    })
  }
}