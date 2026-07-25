const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";
export type Menu = {
  id: string;
  name: string;
  category: string;
  description: string;
  reason?: string;
};
export type Room = {
  shareCode: string;
  title: string;
  mealTime: string;
  placeName: string;
  mealDate: string;
  budget: string;
  status: "COLLECTING" | "VOTING" | "DECIDED" | "EXPIRED";
  expiresAt: string;
  participants: { nickname: string; ready: boolean }[];
  candidates: { id: string; menu: Menu; votes: number }[];
  myVoteCandidateIds: string[];
  decidedMenu: Menu | null;
};
export type Restaurant = {
  rank: number;
  id: string;
  name: string;
  category: string;
  phone: string;
  address: string;
  roadAddress: string;
  kakaoMapUrl: string;
  longitude: number;
  latitude: number;
  recommendationReason: string;
};
export type RestaurantSearch = {
  title: string;
  description: string;
  query: string;
  placeSearchConfigured: boolean;
  restaurants: Restaurant[];
};
export type SoloRestaurantSearch = {
  title: string;
  description: string;
  placeSearchConfigured: boolean;
  restaurants: Array<{
    rank: number;
    id: string;
    name: string;
    matchedMenu: string;
    category: string;
    phone: string;
    address: string;
    roadAddress: string;
    kakaoMapUrl: string;
    recommendationReason: string;
  }>;
};
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 8000);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      signal: c.signal,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
    if (!res.ok) {
      const body = (await res
        .json()
        .catch(() => ({ code: "NETWORK_ERROR", message: "요청을 처리하지 못했어요" }))) as {
        code: string;
        message: string;
      };
      throw new ApiError(body.code, body.message);
    }
    if (res.status === 204 || res.headers.get("content-length") === "0") return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}
export const tokens = {
  host: (code: string) => localStorage.getItem(`moeat:host:${code}`),
  participant: (code: string) => localStorage.getItem(`moeat:participant:${code}`),
  saveHost: (code: string, t: string) => localStorage.setItem(`moeat:host:${code}`, t),
  saveParticipant: (code: string, t: string) =>
    localStorage.setItem(`moeat:participant:${code}`, t),
};
