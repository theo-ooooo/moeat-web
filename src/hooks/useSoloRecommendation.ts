"use client";

import { useEffect } from "react";
import { api, Menu, SoloRestaurantSearch } from "@/lib/api";
import { useSoloStore } from "@/stores/soloStore";

function initialMeal() {
  const hour = new Date().getHours();
  return hour < 10 ? "아침" : hour < 16 ? "점심" : hour < 21 ? "저녁" : "야식";
}

export function useSoloRecommendation() {
  const store = useSoloStore();
  const { initialize, appendSeenMenus, ...state } = store;
  useEffect(() => initialize(initialMeal()), [initialize]);

  async function recommend() {
    store.setLoading(true);
    store.setError("");
    try {
      const recommendedMenus = await api<Menu[]>("/recommendations/solo", {
        method: "POST",
        body: JSON.stringify({
          mealTime: state.meal,
          budget: state.budget,
          moods: state.moods,
          exclusions: state.exclusions,
          seenMenuIds: state.seenMenuIds,
        }),
      });
      const restaurantSearch = await api<SoloRestaurantSearch>("/restaurants/recommendations", {
        method: "POST",
        body: JSON.stringify({
          placeName: state.place,
          menuNames: recommendedMenus.map((menu) => menu.name),
        }),
      });
      store.setMenus(recommendedMenus);
      store.setRestaurants(restaurantSearch);
      appendSeenMenus(recommendedMenus.map((menu) => menu.id));
      store.setStep(4);
    } catch (cause) {
      store.setError(cause instanceof Error ? cause.message : "다시 시도해주세요");
    } finally {
      store.setLoading(false);
    }
  }

  return {
    ...state,
    recommend,
  };
}
