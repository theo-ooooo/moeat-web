"use client";

import { useRouter } from "next/navigation";
import { api, tokens } from "@/lib/api";
import { useNewRoomStore } from "@/stores/newRoomStore";

export function useNewRoomForm() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const store = useNewRoomStore();
  const { title, place, meal, budget, setLoading, setError } = store;
  const mealDate = store.mealDate || today;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const room = await api<{ shareCode: string; hostToken: string }>("/rooms", {
        method: "POST",
        body: JSON.stringify({ title, placeName: place, mealTime: meal, mealDate, budget }),
      });
      tokens.saveHost(room.shareCode, room.hostToken);
      router.push(`/rooms/${room.shareCode}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "방을 만들지 못했어요");
    } finally {
      setLoading(false);
    }
  }

  return {
    today,
    ...store,
    mealDate,
    submit,
  };
}
