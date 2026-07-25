import type { Metadata } from "next";
import "@fontsource/jua/400.css";
import "@fontsource/ibm-plex-sans-kr/700.css";
import "@fontsource/black-han-sans/400.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "모잇 | 오늘 뭐 먹을지 30초 만에",
    template: "%s",
  },
  description: "혼자도 같이도, 오늘 뭐 먹을지 모잇.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
