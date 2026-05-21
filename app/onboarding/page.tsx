"use client";

import { useRouter } from "next/navigation";
import { ChatScreen } from "../components/ChatScreen";
import { PhlenjoFrame } from "../components/PhlenjoFrame";
import { usePhlenjoState } from "../hooks/usePhlenjoState";

export default function OnboardingPage() {
  const router = useRouter();
  const { answers, answerQuestion, progress, questionIndex } = usePhlenjoState();

  function handleAnswer(answer: string) {
    const isComplete = answerQuestion(answer);
    if (isComplete) {
      setTimeout(() => router.push("/dashboard"), 260);
    }
  }

  return (
    <PhlenjoFrame>
      <ChatScreen answers={answers} onAnswer={handleAnswer} progress={progress} questionIndex={questionIndex} />
    </PhlenjoFrame>
  );
}
