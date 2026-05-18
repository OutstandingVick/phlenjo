import { questions } from "../data/phlenjo";

type ChatScreenProps = {
  answers: string[];
  onAnswer: (answer: string) => void;
  progress: number;
  questionIndex: number;
};

export function ChatScreen({ answers, onAnswer, progress, questionIndex }: ChatScreenProps) {
  const question = questions[questionIndex];

  return (
    <section className="flex min-h-screen flex-col bg-[#0B0C10] px-5 py-6 sm:px-8 lg:min-h-[calc(100vh-3rem)] lg:px-12 xl:px-16">
      <div className="mx-auto mb-5 w-full max-w-5xl">
        <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em] text-white/45">
          <span>Detty Meter</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div className="vibe-fill h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-5xl flex-1 content-end gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="chat-bubble max-w-[88%] rounded-[8px] border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/30 lg:max-w-none lg:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[#39FF14] text-xl">🤖</span>
            <div>
              <p className="font-bold text-white">Gidi</p>
              <p className="text-xs text-white/45">Oya, tell me the truth...</p>
            </div>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl lg:text-6xl">{question.prompt}</h2>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-3">
            {answers.map((answer) => (
              <div key={answer} className="ml-auto max-w-[82%] rounded-[8px] bg-[#39FF14] px-4 py-3 text-sm font-black text-black">
                {answer}
              </div>
            ))}
          </div>

          <div className="grid gap-3 pb-3">
            {question.options.map((option) => (
              <button
                className="option-block flex min-h-16 items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.07] px-4 text-left font-extrabold text-white transition hover:border-[#39FF14]/60 active:scale-[0.985] lg:min-h-20"
                key={option}
                onClick={() => onAnswer(option)}
              >
                <span>{option}</span>
                <span className="text-[#39FF14]">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
