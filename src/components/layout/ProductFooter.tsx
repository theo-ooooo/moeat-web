import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

export function ProductFooter() {
  return (
    <footer className="productFooter">
      <SiteLogo />
      <nav aria-label="하단 메뉴">
        <Link href="/">홈</Link>
        <Link href="/solo">혼자 고르기</Link>
        <Link href="/rooms/new">모임 만들기</Link>
      </nav>
    </footer>
  );
}
