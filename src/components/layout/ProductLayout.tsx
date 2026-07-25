import { ProductFooter } from "@/components/layout/ProductFooter";

export function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="productLayout">
      {children}
      <ProductFooter />
    </div>
  );
}
