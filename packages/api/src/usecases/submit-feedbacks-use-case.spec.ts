import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpay = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpay},
)

describe('Submit feedback', () => {
  it('should be able to submit feedback',async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comments: 'test comment',
      screenshots: "data:image/png;base64,8s48a4s4asd4asd4a89sd48",
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpay).toHaveBeenCalled()
  });

  it('should not be able to submit Feedback without type',async () => {
    await expect(submitFeedback.execute({
      type: '',
      comments: 'test comment',
      screenshots: "data:image/png;base64,8s48a4s4asd4asd4a89sd48",
    })).rejects.toThrow()
  });

  it('should not be able to submit feedback without comments',async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comments: '',
      screenshots: "data:image/png;base64,8s48a4s4asd4asd4a89sd48",
    })).rejects.toThrow()
  });

  it('should not be able to submit feedback with an invalid screenshots',async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comments: 'test comment',
      screenshots: "test.png",
    })).rejects.toThrow()
  });
})