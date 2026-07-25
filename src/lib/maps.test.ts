import { describe, expect, it } from "vitest";
import { mapLinks } from "./maps";
describe("mapLinks", () => {
  it("메뉴와 장소를 안전하게 인코딩한다", () => {
    const x = mapLinks("김치 찌개", "성수역");
    expect(x.naver).toContain(encodeURIComponent("성수역 김치 찌개 맛집"));
    expect(x.kakao).toContain("map.kakao.com");
  });
});
