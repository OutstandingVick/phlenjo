"use client";

import { useEffect, useMemo, useState } from "react";
import type { Activity, Category } from "../data/phlenjo";
import { activities, questions } from "../data/phlenjo";

const STORAGE_KEY = "phlenjo:v1";

export type PersistedPhlenjoState = {
  questionIndex: number;
  answers: string[];
  activeCard: number;
  savedTitles: string[];
  activeTab: Category;
};

const defaultState: PersistedPhlenjoState = {
  questionIndex: 0,
  answers: [],
  activeCard: 0,
  savedTitles: [activities[0].title],
  activeTab: "night",
};

function isCategory(value: unknown): value is Category {
  return value === "night" || value === "beach" || value === "chow" || value === "culture" || value === "secret";
}

function getActivitiesByTitle(titles: string[]) {
  const selected = titles
    .map((title) => activities.find((activity) => activity.title === title))
    .filter((activity): activity is Activity => Boolean(activity));

  return selected.length ? selected : [activities[0]];
}

function sanitizeState(rawState: Partial<PersistedPhlenjoState>): PersistedPhlenjoState {
  const answers = Array.isArray(rawState.answers)
    ? rawState.answers.filter((answer) => typeof answer === "string").slice(0, questions.length)
    : [];
  const savedTitles = Array.isArray(rawState.savedTitles)
    ? rawState.savedTitles.filter((title) => typeof title === "string")
    : defaultState.savedTitles;

  return {
    questionIndex:
      typeof rawState.questionIndex === "number"
        ? Math.min(Math.max(rawState.questionIndex, 0), questions.length - 1)
        : Math.min(answers.length, questions.length - 1),
    answers,
    activeCard: typeof rawState.activeCard === "number" ? Math.max(rawState.activeCard, 0) : 0,
    savedTitles: getActivitiesByTitle(savedTitles).map((activity) => activity.title),
    activeTab: isCategory(rawState.activeTab) ? rawState.activeTab : "night",
  };
}

function readState() {
  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) return defaultState;

    return sanitizeState(JSON.parse(rawState) as Partial<PersistedPhlenjoState>);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return defaultState;
  }
}

function writeState(state: PersistedPhlenjoState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function usePhlenjoState() {
  const [state, setState] = useState<PersistedPhlenjoState>(defaultState);
  const [hasLoadedSavedState, setHasLoadedSavedState] = useState(false);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      setState(readState());
      setHasLoadedSavedState(true);
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, []);

  function updateState(nextState: PersistedPhlenjoState | ((current: PersistedPhlenjoState) => PersistedPhlenjoState)) {
    setState((current) => {
      const resolved = typeof nextState === "function" ? nextState(current) : nextState;
      const sanitized = sanitizeState(resolved);
      writeState(sanitized);
      return sanitized;
    });
  }

  const currentActivity = activities[state.activeCard % activities.length];
  const saved = useMemo(() => getActivitiesByTitle(state.savedTitles), [state.savedTitles]);
  const filteredActivities = useMemo(() => {
    if (state.activeTab === "secret") return activities.slice(0, 2);
    return activities.filter((activity) => activity.category === state.activeTab);
  }, [state.activeTab]);
  const progress = ((state.questionIndex + 1) / questions.length) * 100;

  function answerQuestion(answer: string) {
    const isFinalQuestion = state.questionIndex === questions.length - 1;

    updateState((current) => ({
      ...current,
      answers: [...current.answers, answer],
      questionIndex: isFinalQuestion ? current.questionIndex : current.questionIndex + 1,
    }));

    return isFinalQuestion;
  }

  function saveCurrentActivity() {
    updateState((current) => {
      if (current.savedTitles.includes(currentActivity.title)) return current;
      return { ...current, savedTitles: [...current.savedTitles, currentActivity.title] };
    });
  }

  function advanceCard() {
    updateState((current) => ({ ...current, activeCard: current.activeCard + 1 }));
  }

  function setActiveTab(activeTab: Category) {
    updateState((current) => ({ ...current, activeTab }));
  }

  function resetTrip() {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  }

  return {
    ...state,
    currentActivity,
    filteredActivities,
    hasLoadedSavedState,
    progress,
    saved,
    answerQuestion,
    advanceCard,
    resetTrip,
    saveCurrentActivity,
    setActiveTab,
  };
}
