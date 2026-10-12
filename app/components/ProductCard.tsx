import Link from "next/link";
import { changeMeta, formatNumber, formatPct, perUnit } from "@/lib/format";
import { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, nameBn, image, unit, today, change } = product;
  const m = changeMeta(change);

  return (
    <Link
      href={`/product/${slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-stone-100 text-2xl"
          aria-hidden
        >
          {image}
        </span>
        <div>
          <h3 className="font-semibold leading-snug">{nameBn}</h3>
          <p className="text-xs text-muted">{perUnit(unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl">
            <span className="font-bold">{formatNumber(today)}</span>{" "}
            <span className="text-base">টাকা</span>
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${m.soft} ${m.text}`}
        >
          {m.arrow} {formatPct(change?.pct)}%
        </span>
      </div>
    </Link>
  );
}
