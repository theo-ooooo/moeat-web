import { SiteLogo } from "@/components/SiteLogo";

export function MarketingFooter() {
  return (
    <footer className="flex min-h-[130px] items-center justify-between border-t border-[var(--line)] px-[max(32px,8vw)] text-[var(--muted)] max-[700px]:block max-[700px]:px-6 max-[700px]:py-9">
      <SiteLogo />
      <p>혼자도 같이도, 오늘 뭐 먹을지 모잇.</p>
    </footer>
  );
}
