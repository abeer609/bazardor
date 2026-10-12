import { getProducts, Product } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import ProductCard from "./ProductCard";
// import ProductCard from "./ProductCard";

const GRID = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  arrow?: string;
  arrowClass?: string;
  products: Product[];
}

function Section({
  id,
  title,
  subtitle,
  arrow,
  arrowClass,
  products,
}: SectionProps) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        {arrow && (
          <span className={`text-sm ${arrowClass}`} aria-hidden>
            {arrow}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      <div className={`${GRID} mt-4`}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

const top6 = (
  products: Product[],
  dir: Exclude<"up" | "down" | "same", "flat">,
): Product[] =>
  products
    .filter((p) => p.change?.dir === dir && p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

export default async function ProductSections() {
  const products: Product[] = await getProducts();

  return (
    <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-10 px-4">
      <Section
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowClass="text-rise"
        products={top6(products, "up")}
      />
      <Section
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowClass="text-fall"
        products={top6(products, "down")}
      />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
