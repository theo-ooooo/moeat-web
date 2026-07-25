"use client";

import { ChoiceChips } from "@/components/ChoiceChips";
import { FlowHeader } from "@/components/FlowHeader";
import { LocationPickerSheet } from "@/components/LocationPickerSheet";
import { QuestionSection } from "@/components/QuestionSection";
import { SoloRestaurantResult } from "@/components/SoloRestaurantResult";
import { useSoloRecommendation } from "@/hooks/useSoloRecommendation";

const meals = ["아침", "점심", "저녁", "야식"];
const budgets = [
  ["UNDER_10000", "1만 원 이하"],
  ["FROM_10000_TO_20000", "1~2만 원"],
  ["OVER_20000", "2만 원 이상"],
  ["ANY", "상관없어요"],
];
const moods = ["든든하게", "가볍게", "깔끔하게", "자극적으로", "건강하게"];
const exclusions = ["매운음식", "날것", "해산물", "육류", "유제품", "밀가루"];

export default function SoloPage() {
  const flow = useSoloRecommendation();

  return (
    <main className="flow">
      <FlowHeader backHref={flow.step ? undefined : "/choose"} />
      <div className="flowBody">
        {flow.step < 4 && (
          <>
            <p className="progress">{flow.step + 1} / 4</p>
            {flow.step === 0 && (
              <QuestionSection
                title="언제 먹을 메뉴인가요?"
                description="지금 시간에 맞춰 골라두었어요."
              >
                <ChoiceChips
                  items={meals}
                  values={[flow.meal]}
                  onChange={(values) => flow.setMeal(values[0])}
                  max={1}
                />
                <h2 className="mt-9 mb-3 text-xl font-bold tracking-[-0.025em]">
                  예산은 어느 정도인가요?
                </h2>
                <ChoiceChips
                  items={budgets.map((item) => item[1])}
                  values={[budgets.find((item) => item[0] === flow.budget)![1]]}
                  onChange={(values) =>
                    flow.setBudget(budgets.find((item) => item[1] === values[0])![0])
                  }
                  max={1}
                />
              </QuestionSection>
            )}
            {flow.step === 1 && (
              <QuestionSection
                title="어떤 느낌이 당기나요?"
                description="최대 3개까지 골라도 좋아요."
              >
                <ChoiceChips items={moods} values={flow.moods} onChange={flow.setMoods} max={3} />
              </QuestionSection>
            )}
            {flow.step === 2 && (
              <QuestionSection
                title="못 먹는 건 빼드릴게요"
                description="선택한 조건은 취향보다 먼저 반영해요."
              >
                <div className="notice">🛡️ 제외 조건은 추천 후보에서 완전히 빼요.</div>
                <ChoiceChips
                  items={exclusions}
                  values={flow.exclusions}
                  onChange={flow.setExclusions}
                />
              </QuestionSection>
            )}
            {flow.step === 3 && (
              <QuestionSection
                title="어디에서 먹을까요?"
                description="선택한 지역의 음식점을 바로 찾아드려요."
              >
                <LocationPickerSheet value={flow.place} onChange={flow.setPlace} />
              </QuestionSection>
            )}
            <button
              className="primary bottom"
              onClick={() => (flow.step === 3 ? flow.recommend() : flow.setStep(flow.step + 1))}
              disabled={flow.loading || (flow.step === 3 && !flow.place)}
            >
              {flow.loading
                ? "주변 맛집 찾는 중…"
                : flow.step === 3
                  ? "이 지역 맛집 추천받기"
                  : "다음"}
            </button>
          </>
        )}
        {flow.step === 4 && flow.restaurants && (
          <SoloRestaurantResult
            search={flow.restaurants}
            menus={flow.menus}
            place={flow.place}
            onRetry={flow.recommend}
          />
        )}
        {flow.error && <p className="error">{flow.error}</p>}
      </div>
    </main>
  );
}
