import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">
      <div className="grid items-center gap-6 rounded-3xl border border-line bg-white p-6 sm:p-8 md:grid-cols-[1.3fr_1fr]">
        <div>
          {/* <BanglaDate className="inline-block rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand" /> */}
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* plain anchor: scrolls to #সব-পণ্য on the same page, no route change */}
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <img
          src="/bazar-hero.png"
          alt="hero image"
          className="mx-auto w-full max-w-65 md:max-w-xs md:justify-self-end"
        />
        {/* <HeroIllustration className="mx-auto w-full max-w-[260px] md:max-w-xs md:justify-self-end" /> */}
      </div>
    </section>
  );
}
