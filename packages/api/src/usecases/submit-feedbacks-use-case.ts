import { MailOutside } from "../outside/mail-outside";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comments: string;
  screenshots?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailOutside: MailOutside
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comments, screenshots } = request

    await this.feedbacksRepository.create({
      type,
      comments,
      screenshots
    })

    await this.mailOutside.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size:16px color:#111">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comments}</p>`,
        `<div>`].join('\n')
    })
  }
}