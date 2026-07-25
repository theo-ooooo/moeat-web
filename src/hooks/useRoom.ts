"use client";

import { useCallback, useEffect } from "react";
import { api, RestaurantSearch, Room, tokens } from "@/lib/api";
import { useRoomStore } from "@/stores/roomStore";

export function useRoom(code: string) {
  const store = useRoomStore();
  const {
    room,
    error,
    name,
    likes,
    exclusions,
    restaurants,
    busy,
    initialize,
    setRoom,
    setError,
    setName,
    setLikes,
    setExclusions,
    setRestaurants,
    setBusy,
  } = store;
  const host = typeof window !== "undefined" && Boolean(tokens.host(code));
  const joined = typeof window !== "undefined" && Boolean(tokens.participant(code));

  useEffect(() => initialize(code), [code, initialize]);

  const load = useCallback(async () => {
    try {
      const participantToken = tokens.participant(code);
      const nextRoom = await api<Room>(`/rooms/${code}`, {
        headers: participantToken ? { "X-Participant-Token": participantToken } : undefined,
      });
      setRoom(nextRoom);
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "방 정보를 불러오지 못했어요");
    }
  }, [code, setError, setRoom]);

  useEffect(() => {
    const initialLoad = window.setTimeout(load, 0);
    const polling = window.setInterval(load, 4000);
    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(polling);
    };
  }, [load]);

  useEffect(() => {
    if (room?.status !== "DECIDED") return;
    let active = true;
    api<RestaurantSearch>(`/rooms/${code}/restaurants`)
      .then((result) => active && setRestaurants(result))
      .catch(() => active && setRestaurants(null));
    return () => {
      active = false;
    };
  }, [code, room?.status, setRestaurants]);

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "다시 시도해주세요");
    } finally {
      setBusy(false);
    }
  }

  function changeLikes(values: string[]) {
    const added = values.find((value) => !likes.includes(value));
    setLikes(added === "상관없음" ? ["상관없음"] : values.filter((value) => value !== "상관없음"));
  }

  async function join() {
    await run(async () => {
      const participant = await api<{ participantToken: string }>(`/rooms/${code}/participants`, {
        method: "POST",
        body: JSON.stringify({ nickname: name }),
      });
      tokens.saveParticipant(code, participant.participantToken);
    });
  }

  async function savePreferences() {
    await run(() =>
      api(`/rooms/${code}/participants/me/preferences`, {
        method: "PUT",
        headers: { "X-Participant-Token": tokens.participant(code) ?? "" },
        body: JSON.stringify({ likes, exclusions }),
      }),
    );
  }

  async function pickMenu() {
    await run(() =>
      api(`/rooms/${code}/candidates`, {
        method: "POST",
        headers: { "X-Host-Token": tokens.host(code) ?? "" },
      }),
    );
  }

  return {
    room,
    error,
    name,
    setName,
    likes,
    changeLikes,
    exclusions,
    setExclusions,
    restaurants,
    busy,
    host,
    joined,
    join,
    savePreferences,
    pickMenu,
  };
}
