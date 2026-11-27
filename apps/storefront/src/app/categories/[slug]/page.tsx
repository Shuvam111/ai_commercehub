import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-card";
import { categories, getCategory, products } from "@/lib/catalog";

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category?.name ?? "Category", description: category?.description };
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = products.filter((product) => product.categoryId === category.id);
  return <div className="page-container"><div className="breadcrumb"><a href="/categories">Categories</a><span>/</span><span>{category.name}</span></div><section className="page-intro"><span className="eyebrow">A LITTLE CORNER OF THE SHOP</span><h1>{category.name}.</h1><p>{category.description}</p></section><p className="category-result-count">{items.length} things to take a look at</p><ProductGrid products={items} /></div>;
}
