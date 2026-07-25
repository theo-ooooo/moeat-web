import type { Metadata } from "next";
import { ProductLayout } from "@/components/layout/ProductLayout";
import "@/styles/route-styles.css";

export const metadata: Metadata = {
  title: "메뉴 추천 | 모잇",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ProductLayout>{children}</ProductLayout>;
}
