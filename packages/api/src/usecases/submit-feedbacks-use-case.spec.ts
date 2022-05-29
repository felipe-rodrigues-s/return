import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

describe('Submit feedback', () => {
  it('should be able to submit feedback',async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      {create: async ()=> {}},
      {sendMail: async ()=> {}},
    )

    await expect(submitFeedback.execute({
      type: 'BUG',
      comments: 'test comment',
      screenshots: "test.jpg",
    })).resolves.not.toThrow()
  })
})