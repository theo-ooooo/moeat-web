"use client";

import Link from "next/link";
import { SiteLogo } from "./SiteLogo";

export function FlowHeader({ backHref }: { backHref?: string }) {
  return (
    <header>
      {backHref ? (
        <Link href={backHref} aria-label="이전 화면으로">
          ←
        </Link>
      ) : (
        <button type="button" aria-label="이전 화면으로" onClick={() => history.back()}>
          ←
        </button>
      )}
      <SiteLogo />
      <aside className="desktopRail" aria-hidden="true">
        <p>MAKE A CHOICE</p>
        <h2>
          메뉴 고민은 짧게,
          <br />
          맛있는 시간은 길게.
        </h2>
        <span>조건을 고르면 모잇이 가장 잘 맞는 선택지를 좁혀드려요.</span>
        <div className="railSteps">
          <i className="active" />
          <i />
          <i />
        </div>
      </aside>
    </header>
  );
}
