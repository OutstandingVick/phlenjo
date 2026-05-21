"use client";

import { useRouter } from "next/navigation";
import { PhlenjoFrame } from "../components/PhlenjoFrame";
import { TripScreen } from "../components/TripScreen";
import { usePhlenjoState } from "../hooks/usePhlenjoState";

export default function TripPage() {
  const router = useRouter();
  const { resetTrip, saved } = usePhlenjoState();

  function handleReset() {
    resetTrip();
    router.push("/");
  }

  return (
    <PhlenjoFrame>
      <TripScreen activities={saved} onBack={() => router.push("/dashboard")} onReset={handleReset} />
    </PhlenjoFrame>
  );
}
