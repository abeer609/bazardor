import Link from "next/link";
import { Suspense } from "react";
// import BanglaDate from "./BanglaDate";
import CategoryNav from "./CategoryNav";
import { getCategories } from "@/lib/api";
import AuthButtons from "./AuthButtons.tsx";
import BanglaDate from "./BanglaDate";

async function Categories() {
  const categories = await getCategories();
  return <CategoryNav categories={categories} />;
}

export default function Navbar() {
  return (
    <header className="bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="grid size-11 place-items-center rounded-xl bg-brand text-xl"
            aria-hidden
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <BanglaDate className="block text-xs text-muted" />
          </span>
        </Link>
        <AuthButtons />
      </div>
      <Suspense
        fallback={<div className="h-11 border-t border-line">Loading...</div>}
      >
        <Categories />
      </Suspense>
    </header>
  );
}
