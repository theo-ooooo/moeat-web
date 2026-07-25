"use client";
import { ProductHeader } from "@/components/layout/ProductHeader";
import { DatePickerSheet } from "@/components/DatePickerSheet";
import { LocationPickerSheet } from "@/components/LocationPickerSheet";
import { FormChoiceField } from "@/components/FormChoiceField";
import { useNewRoomForm } from "@/hooks/useNewRoomForm";

const meals = ["아침", "점심", "저녁", "야식"];
const budgets = [
  ["UNDER_10000", "1만 원 이하"],
  ["FROM_10000_TO_20000", "1~2만 원"],
  ["OVER_20000", "2만 원 이상"],
  ["ANY", "상관없어요"],
];

export default function NewRoom() {
  const form = useNewRoomForm();
  return (
    <main className="flow flowWide">
      <ProductHeader backHref="/choose" />
      <form className="flowBody form" onSubmit={form.submit}>
        <p className="progress">모임 만들기</p>
        <h1>어떤 식사 약속인가요?</h1>
        <p className="muted">친구들이 알아보기 쉽게 적어주세요.</p>
        <label>
          약속 이름
          <input
            required
            maxLength={60}
            placeholder="예: 금요일 팀 점심"
            value={form.title}
            onChange={(event) => form.setTitle(event.target.value)}
          />
        </label>
        <div className="formGrid">
          <label>
            만날 장소
            <LocationPickerSheet value={form.place} onChange={form.setPlace} />
          </label>
          <label>
            날짜
            <DatePickerSheet value={form.mealDate} min={form.today} onChange={form.setMealDate} />
          </label>
        </div>
        <FormChoiceField
          id="meal-time-label"
          label="식사 시간"
          items={meals}
          value={form.meal}
          onChange={form.setMeal}
        />
        <FormChoiceField
          id="budget-label"
          label="한 사람 예산"
          items={budgets.map((item) => item[1])}
          value={budgets.find((item) => item[0] === form.budget)![1]}
          onChange={(value) => form.setBudget(budgets.find((item) => item[1] === value)![0])}
        />
        {form.error && <p className="error">{form.error}</p>}
        <button className="primary bottom" disabled={form.loading || !form.place.trim()}>
          {form.loading ? "방 만드는 중…" : "모임방 만들기"}
        </button>
      </form>
    </main>
  );
}
