import type { Activity } from "../data/phlenjo";

type TripScreenProps = {
  activities: Activity[];
  onBack: () => void;
  onReset: () => void;
};

export function TripScreen({ activities, onBack, onReset }: TripScreenProps) {
  const trip = activities.length ? activities : activities.slice(0, 1);
  const slots = ["Morning", "Afternoon", "Night"];

  return (
    <section className="min-h-screen px-5 py-6 sm:px-8 lg:min-h-[calc(100vh-3rem)] lg:px-12 xl:px-16">
      <header className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="grid size-11 place-items-center rounded-[8px] bg-white/10 text-lg" onClick={onBack} aria-label="Back to dashboard">
            ←
          </button>
          <button className="h-11 rounded-[8px] bg-white/10 px-3 text-xs font-black uppercase tracking-[0.12em] text-white/65 transition hover:text-white" onClick={onReset}>
            Reset
          </button>
        </div>
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
