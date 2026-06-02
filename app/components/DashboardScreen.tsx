import type { Activity, Category, CrowdLevel, PriceRange, TimeOfDay } from "../data/phlenjo";
import { tabs } from "../data/phlenjo";
import { SwipeCard } from "./SwipeCard";

type ExploreFilters = {
  area: string;
  budget: PriceRange | "all";
  crowd: CrowdLevel | "all";
  time: TimeOfDay | "all";
  trafficFriendlyOnly: boolean;
};

type FilterOptions = {
  areas: string[];
  budgets: PriceRange[];
  crowds: CrowdLevel[];
  times: TimeOfDay[];
};

type FilterHandlers = {
  area: (area: string) => void;
  budget: (budget: PriceRange | "all") => void;
  crowd: (crowd: CrowdLevel | "all") => void;
  time: (time: TimeOfDay | "all") => void;
  trafficFriendlyOnly: (enabled: boolean) => void;
};

type DashboardScreenProps = {
  activeTab: Category;
  currentActivity: Activity;
  filteredActivities: Activity[];
  filterOptions: FilterOptions;
  filters: ExploreFilters;
  onAddActivity: (activity: Activity) => void;
  onClearFilters: () => void;
  onFilterChange: FilterHandlers;
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
  filterOptions,
  filters,
  onAddActivity,
  onClearFilters,
  onFilterChange,
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

          <div className="mt-3 grid gap-3 rounded-[8px] border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Filters</p>
              <button className="text-xs font-black uppercase tracking-[0.14em] text-[#39FF14]" onClick={onClearFilters}>
                Clear
              </button>
            </div>
            <label className="grid gap-1 text-xs font-bold text-white/45">
              Area
              <select
                className="h-10 rounded-[8px] border border-white/10 bg-[#0B0C10] px-3 text-sm font-black text-white outline-none"
                value={filters.area}
                onChange={(event) => onFilterChange.area(event.target.value)}
              >
                <option value="all">All areas</option>
                {filterOptions.areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1 text-xs font-bold text-white/45">
                Budget
                <select
                  className="h-10 rounded-[8px] border border-white/10 bg-[#0B0C10] px-3 text-sm font-black text-white outline-none"
                  value={filters.budget}
                  onChange={(event) => onFilterChange.budget(event.target.value as PriceRange | "all")}
                >
                  <option value="all">Any</option>
                  {filterOptions.budgets.map((budget) => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-bold text-white/45">
                Time
                <select
                  className="h-10 rounded-[8px] border border-white/10 bg-[#0B0C10] px-3 text-sm font-black capitalize text-white outline-none"
                  value={filters.time}
                  onChange={(event) => onFilterChange.time(event.target.value as TimeOfDay | "all")}
                >
                  <option value="all">Any</option>
                  {filterOptions.times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1 text-xs font-bold text-white/45">
                Crowd
                <select
                  className="h-10 rounded-[8px] border border-white/10 bg-[#0B0C10] px-3 text-sm font-black capitalize text-white outline-none"
                  value={filters.crowd}
                  onChange={(event) => onFilterChange.crowd(event.target.value as CrowdLevel | "all")}
                >
                  <option value="all">Any</option>
                  {filterOptions.crowds.map((crowd) => (
                    <option key={crowd} value={crowd}>{crowd}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/70">
                <input
                  checked={filters.trafficFriendlyOnly}
                  className="size-4 accent-[#39FF14]"
                  onChange={(event) => onFilterChange.trafficFriendlyOnly(event.target.checked)}
                  type="checkbox"
                />
                Traffic friendly
              </label>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:content-start">
            {filteredActivities.length === 0 && (
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/55">
                No matches yet. Clear filters or try another category.
              </div>
            )}
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
                <button
                  className="h-10 rounded-[8px] bg-[#39FF14] px-3 text-xs font-black uppercase tracking-[0.12em] text-black shadow-[0_0_18px_rgba(57,255,20,0.24)] transition active:scale-[0.96]"
                  onClick={() => onAddActivity(activity)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
