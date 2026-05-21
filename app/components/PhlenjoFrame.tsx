type PhlenjoFrameProps = {
  children: React.ReactNode;
};

export function PhlenjoFrame({ children }: PhlenjoFrameProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#162016_0%,transparent_34%),radial-gradient(circle_at_bottom,#1a1230_0%,transparent_30%)] opacity-80" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col overflow-hidden bg-[#0B0C10]/95 shadow-2xl shadow-[#39FF14]/10 lg:my-6 lg:min-h-[calc(100vh-3rem)] lg:rounded-[8px] lg:border lg:border-white/10 xl:my-8 xl:min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </main>
  );
}
