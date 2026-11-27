import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/catalog";
import { StoreImage } from "@/components/store-image";

export const metadata: Metadata = { title: "Categories", description: "Find your kind of good among our considered categories." };

export default function CategoriesPage() {
  return <div className="page-container"><section className="page-intro"><span className="eyebrow">PICK A LITTLE CORNER</span><h1>Find your kind of good.</h1><p>Little corners of the shop, made for the things you love doing every day.</p></section><div className="category-page-grid">{categories.map((category, index) => <Link className="category-page-card" href={`/categories/${category.slug}`} key={category.id}><div><StoreImage src={category.image} alt="" /><span className="category-page-count">{String(index + 1).padStart(2, "0")} <i> / {category.productCount} finds</i></span></div><h2>{category.name}<span aria-hidden="true">↗</span></h2><p>{category.description}</p></Link>)}</div></div>;
}
