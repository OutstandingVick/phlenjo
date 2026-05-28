"use client";

import { useRouter } from "next/navigation";
import { DashboardScreen } from "../components/DashboardScreen";
import { PhlenjoFrame } from "../components/PhlenjoFrame";
import { usePhlenjoState } from "../hooks/usePhlenjoState";

export default function DashboardPage() {
  const router = useRouter();
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
    if (direction === "right") {
      saveCurrentActivity();
    }

    advanceCard();
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
        onMove={moveCard}
        onTab={setActiveTab}
        onTrip={() => router.push("/trip")}
        savedCount={saved.length}
        onReset={handleReset}
      />
    </PhlenjoFrame>
  );
}
