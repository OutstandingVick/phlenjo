"use client";

import type { PointerEvent } from "react";
import { useMemo, useState } from "react";
import { ChatScreen } from "./components/ChatScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { TripScreen } from "./components/TripScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import type { Category, Screen } from "./data/phlenjo";
import { activities, questions } from "./data/phlenjo";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [saved, setSaved] = useState([activities[0]]);
  const [activeTab, setActiveTab] = useState<Category>("night");
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [throwClass, setThrowClass] = useState("");

  const currentActivity = activities[activeCard % activities.length];
  const progress = screen === "chat" ? ((questionIndex + 1) / questions.length) * 100 : 87;

  const filteredActivities = useMemo(() => {
    if (activeTab === "secret") return activities.slice(0, 2);
    return activities.filter((activity) => activity.category === activeTab);
  }, [activeTab]);

  function answerQuestion(answer: string) {
    setAnswers((items) => [...items, answer]);

    if (questionIndex === questions.length - 1) {
      setTimeout(() => setScreen("dashboard"), 260);
      return;
    }

    setQuestionIndex((index) => index + 1);
  }

  function moveCard(direction: "left" | "right") {
    setThrowClass(direction === "right" ? "throw-right" : "throw-left");

    if (direction === "right") {
      setSaved((items) => {
        if (items.some((item) => item.title === currentActivity.title)) return items;
        return [...items, currentActivity];
      });
    }

    setTimeout(() => {
      setActiveCard((index) => index + 1);
      setThrowClass("");
    }, 240);
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    setDragStart(null);

    if (distance > 72) moveCard("right");
    if (distance < -72) moveCard("left");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#162016_0%,transparent_34%),radial-gradient(circle_at_bottom,#1a1230_0%,transparent_30%)] opacity-80" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col overflow-hidden bg-[#0B0C10]/95 shadow-2xl shadow-[#39FF14]/10 lg:my-6 lg:min-h-[calc(100vh-3rem)] lg:rounded-[8px] lg:border lg:border-white/10 xl:my-8 xl:min-h-[calc(100vh-4rem)]">
        {screen === "welcome" && <WelcomeScreen onStart={() => setScreen("chat")} />}
        {screen === "chat" && (
          <ChatScreen
            answers={answers}
            onAnswer={answerQuestion}
            progress={progress}
            questionIndex={questionIndex}
          />
        )}
        {screen === "dashboard" && (
          <DashboardScreen
            activeTab={activeTab}
            currentActivity={currentActivity}
            filteredActivities={filteredActivities}
            onDragStart={(x) => setDragStart(x)}
            onPointerUp={handlePointerUp}
            onMove={moveCard}
            onTab={setActiveTab}
            onTrip={() => setScreen("trip")}
            savedCount={saved.length}
            throwClass={throwClass}
          />
        )}
        {screen === "trip" && (
          <TripScreen activities={saved} onBack={() => setScreen("dashboard")} />
        )}
      </div>
    </main>
  );
}
