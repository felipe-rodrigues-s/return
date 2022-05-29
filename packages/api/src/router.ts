import express from  'express';
import nodemailer from  'nodemailer';
import { NodemailerMailOutside } from './outside/nodemalier/nodemailer-mail-outside';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repositorys';
import { SubmitFeedbackUseCase } from './usecases/submit-feedbacks-use-case';


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
  const { type , comments, screenshots} = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository
  const nodemailerMailOutside = new NodemailerMailOutside

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailOutside
    )
 
  
  await submitFeedbackUseCase.execute({
    type,
    comments,
    screenshots
  })
  
  return res.status(201).send("success");
})