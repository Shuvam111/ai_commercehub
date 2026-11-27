import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product-card";
import { products, categories } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop all", description: "Explore considered pieces for home, style and everyday living." };

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; category?: string | string[] }> }) {
  const { q = "", category = "" } = await searchParams;
  const searchText = Array.isArray(q) ? q[0] ?? "" : q;
  const selectedCategory = Array.isArray(category) ? category[0] ?? "" : category;
  const query = searchText.trim().toLocaleLowerCase();
  const filtered = products.filter((product) => (!query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)) && (!selectedCategory || product.categoryId === selectedCategory));
  return <div className="page-container"><section className="page-intro"><span className="eyebrow">THE WHOLE GOOD THING</span><h1>Shop the collection.</h1><p>Well-made pieces for home, style and everyday life. Take your time, see what you like.</p></section><div className="shop-toolbar"><p><strong>{filtered.length}</strong> considered finds</p><div className="shop-filter-links"><Link href="/shop" className={!category ? "is-current" : ""}>All things</Link>{categories.map((item) => <Link key={item.id} href={`/shop?category=${item.id}`} className={category === item.id ? "is-current" : ""}>{item.name}</Link>)}</div></div><ProductGrid products={filtered} /></div>;
}
