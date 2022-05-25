import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full items-center justify-around">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (

            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-col items-center border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              type="button"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>

          )
        })}
      </div>
    </>
  )
}
