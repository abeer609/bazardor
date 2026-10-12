import Link from "next/link";

export default function EmptyState({
  title = "কোনো পণ্য পাওয়া যায়নি",
  message = "এই ধরনে এখনো কোনো পণ্য নেই, অথবা ঠিকানাটি সঠিক নয়।",
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand">৪০৪</p>
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-1 text-muted">{message}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
