"use client";
import { use, useCallback, useEffect, useState } from "react";
import { api, RestaurantSearch, Room, tokens } from "@/lib/api";
import { mapLinks } from "@/lib/maps";
import { ChoiceChips } from "@/components/ChoiceChips";
import { FullPageState } from "@/components/FullPageState";
import { FlowHeader } from "@/components/FlowHeader";
const likes = [
    "한식",
    "일식",
    "중식",
    "아시안",
    "양식",
    "분식",
    "고기",
    "패스트푸드",
    "채식",
    "상관없음",
  ],
  exs = ["매운음식", "날것", "해산물", "육류", "유제품", "밀가루"];
export default function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [room, setRoom] = useState<Room | null>(null),
    [error, setError] = useState(""),
    [name, setName] = useState(""),
    [like, setLike] = useState<string[]>([]),
    [exclude, setExclude] = useState<string[]>([]),
    [restaurantSearch, setRestaurantSearch] = useState<RestaurantSearch | null>(null),
    [busy, setBusy] = useState(false);
  const host = typeof window !== "undefined" && !!tokens.host(code),
    joined = typeof window !== "undefined" && !!tokens.participant(code);
  const load = useCallback(async () => {
    try {
      const participantToken = tokens.participant(code);
      setRoom(
        await api<Room>(`/rooms/${code}`, {
          headers: participantToken ? { "X-Participant-Token": participantToken } : undefined,
        }),
      );
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "방 정보를 불러오지 못했어요");
    }
  }, [code]);
  useEffect(() => {
    const initial = window.setTimeout(load, 0);
    const t = setInterval(load, 4000);
    return () => {
      clearTimeout(initial);
      clearInterval(t);
    };
  }, [load]);
  useEffect(() => {
    if (room?.status !== "DECIDED") return;
    let active = true;
    api<RestaurantSearch>(`/rooms/${code}/restaurants`)
      .then((result) => {
        if (active) setRestaurantSearch(result);
      })
      .catch(() => {
        if (active) setRestaurantSearch(null);
      });
    return () => {
      active = false;
    };
  }, [code, room?.status]);
  async function act(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "다시 시도해주세요");
    } finally {
      setBusy(false);
    }
  }
  async function join() {
    await act(async () => {
      const x = await api<{ participantToken: string }>(`/rooms/${code}/participants`, {
        method: "POST",
        body: JSON.stringify({ nickname: name }),
      });
      tokens.saveParticipant(code, x.participantToken);
    });
  }
  async function prefer() {
    await act(() =>
      api(`/rooms/${code}/participants/me/preferences`, {
        method: "PUT",
        headers: { "X-Participant-Token": tokens.participant(code) ?? "" },
        body: JSON.stringify({ likes: like, exclusions: exclude }),
      }),
    );
  }
  async function generate() {
    await act(() =>
      api(`/rooms/${code}/candidates`, {
        method: "POST",
        headers: { "X-Host-Token": tokens.host(code) ?? "" },
      }),
    );
  }
  async function vote(id: string) {
    await act(() =>
      api(`/rooms/${code}/votes`, {
        method: "POST",
        headers: { "X-Participant-Token": tokens.participant(code) ?? "" },
        body: JSON.stringify({ candidateId: id }),
      }),
    );
  }
  async function unvote() {
    await act(() =>
      api(`/rooms/${code}/votes/me`, {
        method: "DELETE",
        headers: { "X-Participant-Token": tokens.participant(code) ?? "" },
      }),
    );
  }
  async function decide(id: string) {
    await act(() =>
      api(`/rooms/${code}/decision`, {
        method: "POST",
        headers: { "X-Host-Token": tokens.host(code) ?? "" },
        body: JSON.stringify({ candidateId: id }),
      }),
    );
  }
  if (error && !room) return <FullPageState icon="⏳" title={error} />;
  if (!room) return <FullPageState icon="🍽️" title="모임방 불러오는 중…" />;
  if (room.status === "EXPIRED") return <FullPageState icon="🌙" title="이 모임방은 만료됐어요" />;
  if (room.status === "DECIDED" && room.decidedMenu) {
    const l = mapLinks(room.decidedMenu.name, room.placeName);
    return (
      <main className="flow">
        <FlowHeader backHref="/" />
        <section className="flowBody decided">
          <p className="resultEmoji">🎊</p>
          <p className="progress">메뉴 결정 완료</p>
          <h1>
            오늘의 메뉴는
            <br />
            <em>{room.decidedMenu.name}</em>!
          </h1>
          <div className="decisionCard">
            <small>{room.decidedMenu.category}</small>
            <p>{room.decidedMenu.description}</p>
          </div>
          {restaurantSearch?.restaurants.length ? (
            <section className="restaurants">
              <p className="progress">MOEAT PICKS</p>
              <h2>{restaurantSearch.title}</h2>
              <p className="muted">{restaurantSearch.description}</p>
              <div className="restaurantList">
                {restaurantSearch.restaurants.map((restaurant) => (
                  <article className="restaurantCard" key={restaurant.id}>
                    <strong className="restaurantRank">{restaurant.rank}</strong>
                    <div>
                      <small>{restaurant.category.split(" > ").at(-1)}</small>
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.roadAddress || restaurant.address}</p>
                      <b>{restaurant.recommendationReason}</b>
                      {restaurant.phone && <span>{restaurant.phone}</span>}
                    </div>
                    <a href={restaurant.kakaoMapUrl} target="_blank" rel="noreferrer">
                      상세보기
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <a className="primary wide" href={l.naver} target="_blank">
            네이버지도에서 찾기
          </a>
          <a className="secondary wide" href={l.kakao} target="_blank">
            카카오맵에서 찾기
          </a>
          <button
            className="textLink"
            onClick={() =>
              navigator.share?.({
                title: room.title,
                text: `오늘 메뉴는 ${room.decidedMenu?.name}!`,
                url: location.href,
              })
            }
          >
            결과 공유하기
          </button>
        </section>
      </main>
    );
  }
  return (
    <main className="flow">
      <FlowHeader backHref="/" />
      <section className="flowBody">
        <p className="progress">
          {room.status === "COLLECTING" ? "취향 모으는 중" : "투표하는 중"}
        </p>
        <h1>{room.title}</h1>
        <p className="muted">
          {new Intl.DateTimeFormat("ko-KR", {
            month: "long",
            day: "numeric",
            weekday: "short",
          }).format(new Date(`${room.mealDate}T00:00:00`))}{" "}
          · {room.mealTime} · {room.placeName}
        </p>
        {room.status === "COLLECTING" && (
          <>
            {!joined ? (
              <div className="joinBox">
                <h2>이름을 알려주세요</h2>
                <p>가입 없이 바로 참여할 수 있어요.</p>
                <input
                  maxLength={20}
                  placeholder="닉네임"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="primary wide" disabled={!name.trim() || busy} onClick={join}>
                  참여하기
                </button>
              </div>
            ) : (
              <div className="preference">
                <h2>어떤 종류가 당기나요?</h2>
                <p className="muted">음식 종류를 골라주세요. 여러 개 선택해도 좋아요.</p>
                <ChoiceChips
                  items={likes}
                  values={like}
                  onChange={(values) => {
                    const added = values.find((value) => !like.includes(value));
                    setLike(
                      added === "상관없음"
                        ? ["상관없음"]
                        : values.filter((value) => value !== "상관없음"),
                    );
                  }}
                />
                <h2>이건 먹기 어려워요</h2>
                <div className="notice">🛡️ 선택한 음식은 후보에서 제외돼요.</div>
                <ChoiceChips items={exs} values={exclude} onChange={setExclude} />
                <button className="primary wide" disabled={busy} onClick={prefer}>
                  취향 저장하기
                </button>
              </div>
            )}
            <Roster room={room} />
            {host && (
              <>
                <button
                  className="secondary wide"
                  onClick={() => navigator.clipboard.writeText(location.href)}
                >
                  🔗 참여 링크 복사
                </button>
                <button
                  className="primary wide"
                  disabled={
                    busy ||
                    room.participants.length === 0 ||
                    room.participants.some((p) => !p.ready)
                  }
                  onClick={generate}
                >
                  모두 준비됐어요, 후보 보기
                </button>
              </>
            )}
          </>
        )}
        {room.status === "VOTING" && (
          <>
            <h2>마음에 드는 메뉴에 투표해요</h2>
            <div className="menuList">
              {room.candidates.map((c, i) => (
                <article className="voteCard" key={c.id}>
                  <span>{["🥘", "🍜", "🥗"][i]}</span>
                  <div>
                    <small>{c.menu.category}</small>
                    <h2>{c.menu.name}</h2>
                    <p>{c.menu.description}</p>
                    <b>{c.votes}표</b>
                  </div>
                  {joined &&
                    (room.myVoteCandidateIds.includes(c.id) ? (
                      <button className="voted" onClick={unvote} disabled={busy}>
                        내 투표 취소
                      </button>
                    ) : (
                      <button onClick={() => vote(c.id)} disabled={busy}>
                        투표
                      </button>
                    ))}
                  {host && (
                    <button className="pick" onClick={() => decide(c.id)} disabled={busy}>
                      확정
                    </button>
                  )}
                </article>
              ))}
            </div>
            {host && <p className="hint">방장은 투표 현황을 보고 최종 메뉴를 확정해주세요.</p>}
          </>
        )}
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
}
function Roster({ room }: { room: Room }) {
  return (
    <div className="roster">
      <h2>
        함께 고르는 사람 <span>{room.participants.length}</span>
      </h2>
      {room.participants.length === 0 ? (
        <p>아직 참여한 사람이 없어요.</p>
      ) : (
        room.participants.map((p) => (
          <p key={p.nickname}>
            <span>🙂 {p.nickname}</span>
            <b className={p.ready ? "ready" : ""}>{p.ready ? "입력 완료" : "입력 중"}</b>
          </p>
        ))
      )}
    </div>
  );
}
