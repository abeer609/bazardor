"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-5xl" aria-hidden>
        🧺
      </p>
      <h2 className="mt-4 text-xl font-bold">দাম লোড করা যায়নি</h2>
      <p className="mt-1 text-muted">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
