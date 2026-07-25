import Link from "next/link";
import { FlowHeader } from "@/components/FlowHeader";
export default function Choose() {
  return (
    <main className="flow">
      <FlowHeader backHref="/" />
      <section className="flowBody">
        <p className="progress">STEP 1</p>
        <h1>
          오늘 메뉴,
          <br />
          어떻게 정할까요?
        </h1>
        <p className="muted">상황에 맞는 방법을 골라주세요.</p>
        <div className="choiceGrid">
          <Link href="/solo" className="bigChoice">
            <span className="choiceIcon">01</span>
            <div className="choiceVisual soloVisual" aria-hidden="true">
              <div className="miniQuestion">지금 당기는 느낌은?</div>
              <div className="miniChips">
                <i>든든하게</i>
                <i>깔끔하게</i>
                <i>가볍게</i>
              </div>
              <div className="miniPick">
                <b>비빔밥</b>
                <small>조건 일치 92%</small>
              </div>
            </div>
            <small>나를 위한 빠른 추천</small>
            <strong>혼자 바로 정할게요</strong>
            <i>→</i>
          </Link>
          <Link href="/rooms/new" className="bigChoice coral">
            <span className="choiceIcon">02</span>
            <div className="choiceVisual groupVisual" aria-hidden="true">
              <div className="miniPeople">
                <i>민</i>
                <i>준</i>
                <i>나</i>
                <b>+2</b>
              </div>
              <div className="miniStatus">
                <span>
                  <i /> 취향 입력 완료
                </span>
                <strong>4 / 5</strong>
              </div>
              <div className="miniVote">
                <span />
                <span />
                <span />
              </div>
            </div>
            <small>모두의 취향을 모아</small>
            <strong>여럿이 같이 정할게요</strong>
            <i>→</i>
          </Link>
        </div>
      </section>
    </main>
  );
}
