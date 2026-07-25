import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";
export default function Home() {
  return (
    <main className="landing">
      <nav className="nav">
        <SiteLogo />
        <Link href="/choose" className="navCta">
          바로 시작하기
        </Link>
      </nav>
      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">메뉴부터 맛집까지 · 30초</span>
          <h1>
            뭐 먹을지 고민될 땐,
            <br />
            <em>모잇이 골라드려요.</em>
          </h1>
          <p>
            지금 당기는 느낌만 고르세요. 메뉴부터 약속 장소 주변 맛집까지
            <br />
            빠르게 추천해드려요. 가입도 앱 설치도 필요 없어요.
          </p>
          <div className="heroActions">
            <Link className="primary heroButton" href="/solo">
              혼자 메뉴 고르기 <span>→</span>
            </Link>
            <Link className="heroSubButton" href="/rooms/new">
              같이 맛집 고르기
            </Link>
          </div>
          <div className="heroProof">
            <span>
              <b>30초</b> 안에 추천
            </span>
            <span>
              <b>50+</b> 메뉴 데이터
            </span>
            <span>
              <b>0</b> 회원가입
            </span>
          </div>
        </div>
        <ProductDemo />
      </section>
      <section className="homeFeatures">
        <div className="featureIntro">
          <p className="sectionTag">WHY MOEAT</p>
          <h2>
            결정에 필요한 것만
            <br />
            가볍게 모았어요
          </h2>
          <p>끝없는 맛집 목록 대신 지금 상황에 맞는 선택지를 빠르게 좁혀드려요.</p>
        </div>
        <div className="featureBento">
          <article className="bentoCard soloBento">
            <span>혼자 먹을 때</span>
            <h3>
              기분만 고르면
              <br />
              메뉴 세 개로 딱.
            </h3>
            <div className="bentoChips">
              <i>든든하게</i>
              <i>깔끔하게</i>
              <i>1만 원대</i>
            </div>
            <div className="bentoMenu">
              <small>PICK 01</small>
              <strong>쌀국수</strong>
              <b>조건 일치 94%</b>
            </div>
          </article>
          <article className="bentoCard groupBento">
            <span>같이 먹을 때</span>
            <h3>
              링크 하나로
              <br />
              모두의 취향 수집.
            </h3>
            <div className="bentoPeople">
              <i>민지</i>
              <i>준호</i>
              <i>유나</i>
              <i>나</i>
            </div>
            <div className="bentoProgress">
              <span />
              <b>4명 모두 입력 완료</b>
            </div>
          </article>
          <article className="bentoCard placeBento">
            <div>
              <span>메뉴를 정한 다음</span>
              <h3>
                주변 맛집까지
                <br />
                바로 이어서.
              </h3>
              <p>상호, 주소, 전화번호와 지도 링크를 한 번에 확인하세요.</p>
            </div>
            <div className="placePreview">
              <small>성수역 · 비빔밥</small>
              <strong>주변 맛집 5곳을 찾았어요</strong>
              <i>1</i>
              <p>
                <b>담미온 성수점</b>
                <span>서울 성동구 연무장길</span>
              </p>
              <i>2</i>
              <p>
                <b>소문난 한식당</b>
                <span>서울 성동구 아차산로</span>
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="steps">
        <p className="sectionTag">HOW IT WORKS</p>
        <h2>
          고민은 짧게,
          <br />
          맛있는 시간은 길게
        </h2>
        <div className="stepGrid">
          <Step n="01" title="상황을 골라요" text="혼자인지 여럿인지 먼저 선택해요" />
          <Step n="02" title="취향을 모아요" text="먹고 싶은 것과 못 먹는 것을 알려주세요" />
          <Step n="03" title="메뉴를 만나요" text="모두에게 잘 맞는 세 가지를 추천해요" />
        </div>
      </section>
      <section className="banner">
        <div>
          <span>같이 먹는다면</span>
          <h2>
            “아무거나” 대신
            <br />
            링크 하나 보내세요
          </h2>
          <p>각자 취향을 고르면 공통 메뉴를 찾아드려요.</p>
        </div>
        <div className="chat">
          <b>오늘 뭐 먹지?</b>
          <i>모잇 링크가 도착했어요 🔗</i>
          <strong>취향 입력 완료!</strong>
        </div>
      </section>
      <footer>
        <SiteLogo />
        <p>혼자도 같이도, 오늘 뭐 먹을지 모잇.</p>
      </footer>
    </main>
  );
}
function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <article className={`step step${n}`}>
      <small>STEP {n}</small>
      <div className="stepPreview" aria-hidden="true">
        {n === "01" && (
          <>
            <i>혼자</i>
            <i>같이</i>
          </>
        )}
        {n === "02" && (
          <>
            <i className="checked">든든하게</i>
            <i>깔끔하게</i>
            <i className="blocked">매운 음식 제외</i>
          </>
        )}
        {n === "03" && (
          <>
            <span>
              <b>1</b>
              <strong>비빔밥</strong>
              <em>94%</em>
            </span>
            <span>
              <b>2</b>
              <strong>쌀국수</strong>
              <em>89%</em>
            </span>
          </>
        )}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
function ProductDemo() {
  return (
    <div className="productDemo">
      <div className="demoWindow">
        <div className="demoChrome">
          <span />
          <span />
          <span />
          <b>MOEAT PICK</b>
        </div>
        <div className="demoBody">
          <small>STEP 2 OF 3</small>
          <h2>오늘은 어떤 느낌인가요?</h2>
          <div className="demoChips">
            <span className="on">든든하게</span>
            <span>가볍게</span>
            <span className="on">깔끔하게</span>
            <span>자극적으로</span>
          </div>
          <div className="demoResult">
            <div className="demoRank">1</div>
            <div>
              <small>PICK 01</small>
              <strong>비빔밥</strong>
              <p>든든하고 깔끔한 한 끼에 잘 맞아요</p>
            </div>
            <i>→</i>
          </div>
        </div>
      </div>
      <div className="demoPlace">
        <span>주변 맛집</span>
        <strong>성수역 주변 비빔밥 맛집 5곳</strong>
        <small>메뉴를 정하면 갈 곳까지 이어드려요</small>
      </div>
    </div>
  );
}
