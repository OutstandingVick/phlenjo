"use client";

import { useRouter } from "next/navigation";
import { PhlenjoFrame } from "./components/PhlenjoFrame";
import { WelcomeScreen } from "./components/WelcomeScreen";

export default function Home() {
  const router = useRouter();

  return (
    <PhlenjoFrame>
      <WelcomeScreen onStart={() => router.push("/onboarding")} />
    </PhlenjoFrame>
  );
}
