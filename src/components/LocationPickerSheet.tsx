"use client";

import { useEffect, useState } from "react";

const locations = {
  서울: [
    "강남역",
    "성수역",
    "홍대입구역",
    "여의도역",
    "잠실역",
    "서울역",
    "종로3가역",
    "건대입구역",
    "신림역",
    "고속터미널역",
  ],
  경기: ["판교역", "수원역", "정자역", "광교중앙역", "야탑역", "부천역", "의정부역"],
  인천: ["부평역", "인천터미널역", "송도", "구월동"],
  부산: ["서면역", "해운대역", "광안리", "부산역"],
  대구: ["동성로", "반월당역", "동대구역"],
  대전: ["둔산동", "대전역", "유성온천역"],
  광주: ["상무지구", "충장로", "광주송정역"],
} as const;

type Region = keyof typeof locations;

export function LocationPickerSheet({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<Region>("서울");
  const [draft, setDraft] = useState(value);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function show() {
    setDraft(value);
    setCustom("");
    setOpen(true);
  }

  function choose(place: string) {
    setDraft(`${region} · ${place}`);
    setCustom("");
  }

  function confirm() {
    const nextValue = custom.trim() || draft;
    if (!nextValue) return;
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <>
      <button type="button" className="locationField" onClick={show} aria-haspopup="dialog">
        <span>{value || "지역과 역을 선택해주세요"}</span>
        <i aria-hidden>장소</i>
      </button>
      {open && (
        <div className="sheetBackdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="locationSheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sheetHandle" />
            <header className="calendarHeader">
              <div>
                <small>약속 장소</small>
                <h2 id="location-title">어디에서 만날까요?</h2>
              </div>
              <button type="button" aria-label="장소 선택 닫기" onClick={() => setOpen(false)}>
                ×
              </button>
            </header>
            <div className="regionTabs" role="tablist" aria-label="지역 선택">
              {(Object.keys(locations) as Region[]).map((item) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={region === item}
                  className={region === item ? "selected" : ""}
                  key={item}
                  onClick={() => setRegion(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="placeGrid">
              {locations[region].map((place) => {
                const placeValue = `${region} · ${place}`;
                return (
                  <button
                    type="button"
                    className={draft === placeValue && !custom ? "selected" : ""}
                    aria-pressed={draft === placeValue && !custom}
                    key={place}
                    onClick={() => choose(place)}
                  >
                    {place}
                  </button>
                );
              })}
            </div>
            <label className="customPlace">
              찾는 장소가 없나요?
              <input
                maxLength={80}
                placeholder="역, 동네 또는 건물명을 입력하세요"
                value={custom}
                onChange={(event) => setCustom(event.target.value)}
              />
            </label>
            <div className="sheetActions">
              <button type="button" className="secondary" onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                type="button"
                className="primary"
                disabled={!draft && !custom.trim()}
                onClick={confirm}
              >
                이 장소로 선택
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
