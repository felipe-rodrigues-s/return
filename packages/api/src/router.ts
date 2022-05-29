import { prisma } from './prisma';
import express from  'express';
import nodemailer from  'nodemailer';


export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0cb761cb75b62e",
    pass: "ff9e422642b0eb"
  }
});


routes.post(`/feedbacks`, async (req, res) => {
  const  {type, comments, screenshots }= req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comments,
      screenshots,
    }
  })

  await transport.sendMail({
    from: "Equipe Feedget <1felipersilva1@gmail.com>",
    to: "Felipe Silva <1felipersilva1@gmail.com>",
    subject: "feedback",
    html: [
      `<div style="font-family: sans-serif; font-size:16px color:#111">`,
      `<p>Tipo do Feedback: ${type}</p>`,
      `<p>Comentário: ${comments}</p>`,
      `<div>`
    ].join('\n')
  })

  return res.status(201).json({data: feedback})
})