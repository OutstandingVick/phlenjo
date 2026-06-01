export type Screen = "welcome" | "chat" | "dashboard" | "trip";
export type Category = "night" | "beach" | "chow" | "culture" | "secret";
export type PriceRange = "₦" | "₦₦" | "₦₦₦" | "₦₦₦₦";

export type Question = {
  prompt: string;
  options: string[];
};

export type Activity = {
  title: string;
  category: Category;
  time: string;
  location: string;
  area: string;
  bestDay: string;
  priceRange: PriceRange;
  vibe: string;
  crowd: string;
  dressCode: string;
  bookingNote: string;
  bestFor: string[];
  avoidIf: string[];
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
    area: "Oniru",
    bestDay: "Saturday",
    priceRange: "₦₦₦",
    vibe: "Beach bottles, sunset DJs, soft-life cabanas",
    crowd: "142 IJGBs added this today",
    dressCode: "Resort fits, slides, shades",
    bookingNote: "Reserve a cabana before noon",
    bestFor: ["Sunset", "Groups", "Content"],
    avoidIf: ["You hate sand", "Low-noise mood"],
    imageClass: "beach-card",
    traffic: "yellow",
  },
  {
    title: "Velvet Room",
    category: "night",
    time: "Peak Vibe: 11:30 PM",
    location: "Victoria Island",
    area: "VI",
    bestDay: "Friday",
    priceRange: "₦₦₦₦",
    vibe: "Dark lounge, premium tables, late-night Afrobeats",
    crowd: "96 squads saved this tonight",
    dressCode: "Sharp black, heels, no slippers",
    bookingNote: "Table minimums move fast after 10 PM",
    bestFor: ["Tables", "Afrobeats", "Late night"],
    avoidIf: ["Quiet night", "Budget is tight"],
    imageClass: "night-card",
    traffic: "red",
  },
  {
    title: "Pepper Row Chow Trail",
    category: "chow",
    time: "Peak Vibe: 7:15 PM",
    location: "Lekki Phase 1",
    area: "Lekki 1",
    bestDay: "Thursday",
    priceRange: "₦₦",
    vibe: "Spicy grills, street plates, quick squad crawl",
    crowd: "58 foodies are locked in",
    dressCode: "Casual, stain-safe fit",
    bookingNote: "Go hungry and split plates",
    bestFor: ["Food crawl", "Low-key", "Pre-game"],
    avoidIf: ["No pepper", "White outfit"],
    imageClass: "chow-card",
    traffic: "green",
  },
  {
    title: "Freedom Park After Dark",
    category: "culture",
    time: "Peak Vibe: 6:00 PM",
    location: "Lagos Island",
    area: "Lagos Island",
    bestDay: "Sunday",
    priceRange: "₦₦",
    vibe: "Live sets, art corners, old-Lagos night air",
    crowd: "74 creatives added this",
    dressCode: "Expressive casual, comfy shoes",
    bookingNote: "Arrive early for the best stage view",
    bestFor: ["Live music", "Culture", "Dates"],
    avoidIf: ["Club-only mood", "Late arrival"],
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
