import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
// import { getProductBySlug } from "@/lib/api";
import {
  changeMeta,
  formatNumber,
  formatPct,
  formatPrice,
  perUnit,
  unitLabel,
} from "@/lib/format";
import { headers } from "next/headers";
import { getProductBySlug } from "@/lib/api";

// import { getSession } from "@/lib/session";

const avgOf = (m: { min: number; max: number }) => (m.min + m.max) / 2;

interface StatProps {
  label: string;
  value: number | null;
  tone: "text-fall" | "text-rise";
  note: string;
}

function Stat({ label, value, tone, note }: StatProps) {
  return (
    <div>
      <p>{label}</p>
      <p className={`text-2xl font-bold ${tone}`}>
        {value !== null ? formatNumber(value) : "—"}
      </p>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Props {
  label: string;
  value: number;
  tone: string;
  note: string;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  // Protected route: send visitors to sign in, then bring them back here.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect(
      `/signin?reason=protected&callbackURL=${encodeURIComponent(`/product/${slug}`)}`,
    );
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const {
    nameBn,
    image,
    unit,
    today,
    yesterday,
    change,
    category,
    categoryNameBn,
  } = product;
  const markets = product.markets ?? [];
  const m = changeMeta(change);

  const rows = [...markets].sort((a, b) => avgOf(a) - avgOf(b));
  const min = markets.length ? Math.min(...markets.map((x) => x.min)) : null;
  const max = markets.length ? Math.max(...markets.map((x) => x.max)) : null;
  const avg = markets.length
    ? Math.round(markets.reduce((sum, x) => sum + avgOf(x), 0) / markets.length)
    : null;

  const diff = Math.abs(today - yesterday);
  const trend =
    change?.dir === "up" ? "বেড়েছে" : change?.dir === "down" ? "কমেছে" : null;

  return (
    <div className="mx-auto mt-6 max-w-6xl px-4">
      <nav aria-label="breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand">
              হোম
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href={`/category/${category}`} className="hover:text-brand">
              {categoryNameBn}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="text-ink">
            {nameBn}
          </li>
        </ol>
      </nav>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-white p-5 sm:p-8">
        <div className="flex items-center gap-5">
          <span
            className="grid size-20 shrink-0 place-items-center rounded-2xl bg-stone-100 text-5xl"
            aria-hidden
          >
            {image}
          </span>
          <div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {nameBn}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {perUnit(unit)} · {categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              {trend ? (
                <>
                  গতকালের তুলনায় আজ দাম <strong>{trend}</strong> ·{" "}
                  {formatNumber(diff)} টাকা
                </>
              ) : (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে"
              )}
            </p>
          </div>
        </div>

        <div className="min-w-36 rounded-2xl bg-stone-100 px-6 py-4 text-center">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="mt-1 text-4xl font-bold leading-none">
            {formatNumber(today)}
          </p>
          <p className="mt-1 text-xs text-muted">টাকা / {unitLabel(unit)}</p>
          <p className={`mt-1.5 text-sm font-semibold ${m.text}`}>
            {m.arrow} {formatPct(change?.pct)}%
          </p>
        </div>
      </section>

      {markets.length > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Stat
              label="সর্বনিম্ন দাম"
              value={min}
              tone="text-fall"
              note="সবচেয়ে কম দামের বাজার"
            />
            <Stat
              label="সর্বাধিক দাম"
              value={max}
              tone="text-rise"
              note="সবচেয়ে বেশি দামের বাজার"
            />
            <Stat
              label="গড় দাম"
              value={avg}
              tone="text-fall"
              note={`${perUnit(unit)}-এর হিসাবে`}
            />
          </div>

          <h2 className="mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={`${r.market}-${r.division}`}
                    className="border-t border-line/80 even:bg-stone-50"
                  >
                    <td className="px-4 py-3">{r.market}</td>
                    <td className="px-4 py-3">{r.division}</td>
                    <td className="px-4 py-3 text-right">
                      {formatNumber(r.min)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatNumber(r.max)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right font-bold">
                      {formatPrice(avgOf(r))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
