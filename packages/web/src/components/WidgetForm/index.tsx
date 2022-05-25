import { useState } from "react";


import bugImageurl from '../../assets/bug.svg';
import ideaImageurl from '../../assets/idea.svg';
import thoughtImageurl from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageurl,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageurl,
      alt: "Imagem de um lampada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageurl,
      alt: "Imagem de um balão de pensamento"
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>()
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center
     shadow-lg w-[calc(100vw-3rem)] md:w-auto">

      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com amor <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
      </footer>

    </div>
  )
}