export function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-2xl border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-xl bg-stone-200" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-stone-200" />
          <div className="h-3 w-16 rounded bg-stone-100" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-14 rounded bg-stone-100" />
          <div className="h-6 w-24 rounded bg-stone-200" />
        </div>
        <div className="h-6 w-16 rounded-full bg-stone-100" />
      </div>
    </div>
  );
}

export function SectionsSkeleton() {
  return (
    <div
      className="mx-auto mt-10 flex max-w-6xl flex-col gap-10 px-4"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      {[6, 6, 9].map((count, i) => (
        <section key={i}>
          <div className="h-6 w-40 animate-pulse rounded bg-stone-200" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }, (_, j) => (
              <CardSkeleton key={j} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const bar = "animate-pulse rounded bg-stone-200";

export function CategorySkeleton() {
  return (
    <div
      className="mx-auto mt-6 max-w-6xl px-4"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-6">
        <div className={`size-14 rounded-2xl ${bar}`} />
        <div className="space-y-2">
          <div className={`h-7 w-32 ${bar}`} />
          <div className={`h-3 w-48 ${bar}`} />
        </div>
      </div>
      <div className="mt-5 h-16 rounded-2xl border border-line bg-white" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div
      className="mx-auto mt-6 max-w-6xl px-4"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      <div className={`h-4 w-56 ${bar}`} />
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-line bg-white p-8">
        <div className="flex items-center gap-5">
          <div className={`size-20 rounded-2xl ${bar}`} />
          <div className="space-y-3">
            <div className={`h-9 w-64 ${bar}`} />
            <div className={`h-3 w-40 ${bar}`} />
          </div>
        </div>
        <div className={`hidden h-28 w-36 rounded-2xl sm:block ${bar}`} />
      </div>
      <div className="mt-6 rounded-2xl border border-line bg-white p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-28 rounded-2xl ${bar}`} />
          ))}
        </div>
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`h-8 w-full ${bar}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// const bar = "animate-pulse rounded bg-stone-200";

export function ProfileSkeleton() {
  return (
    <div
      className="mx-auto mt-10 max-w-3xl px-4"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      {/* page heading */}
      <div className={`h-8 w-44 ${bar}`} />
      <div className={`mt-3 h-4 w-64 ${bar}`} />

      {/* avatar / name / sign out card */}
      <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className={`size-20 rounded-xl ${bar}`} />
          <div className="space-y-2.5">
            <div className={`h-6 w-40 ${bar}`} />
            <div className={`h-4 w-56 ${bar}`} />
          </div>
        </div>
        <div className={`h-10 w-28 rounded-lg ${bar}`} />
      </section>

      {/* info card: label, input, button */}
      <section className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className={`h-5 w-12 ${bar}`} />
        <div className={`mt-5 h-4 w-8 ${bar}`} />
        <div className={`mt-2 h-11 w-full rounded-lg ${bar}`} />
        <div className={`mt-4 h-11 w-full rounded-lg ${bar}`} />
      </section>
    </div>
  );
}
