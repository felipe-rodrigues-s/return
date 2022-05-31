import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../SceenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackSent: () => void
  onFeedbackRestartRequested: () => void
}

export function FeedbackContentStep({
  onFeedbackSent, feedbackType,
  onFeedbackRestartRequested }: FeedbackContentStepProps) {
  const [screenshots, setScreenshot] = useState<string | null>(null)
  const [comments, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    
    event.preventDefault();
    setIsSendingFeedback(true);

    console.log({
      comments,
      screenshots,
    })

    await api.post('/feedbacks', {
      type: feedbackType,
      comments,
      screenshots,
    })

    setIsSendingFeedback(false);

    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          onClick={onFeedbackRestartRequested}
          type="button"
          className="top-5 left-2 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form
        onSubmit={handleSubmitFeedback}
        className="my-4 w-full">
        <textarea
          className="min-w-[30em] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600  bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none"
          placeholder="Conte com detalhes o que está acontecendo.."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshots}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comments.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> :'Enviar o seu feedback'}
            
          </button>
        </footer>
      </form>
    </>
  )
}