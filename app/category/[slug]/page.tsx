import CategoryProducts from "@/app/components/CategoryProducts";
import EmptyState from "@/app/components/EmptyState";
import { getCategories, getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [categories, all] = await Promise.all([
    getCategories(),
    getProducts(slug).catch(() => []),
  ]);
  // Guard in case the API ignores an unknown ?category= and returns everything.
  const products = all.filter((p) => p.category === slug);

  if (products.length === 0) return <EmptyState />;

  const category = categories.find((c) => c.slug === slug);
  const title = category?.nameBn ?? products[0].categoryNameBn;
  const icon = category?.icon ?? products[0].categoryIcon;

  return (
    <div className="mx-auto mt-6 max-w-6xl px-4">
      <header className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <span
          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-stone-100 text-3xl"
          aria-hidden
        >
          {icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-muted">
            {formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <CategoryProducts products={products} />
    </div>
  );
}
