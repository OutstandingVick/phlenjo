type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
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
