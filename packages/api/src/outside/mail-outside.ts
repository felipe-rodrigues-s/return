export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailOutside {
  sendMail: (data: SendMailData) => Promise<void>;
}