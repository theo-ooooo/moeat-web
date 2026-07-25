import { ProductFooter } from "@/components/layout/ProductFooter";

export function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <ProductFooter />
    </div>
  );
}
