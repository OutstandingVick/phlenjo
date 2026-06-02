"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardScreen } from "../components/DashboardScreen";
import { PhlenjoFrame } from "../components/PhlenjoFrame";
import { activities } from "../data/phlenjo";
import type { Activity, CrowdLevel, PriceRange, TimeOfDay } from "../data/phlenjo";
import { usePhlenjoState } from "../hooks/usePhlenjoState";

export default function DashboardPage() {
  const router = useRouter();
  const [activeArea, setActiveArea] = useState("all");
  const [activeBudget, setActiveBudget] = useState<PriceRange | "all">("all");
  const [activeTime, setActiveTime] = useState<TimeOfDay | "all">("all");
  const [activeCrowd, setActiveCrowd] = useState<CrowdLevel | "all">("all");
  const [trafficFriendlyOnly, setTrafficFriendlyOnly] = useState(false);
  const {
    activeTab,
    advanceCard,
    currentActivity,
    filteredActivities,
    resetTrip,
    saveActivity,
    saveCurrentActivity,
    saved,
    setActiveTab,
  } = usePhlenjoState();

  const filterOptions = useMemo(
    () => ({
      areas: Array.from(new Set(activities.map((activity) => activity.area))).sort(),
      budgets: Array.from(new Set(activities.map((activity) => activity.priceRange))).sort(),
      times: Array.from(new Set(activities.map((activity) => activity.timeOfDay))),
      crowds: Array.from(new Set(activities.map((activity) => activity.crowdLevel))),
    }),
    [],
  );

  const exploreActivities = useMemo(() => {
    return filteredActivities.filter((activity) => {
      const areaMatches = activeArea === "all" || activity.area === activeArea;
      const budgetMatches = activeBudget === "all" || activity.priceRange === activeBudget;
      const timeMatches = activeTime === "all" || activity.timeOfDay === activeTime;
      const crowdMatches = activeCrowd === "all" || activity.crowdLevel === activeCrowd;
      const trafficMatches = !trafficFriendlyOnly || activity.traffic !== "red";

      return areaMatches && budgetMatches && timeMatches && crowdMatches && trafficMatches;
    });
  }, [activeArea, activeBudget, activeCrowd, activeTime, filteredActivities, trafficFriendlyOnly]);

  function clearFilters() {
    setActiveArea("all");
    setActiveBudget("all");
    setActiveTime("all");
    setActiveCrowd("all");
    setTrafficFriendlyOnly(false);
  }

  function moveCard(direction: "left" | "right") {
    if (direction === "right") {
      saveCurrentActivity();
    }

    advanceCard();
  }


  function addActivityToTrip(activity: Activity) {
    saveActivity(activity);
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
        filteredActivities={exploreActivities}
        filterOptions={filterOptions}
        filters={{
          area: activeArea,
          budget: activeBudget,
          crowd: activeCrowd,
          time: activeTime,
          trafficFriendlyOnly,
        }}
        onClearFilters={clearFilters}
        onAddActivity={addActivityToTrip}
        onFilterChange={{
          area: setActiveArea,
          budget: setActiveBudget,
          crowd: setActiveCrowd,
          time: setActiveTime,
          trafficFriendlyOnly: setTrafficFriendlyOnly,
        }}
        onMove={moveCard}
        onTab={setActiveTab}
        onTrip={() => router.push("/trip")}
        savedCount={saved.length}
        onReset={handleReset}
      />
    </PhlenjoFrame>
  );
}
