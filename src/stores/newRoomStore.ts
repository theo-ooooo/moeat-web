import { create } from "zustand";

type NewRoomStore = {
  title: string;
  place: string;
  meal: string;
  mealDate: string;
  budget: string;
  loading: boolean;
  error: string;
  setTitle: (title: string) => void;
  setPlace: (place: string) => void;
  setMeal: (meal: string) => void;
  setMealDate: (mealDate: string) => void;
  setBudget: (budget: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const useNewRoomStore = create<NewRoomStore>((set) => ({
  title: "",
  place: "",
  meal: "저녁",
  mealDate: "",
  budget: "ANY",
  loading: false,
  error: "",
  setTitle: (title) => set({ title }),
  setPlace: (place) => set({ place }),
  setMeal: (meal) => set({ meal }),
  setMealDate: (mealDate) => set({ mealDate }),
  setBudget: (budget) => set({ budget }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
