import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

export function MarketingHeader() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex h-[84px] w-[min(1360px,calc(100%-72px))] items-center justify-between"
        aria-label="주요 메뉴"
      >
        <SiteLogo />
        <Link
          href="/choose"
          className="inline-flex min-h-12 items-center rounded-xl bg-[var(--brand)] px-5 text-sm font-bold text-white"
        >
          바로 시작하기
        </Link>
      </nav>
    </header>
  );
}
