import Link from "next/link";

export function FullPageState({ icon, title }: { icon: string; title: string }) {
  return (
    <main className="state">
      <span aria-hidden>{icon}</span>
      <h1>{title}</h1>
      <Link href="/">홈으로 돌아가기</Link>
    </main>
  );
}
