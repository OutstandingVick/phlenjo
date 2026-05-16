"use client";

import { PointerEvent, useMemo, useState } from "react";

type Screen = "welcome" | "chat" | "dashboard" | "trip";
type Category = "night" | "beach" | "chow" | "culture" | "secret";

type Activity = {
  title: string;
  category: Category;
  time: string;
  location: string;
  crowd: string;
  imageClass: string;
  traffic: "green" | "yellow" | "red";
};

const questions = [
  {
    prompt: "What's your Detty Level this holiday?",
    options: ["Soft Life Only", "Outside but Classy", "No Sleep till January"],
  },
  {
    prompt: "Pick your Lagos superpower.",
    options: ["Table Plug", "Beach Captain", "Food Map Genius"],
  },
  {
    prompt: "How far can your squad move?",
    options: ["Mainland Easy", "Island Premium", "Anywhere the vibe calls"],
  },
  {
    prompt: "Final truth: what's the budget mood?",
    options: ["Smart Spend", "Soft Life Flex", "Premium Detty"],
  },
];

const activities: Activity[] = [
  {
    title: "Moist Beach Club",
    category: "beach",
    time: "Peak Vibe: 4:00 PM",
    location: "Oniru, Lagos",
    crowd: "142 IJGBs added this today",
    imageClass: "beach-card",
    traffic: "yellow",
  },
  {
    title: "Velvet Room",
    category: "night",
    time: "Peak Vibe: 11:30 PM",
    location: "Victoria Island",
    crowd: "96 squads saved this tonight",
    imageClass: "night-card",
    traffic: "red",
  },
  {
    title: "Pepper Row Chow Trail",
    category: "chow",
    time: "Peak Vibe: 7:15 PM",
    location: "Lekki Phase 1",
    crowd: "58 foodies are locked in",
    imageClass: "chow-card",
    traffic: "green",
  },
  {
    title: "Freedom Park After Dark",
    category: "culture",
    time: "Peak Vibe: 6:00 PM",
    location: "Lagos Island",
    crowd: "74 creatives added this",
    imageClass: "culture-card",
    traffic: "yellow",
  },
];

const tabs: { id: Category; label: string; icon: string; locked?: boolean }[] = [
  { id: "night", label: "Nightlife", icon: "🍾" },
  { id: "beach", label: "Beach", icon: "🌊" },
  { id: "chow", label: "Chow", icon: "🌶️" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "secret", label: "Secret Lagos", icon: "🔒", locked: true },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [saved, setSaved] = useState<Activity[]>([activities[0]]);
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

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 lg:min-h-[calc(100vh-3rem)] lg:px-14 xl:px-20">
      <div className="lagos-night" aria-hidden="true">
        <span className="lagos-road" />
        <span className="lagos-lights lagos-lights-a" />
        <span className="lagos-lights lagos-lights-b" />
        <span className="lagos-lights lagos-lights-c" />
      </div>

      <header className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-white/45">Phlenjo</p>
          <h1 className="font-display text-3xl font-black tracking-normal text-white sm:text-4xl">Lagos, loaded.</h1>
        </div>
        <span className="rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 px-3 py-1 text-xs font-bold text-[#39FF14]">
          Beta
        </span>
      </header>

      <div className="relative z-10 grid gap-10 pb-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end xl:grid-cols-[minmax(0,1fr)_430px]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-[#39FF14]">Detty December is loading...</p>
          <h2 className="font-display max-w-4xl text-6xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
            What&apos;s your plan?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Tell Gidi your energy and get a Lagos plan that moves like a native app in your pocket.
          </p>
        </div>

        <div className="rounded-[8px] border border-white/10 bg-black/30 p-4 backdrop-blur sm:p-5">
          <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs font-black uppercase tracking-[0.14em] text-white/55">
            <span className="rounded-[8px] bg-white/10 py-3">Night</span>
            <span className="rounded-[8px] bg-white/10 py-3">Beach</span>
            <span className="rounded-[8px] bg-white/10 py-3">Chow</span>
          </div>
          <button
            className="flex h-16 w-full items-center justify-center gap-3 rounded-[8px] bg-[#39FF14] px-5 text-base font-black uppercase text-black shadow-[0_0_34px_rgba(57,255,20,0.45)] transition active:scale-[0.98]"
            onClick={onStart}
          >
            <span>Check Your Vibe</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ChatScreen({
  answers,
  onAnswer,
  progress,
  questionIndex,
}: {
  answers: string[];
  onAnswer: (answer: string) => void;
  progress: number;
  questionIndex: number;
}) {
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

function DashboardScreen({
  activeTab,
  currentActivity,
  filteredActivities,
  onDragStart,
  onPointerUp,
  onMove,
  onTab,
  onTrip,
  savedCount,
  throwClass,
}: {
  activeTab: Category;
  currentActivity: Activity;
  filteredActivities: Activity[];
  onDragStart: (x: number) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onMove: (direction: "left" | "right") => void;
  onTab: (tab: Category) => void;
  onTrip: () => void;
  savedCount: number;
  throwClass: string;
}) {
  return (
    <section className="flex min-h-screen flex-col px-4 pb-4 pt-5 sm:px-6 lg:min-h-[calc(100vh-3rem)] lg:px-10 lg:py-8 xl:px-14">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.05] p-3">
        <button className="grid size-11 place-items-center rounded-[8px] bg-white/10 text-lg" aria-label="Profile">
          👤
        </button>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Detty Level</p>
          <p className="font-display text-2xl font-black text-[#39FF14]">87%</p>
        </div>
        <button className="relative grid size-11 place-items-center rounded-[8px] bg-white/10 text-lg" onClick={onTrip} aria-label="My Trip">
          💬
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#39FF14] text-[10px] font-black text-black">
            {savedCount}
          </span>
        </button>
      </header>

      <div className="mx-auto mt-5 flex w-full max-w-6xl items-end justify-between px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Your Daily Deck</p>
          <h2 className="font-display text-3xl font-black tracking-normal sm:text-4xl lg:text-5xl">Today in Lagos</h2>
        </div>
        <span className="rounded-full bg-[#8A2BE2]/20 px-3 py-1 text-xs font-bold text-[#caa8ff]">Live picks</span>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
        <article
          className={`swipe-card ${throwClass} overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40`}
          onPointerDown={(event) => onDragStart(event.clientX)}
          onPointerUp={onPointerUp}
        >
          <div className={`activity-art ${currentActivity.imageClass}`}>
            <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-black text-[#39FF14] backdrop-blur">
              🔥 {currentActivity.crowd}
            </div>
          </div>
          <div className="p-5 lg:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl font-black tracking-normal sm:text-4xl">{currentActivity.title}</h3>
                <p className="mt-2 text-sm font-bold text-[#39FF14]">🔥 {currentActivity.time}</p>
                <p className="mt-1 text-sm text-white/65">📍 {currentActivity.location}</p>
              </div>
              <span className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/10 text-xl">✨</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="h-13 rounded-[8px] border border-white/10 bg-white/10 font-black text-white" onClick={() => onMove("left")}>
                ← Skip
              </button>
              <button className="h-13 rounded-[8px] bg-[#39FF14] font-black text-black shadow-[0_0_22px_rgba(57,255,20,0.35)]" onClick={() => onMove("right")}>
                Add →
              </button>
            </div>
          </div>
        </article>

        <aside className="rounded-[8px] border border-white/10 bg-white/[0.045] p-4 lg:flex lg:flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Explore</p>
              <h3 className="font-display text-2xl font-black">Raw Lagos</h3>
            </div>
            <span className="text-[#39FF14]">↗</span>
          </div>

          <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-wrap" aria-label="Explore categories">
            {tabs.map((tab) => (
              <button
                className={`shrink-0 rounded-[8px] border px-4 py-3 text-sm font-black transition ${
                  activeTab === tab.id
                    ? "border-[#39FF14] bg-[#39FF14] text-black"
                    : "border-white/10 bg-white/[0.06] text-white/75"
                }`}
                key={tab.id}
                onClick={() => onTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-2 grid gap-3 lg:content-start">
            {filteredActivities.map((activity) => (
              <div className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.05] p-3" key={activity.title}>
                <span className={`mini-art ${activity.imageClass}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-black">{activity.title}</p>
                  <p className="text-xs text-white/55">{activity.location}</p>
                </div>
                <span className="text-[#39FF14]">+</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function TripScreen({ activities, onBack }: { activities: Activity[]; onBack: () => void }) {
  const trip = activities.length ? activities : activities.slice(0, 1);
  const slots = ["Morning", "Afternoon", "Night"];

  return (
    <section className="min-h-screen px-5 py-6 sm:px-8 lg:min-h-[calc(100vh-3rem)] lg:px-12 xl:px-16">
      <header className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">
        <button className="grid size-11 place-items-center rounded-[8px] bg-white/10 text-lg" onClick={onBack} aria-label="Back to dashboard">
          ←
        </button>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">My Trip</p>
          <h1 className="font-display text-3xl font-black sm:text-4xl lg:text-5xl">Squad Route</h1>
        </div>
      </header>

      <div className="relative mx-auto max-w-5xl pl-7 lg:grid lg:grid-cols-3 lg:gap-5 lg:pl-0">
        <span className="absolute bottom-8 left-[13px] top-2 w-1 rounded-full bg-gradient-to-b from-[#39FF14] via-[#8A2BE2] to-white/20 lg:left-0 lg:right-0 lg:top-8 lg:h-1 lg:w-auto lg:bg-gradient-to-r" />
        {[...trip, ...activities].slice(0, 3).map((activity, index) => (
          <article className="relative mb-5 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 lg:mb-0 lg:mt-12" key={`${activity.title}-${index}`}>
            <span className="absolute -left-[26px] top-5 grid size-6 place-items-center rounded-full bg-[#0B0C10] ring-2 ring-[#39FF14] lg:-top-[42px] lg:left-4">
              <span className={`traffic-dot ${activity.traffic}`} />
            </span>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#39FF14]">{slots[index] ?? "Late"}</p>
              <div className="flex -space-x-2">
                <span className="avatar">T</span>
                <span className="avatar">K</span>
                <span className="avatar">A</span>
              </div>
            </div>
            <h2 className="font-display text-2xl font-black">{activity.title}</h2>
            <p className="mt-1 text-sm text-white/60">{activity.time} · {activity.location}</p>
            <div className="mt-4 rounded-[8px] border border-[#39FF14]/20 bg-[#39FF14]/10 px-3 py-2 text-xs font-bold text-[#b9ffad]">
              3/4 upvotes. Squad is feeling this.
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
