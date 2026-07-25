import { create } from "zustand";
import { RestaurantSearch, Room } from "@/lib/api";

type RoomStore = {
  code: string;
  room: Room | null;
  error: string;
  name: string;
  likes: string[];
  exclusions: string[];
  restaurants: RestaurantSearch | null;
  busy: boolean;
  initialize: (code: string) => void;
  setRoom: (room: Room) => void;
  setError: (error: string) => void;
  setName: (name: string) => void;
  setLikes: (likes: string[]) => void;
  setExclusions: (exclusions: string[]) => void;
  setRestaurants: (restaurants: RestaurantSearch | null) => void;
  setBusy: (busy: boolean) => void;
};

const initialState = {
  code: "",
  room: null,
  error: "",
  name: "",
  likes: [],
  exclusions: [],
  restaurants: null,
  busy: false,
};

export const useRoomStore = create<RoomStore>((set, get) => ({
  ...initialState,
  initialize: (code) => {
    if (get().code !== code) set({ ...initialState, code });
  },
  setRoom: (room) => set({ room }),
  setError: (error) => set({ error }),
  setName: (name) => set({ name }),
  setLikes: (likes) => set({ likes }),
  setExclusions: (exclusions) => set({ exclusions }),
  setRestaurants: (restaurants) => set({ restaurants }),
  setBusy: (busy) => set({ busy }),
}));
