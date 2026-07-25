"use client";
import { use } from "react";
import { Room } from "@/lib/api";
import { mapLinks } from "@/lib/maps";
import { ChoiceChips } from "@/components/ChoiceChips";
import { FullPageState } from "@/components/FullPageState";
import { ProductHeader } from "@/components/layout/ProductHeader";
import { useRoom } from "@/hooks/useRoom";
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
  const flow = useRoom(code);
  const room = flow.room;
  if (flow.error && !room) return <FullPageState icon="⏳" title={flow.error} />;
  if (!room) return <FullPageState icon="🍽️" title="모임방 불러오는 중…" />;
  if (room.status === "EXPIRED") return <FullPageState icon="🌙" title="이 모임방은 만료됐어요" />;
  if (room.status === "DECIDED" && room.decidedMenu) {
    const l = mapLinks(room.decidedMenu.name, room.placeName);
    return (
      <main className="flow">
        <ProductHeader backHref="/" />
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
          {flow.restaurants?.restaurants.length ? (
            <section className="restaurants">
              <p className="progress">MOEAT PICKS</p>
              <h2>{flow.restaurants.title}</h2>
              <p className="muted">{flow.restaurants.description}</p>
              <div className="restaurantList">
                {flow.restaurants.restaurants.map((restaurant) => (
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
      <ProductHeader backHref="/" />
      <section className="flowBody">
        <p className="progress">취향 모으는 중</p>
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
            {!flow.joined ? (
              <div className="joinBox">
                <h2>이름을 알려주세요</h2>
                <p>가입 없이 바로 참여할 수 있어요.</p>
                <input
                  maxLength={20}
                  placeholder="닉네임"
                  value={flow.name}
                  onChange={(event) => flow.setName(event.target.value)}
                />
                <button
                  className="primary wide"
                  disabled={!flow.name.trim() || flow.busy}
                  onClick={flow.join}
                >
                  참여하기
                </button>
              </div>
            ) : (
              <div className="preference">
                <h2>어떤 종류가 당기나요?</h2>
                <p className="muted">음식 종류를 골라주세요. 여러 개 선택해도 좋아요.</p>
                <ChoiceChips items={likes} values={flow.likes} onChange={flow.changeLikes} />
                <h2>이건 먹기 어려워요</h2>
                <div className="notice">🛡️ 선택한 음식은 후보에서 제외돼요.</div>
                <ChoiceChips items={exs} values={flow.exclusions} onChange={flow.setExclusions} />
                <button
                  className="primary wide"
                  disabled={flow.busy}
                  onClick={flow.savePreferences}
                >
                  취향 저장하기
                </button>
              </div>
            )}
            <Roster room={room} />
            {flow.host && (
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
                    flow.busy ||
                    room.participants.length === 0 ||
                    room.participants.some((p) => !p.ready)
                  }
                  onClick={flow.pickMenu}
                >
                  모두 준비됐어요, 메뉴 뽑기
                </button>
              </>
            )}
          </>
        )}
        {flow.error && <p className="error">{flow.error}</p>}
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
