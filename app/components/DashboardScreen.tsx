import type { Activity, Category } from "../data/phlenjo";
import { tabs } from "../data/phlenjo";
import { SwipeCard } from "./SwipeCard";

type DashboardScreenProps = {
  activeTab: Category;
  currentActivity: Activity;
  filteredActivities: Activity[];
  onMove: (direction: "left" | "right") => void;
  onTab: (tab: Category) => void;
  onTrip: () => void;
  onReset: () => void;
  savedCount: number;
};

export function DashboardScreen({
  activeTab,
  currentActivity,
  filteredActivities,
  onMove,
  onTab,
  onTrip,
  onReset,
  savedCount,
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
        <div className="flex items-center gap-2">
          <button className="hidden h-11 rounded-[8px] bg-white/10 px-3 text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:text-white sm:block" onClick={onReset}>
            Reset
          </button>
          <button className="relative grid size-11 place-items-center rounded-[8px] bg-white/10 text-lg" onClick={onTrip} aria-label="My Trip">
            💬
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#39FF14] text-[10px] font-black text-black">
              {savedCount}
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto mt-5 flex w-full max-w-6xl items-end justify-between px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Your Daily Deck</p>
          <h2 className="font-display text-3xl font-black tracking-normal sm:text-4xl lg:text-5xl">Today in Lagos</h2>
        </div>
        <span className="rounded-full bg-[#8A2BE2]/20 px-3 py-1 text-xs font-bold text-[#caa8ff]">Live picks</span>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
        <SwipeCard activity={currentActivity} onMove={onMove} />

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
                  <div className="flex items-center gap-2">
                    <p className="truncate font-black">{activity.title}</p>
                    <span className="shrink-0 text-xs font-black text-[#39FF14]">{activity.priceRange}</span>
                  </div>
                  <p className="truncate text-xs text-white/55">{activity.area} · {activity.time}</p>
                  <p className="mt-1 line-clamp-1 text-xs font-semibold text-white/40">{activity.vibe}</p>
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
