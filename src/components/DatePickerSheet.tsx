"use client";

import { useEffect, useMemo, useState } from "react";

type DatePickerSheetProps = {
  value: string;
  min: string;
  onChange: (value: string) => void;
};

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(parseDate(value));
}

export function DatePickerSheet({ value, min, onChange }: DatePickerSheetProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selected = parseDate(value);
    return new Date(selected.getFullYear(), selected.getMonth(), 1);
  });

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    return [
      ...Array.from({ length: firstOffset }, () => null),
      ...Array.from({ length: count }, (_, index) => new Date(year, month, index + 1)),
    ];
  }, [visibleMonth]);

  function show() {
    setDraft(value);
    const selected = parseDate(value);
    setVisibleMonth(new Date(selected.getFullYear(), selected.getMonth(), 1));
    setOpen(true);
  }

  function moveMonth(amount: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }

  function confirm() {
    onChange(draft);
    setOpen(false);
  }

  return (
    <>
      <button type="button" className="dateField" onClick={show} aria-haspopup="dialog">
        <span>{dateLabel(value)}</span>
        <i aria-hidden>달력</i>
      </button>
      {open && (
        <div className="sheetBackdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="calendarSheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sheetHandle" />
            <header className="calendarHeader">
              <div>
                <small>약속 날짜</small>
                <h2 id="calendar-title">언제 만날까요?</h2>
              </div>
              <button type="button" aria-label="달력 닫기" onClick={() => setOpen(false)}>
                ×
              </button>
            </header>
            <div className="monthNav">
              <button type="button" aria-label="이전 달" onClick={() => moveMonth(-1)}>
                ‹
              </button>
              <strong>
                {visibleMonth.getFullYear()}년 {visibleMonth.getMonth() + 1}월
              </strong>
              <button type="button" aria-label="다음 달" onClick={() => moveMonth(1)}>
                ›
              </button>
            </div>
            <div className="weekGrid">
              {weekDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="dateGrid">
              {days.map((date, index) => {
                if (!date) return <span key={`empty-${index}`} />;
                const dateValue = toDateValue(date);
                const disabled = dateValue < min;
                const selected = dateValue === draft;
                const today = dateValue === min;
                return (
                  <button
                    type="button"
                    key={dateValue}
                    disabled={disabled}
                    className={selected ? "selected" : ""}
                    aria-pressed={selected}
                    onClick={() => setDraft(dateValue)}
                  >
                    {date.getDate()}
                    {today && <small>오늘</small>}
                  </button>
                );
              })}
            </div>
            <div className="sheetActions">
              <button type="button" className="secondary" onClick={() => setOpen(false)}>
                취소
              </button>
              <button type="button" className="primary" onClick={confirm}>
                {dateLabel(draft)} 선택
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
