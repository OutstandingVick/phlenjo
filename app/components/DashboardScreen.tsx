import type { PointerEvent } from "react";
import type { Activity, Category } from "../data/phlenjo";
import { tabs } from "../data/phlenjo";

type DashboardScreenProps = {
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
};

export function DashboardScreen({
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
}: DashboardScreenProps) {
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
