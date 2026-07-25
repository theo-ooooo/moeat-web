import Link from "next/link";
import { SiteLogo } from "@/components/SiteLogo";

export function ProductFooter() {
  return (
    <footer className="mx-auto flex min-h-[88px] w-[min(100%,1280px)] items-center gap-7 border-t border-[var(--line)] bg-white px-[34px] text-[13px] text-[var(--muted)] [&>span]:text-[22px] max-[700px]:block max-[700px]:px-6 max-[700px]:py-6">
      <SiteLogo />
      <nav
        className="ml-auto flex gap-[22px] max-[700px]:mt-[18px] max-[700px]:ml-0 max-[700px]:flex-wrap"
        aria-label="하단 메뉴"
      >
        <Link href="/">홈</Link>
        <Link href="/solo">혼자 고르기</Link>
        <Link href="/rooms/new">모임 만들기</Link>
      </nav>
    </footer>
  );
}
