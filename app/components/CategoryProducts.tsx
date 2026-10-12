"use client";
import { useMemo, useState } from "react";
import { formatNumber, toNumber } from "@/lib/format";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/api";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  // Sorted by numeric value (toNumber also copes with Bengali-digit strings).
  const list = useMemo(() => {
    if (sort === "default") return products;
    const dir = sort === "asc" ? 1 : -1;
    return [...products].sort(
      (a, b) => (toNumber(a.today) - toNumber(b.today)) * dir,
    );
  }, [products, sort]);

  return (
    <>
      <div className="mt-5 flex items-center justify-end gap-3 rounded-2xl border border-line bg-white p-4">
        <label htmlFor="sort" className="text-sm text-muted">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-lg border border-line bg-white py-1.5 pl-3 pr-9 text-sm outline-none focus:border-brand"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-ink/70"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted">
        মোট {formatNumber(list.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
