"use client";

import type { PointerEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardScreen } from "../components/DashboardScreen";
import { PhlenjoFrame } from "../components/PhlenjoFrame";
import { usePhlenjoState } from "../hooks/usePhlenjoState";

export default function DashboardPage() {
  const router = useRouter();
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [throwClass, setThrowClass] = useState("");
  const {
    activeTab,
    advanceCard,
    currentActivity,
    filteredActivities,
    resetTrip,
    saveCurrentActivity,
    saved,
    setActiveTab,
  } = usePhlenjoState();

  function moveCard(direction: "left" | "right") {
    setThrowClass(direction === "right" ? "throw-right" : "throw-left");

    if (direction === "right") {
      saveCurrentActivity();
    }

    setTimeout(() => {
      advanceCard();
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

  function handleReset() {
    resetTrip();
    router.push("/");
  }

  return (
    <PhlenjoFrame>
      <DashboardScreen
        activeTab={activeTab}
        currentActivity={currentActivity}
        filteredActivities={filteredActivities}
        onDragStart={(x) => setDragStart(x)}
        onPointerUp={handlePointerUp}
        onMove={moveCard}
        onTab={setActiveTab}
        onTrip={() => router.push("/trip")}
        savedCount={saved.length}
        throwClass={throwClass}
        onReset={handleReset}
      />
    </PhlenjoFrame>
  );
}
