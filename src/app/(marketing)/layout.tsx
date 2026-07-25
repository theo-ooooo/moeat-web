import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import "@/styles/route-styles.css";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="landing">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </main>
  );
}
