// Bengali formatting helpers. Intl handles digits + grouping (১,৮৫০).
const nf = new Intl.NumberFormat("bn-BD");
const nf1 = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatNumber = (n: number) => nf.format(n);
export const formatPct = (n: number) => nf1.format(n ?? 0);

const UNITS: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};
export const unitLabel = (u: string) => UNITS[String(u).toLowerCase()] ?? u;
export const perUnit = (u: string) => `প্রতি ${unitLabel(u)}`;

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

// Colours follow the Figma: a price rise is red, a fall is green.
// Swap the `text`/`soft` values between UP and DOWN if you'd rather follow the brief's wording.
const UP = { arrow: "▲", text: "text-rise", soft: "bg-rise-soft" };
const DOWN = { arrow: "▼", text: "text-fall", soft: "bg-fall-soft" };
const FLAT = { arrow: "—", text: "text-muted", soft: "bg-stone-100" };

const nf2 = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export function changeMeta(change: { dir: string; pct: number }) {
  if (!change || !change.pct) return FLAT;
  if (change.dir === "up") return UP;
  if (change.dir === "down") return DOWN;
  return FLAT;
}
export const formatPrice = (n: number) =>
  Number.isInteger(n) ? nf.format(n) : nf2.format(n);

export const toNumber = (v: number | string): number =>
  typeof v === "number"
    ? v
    : Number(
        v
          .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d).toString())
          .replace(/,/g, ""),
      );
