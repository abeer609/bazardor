// Server-side data helpers. Override with API_BASE in .env.local if needed.
const BASE =
  process.env.API_BASE ?? "https://api.api-store.workers.dev/api/bazardor";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: Market[];
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
  return res.json();
}

// The API may return a bare array or wrap it ({ products: [...] } / { data: [...] }).

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  const products = await get(`/products${qs}`);
  return products;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await get("/categories");
    return categories;
  } catch {
    return []; // Navbar won't crash if the request fails
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
