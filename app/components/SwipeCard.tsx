"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import type { Activity } from "../data/phlenjo";

type SwipeDirection = "left" | "right";

type SwipeCardProps = {
  activity: Activity;
  onMove: (direction: SwipeDirection) => void;
};

const throwDistance = 720;
const swipeThreshold = 110;
const velocityThreshold = 560;

export function SwipeCard({ activity, onMove }: SwipeCardProps) {
  const [feedback, setFeedback] = useState<SwipeDirection | null>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);
  const addOpacity = useTransform(x, [32, 160], [0, 1]);
  const skipOpacity = useTransform(x, [-160, -32], [1, 0]);

  async function completeSwipe(direction: SwipeDirection) {
    setFeedback(direction);
    await animate(x, direction === "right" ? throwDistance : -throwDistance, {
      duration: 0.24,
      ease: "easeIn",
    });

    onMove(direction);
    x.set(0);
    setFeedback(null);
  }

  function settleCard() {
    animate(x, 0, { type: "spring", stiffness: 420, damping: 34 });
  }

  return (
    <motion.article
      className="swipe-card relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      style={{ x, rotate }}
      whileTap={{ scale: 0.985 }}
      onDragEnd={(_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > swipeThreshold || velocity > velocityThreshold) {
          void completeSwipe("right");
          return;
        }

        if (offset < -swipeThreshold || velocity < -velocityThreshold) {
          void completeSwipe("left");
          return;
        }

        settleCard();
      }}
    >
      <motion.div
        className="pointer-events-none absolute right-5 top-5 z-20 rounded-[8px] border border-[#39FF14] bg-[#39FF14]/15 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#39FF14] shadow-[0_0_28px_rgba(57,255,20,0.32)]"
        style={{ opacity: addOpacity }}
      >
        Add
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-5 top-5 z-20 rounded-[8px] border border-white/30 bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl"
        style={{ opacity: skipOpacity }}
      >
        Skip
      </motion.div>
      {feedback && (
        <motion.div
          className={`pointer-events-none absolute inset-0 z-30 grid place-items-center ${
            feedback === "right" ? "bg-[#39FF14]/18" : "bg-black/30"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span
            className={`grid size-24 place-items-center rounded-full text-4xl font-black shadow-2xl ${
              feedback === "right" ? "bg-[#39FF14] text-black shadow-[#39FF14]/40" : "bg-white/15 text-white shadow-black/50"
            }`}
          >
            {feedback === "right" ? "✓" : "×"}
          </span>
        </motion.div>
      )}

      <div className={`activity-art ${activity.imageClass}`}>
        <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-black text-[#39FF14] backdrop-blur">
          🔥 {activity.crowd}
        </div>
      </div>
      <div className="p-5 lg:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-3xl font-black tracking-normal sm:text-4xl">{activity.title}</h3>
            <p className="mt-2 text-sm font-bold text-[#39FF14]">🔥 {activity.time}</p>
            <p className="mt-1 text-sm text-white/65">📍 {activity.location}</p>
          </div>
          <span className="grid size-12 place-items-center rounded-full border border-white/10 bg-white/10 text-xl">✨</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="h-13 rounded-[8px] border border-white/10 bg-white/10 font-black text-white" onClick={() => void completeSwipe("left")}>
            ← Skip
          </button>
          <button className="h-13 rounded-[8px] bg-[#39FF14] font-black text-black shadow-[0_0_22px_rgba(57,255,20,0.35)]" onClick={() => void completeSwipe("right")}>
            Add →
          </button>
        </div>
      </div>
    </motion.article>
  );
}
