export type Screen = "welcome" | "chat" | "dashboard" | "trip";
export type Category = "night" | "beach" | "chow" | "culture" | "secret";

export type Question = {
  prompt: string;
  options: string[];
};

export type Activity = {
  title: string;
  category: Category;
  time: string;
  location: string;
  crowd: string;
  imageClass: string;
  traffic: "green" | "yellow" | "red";
};

export type ExploreTab = {
  id: Category;
  label: string;
  icon: string;
  locked?: boolean;
};

export const questions: Question[] = [
  {
    prompt: "What's your Detty Level this holiday?",
    options: ["Soft Life Only", "Outside but Classy", "No Sleep till January"],
  },
  {
    prompt: "Pick your Lagos superpower.",
    options: ["Table Plug", "Beach Captain", "Food Map Genius"],
  },
  {
    prompt: "How far can your squad move?",
    options: ["Mainland Easy", "Island Premium", "Anywhere the vibe calls"],
  },
  {
    prompt: "Final truth: what's the budget mood?",
    options: ["Smart Spend", "Soft Life Flex", "Premium Detty"],
  },
];

export const activities: Activity[] = [
  {
    title: "Moist Beach Club",
    category: "beach",
    time: "Peak Vibe: 4:00 PM",
    location: "Oniru, Lagos",
    crowd: "142 IJGBs added this today",
    imageClass: "beach-card",
    traffic: "yellow",
  },
  {
    title: "Velvet Room",
    category: "night",
    time: "Peak Vibe: 11:30 PM",
    location: "Victoria Island",
    crowd: "96 squads saved this tonight",
    imageClass: "night-card",
    traffic: "red",
  },
  {
    title: "Pepper Row Chow Trail",
    category: "chow",
    time: "Peak Vibe: 7:15 PM",
    location: "Lekki Phase 1",
    crowd: "58 foodies are locked in",
    imageClass: "chow-card",
    traffic: "green",
  },
  {
    title: "Freedom Park After Dark",
    category: "culture",
    time: "Peak Vibe: 6:00 PM",
    location: "Lagos Island",
    crowd: "74 creatives added this",
    imageClass: "culture-card",
    traffic: "yellow",
  },
];

export const tabs: ExploreTab[] = [
  { id: "night", label: "Nightlife", icon: "🍾" },
  { id: "beach", label: "Beach", icon: "🌊" },
  { id: "chow", label: "Chow", icon: "🌶️" },
  { id: "culture", label: "Culture", icon: "🎭" },
  { id: "secret", label: "Secret Lagos", icon: "🔒", locked: true },
];
