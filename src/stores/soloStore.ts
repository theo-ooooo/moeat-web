import { create } from "zustand";
import { Menu, SoloRestaurantSearch } from "@/lib/api";

type SoloStore = {
  initialized: boolean;
  step: number;
  meal: string;
  budget: string;
  moods: string[];
  exclusions: string[];
  place: string;
  menus: Menu[];
  restaurants: SoloRestaurantSearch | null;
  seenMenuIds: string[];
  loading: boolean;
  error: string;
  initialize: (meal: string) => void;
  setStep: (step: number) => void;
  setMeal: (meal: string) => void;
  setBudget: (budget: string) => void;
  setMoods: (moods: string[]) => void;
  setExclusions: (exclusions: string[]) => void;
  setPlace: (place: string) => void;
  setMenus: (menus: Menu[]) => void;
  setRestaurants: (restaurants: SoloRestaurantSearch) => void;
  appendSeenMenus: (ids: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const useSoloStore = create<SoloStore>((set, get) => ({
  initialized: false,
  step: 0,
  meal: "점심",
  budget: "ANY",
  moods: [],
  exclusions: [],
  place: "",
  menus: [],
  restaurants: null,
  seenMenuIds: [],
  loading: false,
  error: "",
  initialize: (meal) => {
    if (!get().initialized) set({ initialized: true, meal });
  },
  setStep: (step) => set({ step }),
  setMeal: (meal) => set({ meal }),
  setBudget: (budget) => set({ budget }),
  setMoods: (moods) => set({ moods }),
  setExclusions: (exclusions) => set({ exclusions }),
  setPlace: (place) => set({ place }),
  setMenus: (menus) => set({ menus }),
  setRestaurants: (restaurants) => set({ restaurants }),
  appendSeenMenus: (ids) => set({ seenMenuIds: [...get().seenMenuIds, ...ids].slice(-30) }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
