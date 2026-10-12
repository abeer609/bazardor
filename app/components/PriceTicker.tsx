import { getProducts } from "@/lib/api";
import { changeMeta, formatNumber, formatPct, unitLabel } from "@/lib/format";

function TickerGroup({ products, hidden = false }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {products.map((p) => {
        const m = changeMeta(p.change);
        return (
          <li
            key={p.id}
            className="flex items-center gap-2 whitespace-nowrap border-r border-line px-5 py-2.5 text-sm"
          >
            <span aria-hidden>{p.image}</span>
            <span>{p.nameBn}</span>
            <span className="text-muted">
              {formatNumber(p.today)} টাকা/{unitLabel(p.unit)}
            </span>
            <span className={`font-semibold ${m.text}`}>
              {m.arrow} {formatPct(p.change?.pct)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function PriceTicker() {
  let products;
  try {
    products = await getProducts();
  } catch {
    return null; // the ticker is decorative; don't break the layout
  }
  if (!products.length) return null;

  return (
    <div
      className="marquee overflow-hidden border-y border-line bg-white"
      role="region"
      aria-label="আজকের দামের তালিকা"
    >
      <div
        className="marquee-track flex"
        style={{ animationDuration: `${products.length * 3}s` }}
      >
        <TickerGroup products={products} />
        <TickerGroup products={products} hidden />
      </div>
    </div>
  );
}
