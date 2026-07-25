"use client";

import { useState } from "react";
import { api, Menu, SoloRestaurantSearch } from "@/lib/api";

function initialMeal() {
  const hour = new Date().getHours();
  return hour < 10 ? "아침" : hour < 16 ? "점심" : hour < 21 ? "저녁" : "야식";
}

export function useSoloRecommendation() {
  const [step, setStep] = useState(0);
  const [meal, setMeal] = useState(initialMeal);
  const [budget, setBudget] = useState("ANY");
  const [moods, setMoods] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [place, setPlace] = useState("");
  const [menus, setMenus] = useState<Menu[]>([]);
  const [restaurants, setRestaurants] = useState<SoloRestaurantSearch | null>(null);
  const [seenMenuIds, setSeenMenuIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function recommend() {
    setLoading(true);
    setError("");
    try {
      const recommendedMenus = await api<Menu[]>("/recommendations/solo", {
        method: "POST",
        body: JSON.stringify({ mealTime: meal, budget, moods, exclusions, seenMenuIds }),
      });
      const restaurantSearch = await api<SoloRestaurantSearch>("/restaurants/recommendations", {
        method: "POST",
        body: JSON.stringify({
          placeName: place,
          menuNames: recommendedMenus.map((menu) => menu.name),
        }),
      });
      setMenus(recommendedMenus);
      setRestaurants(restaurantSearch);
      setSeenMenuIds((current) =>
        [...current, ...recommendedMenus.map((menu) => menu.id)].slice(-30),
      );
      setStep(4);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "다시 시도해주세요");
    } finally {
      setLoading(false);
    }
  }

  return {
    step,
    setStep,
    meal,
    setMeal,
    budget,
    setBudget,
    moods,
    setMoods,
    exclusions,
    setExclusions,
    place,
    setPlace,
    menus,
    restaurants,
    loading,
    error,
    recommend,
  };
}
