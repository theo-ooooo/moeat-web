import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

export function MarketingHeader() {
  return (
    <header className="marketingHeader">
      <nav className="nav" aria-label="주요 메뉴">
        <SiteLogo />
        <Link href="/choose" className="navCta">
          바로 시작하기
        </Link>
      </nav>
    </header>
  );
}
