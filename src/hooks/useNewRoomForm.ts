"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, tokens } from "@/lib/api";

export function useNewRoomForm() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [meal, setMeal] = useState("저녁");
  const [mealDate, setMealDate] = useState(today);
  const [budget, setBudget] = useState("ANY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    title,
    setTitle,
    place,
    setPlace,
    meal,
    setMeal,
    mealDate,
    setMealDate,
    budget,
    setBudget,
    loading,
    error,
    submit,
  };
}
