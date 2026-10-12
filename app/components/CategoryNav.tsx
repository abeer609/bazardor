"use client";
import { Category } from "@/lib/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-line">
      <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-brand-soft font-semibold text-brand"
                    : "text-ink/80 hover:bg-stone-100"
                }`}
              >
                <span aria-hidden>{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
