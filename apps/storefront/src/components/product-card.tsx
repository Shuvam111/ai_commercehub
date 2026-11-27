"use client";

import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { formatNpr } from "@ai-commercehub/shared/utils";
import type { CatalogProduct } from "@ai-commercehub/shared/types";
import { useStore } from "@/components/storefront-shell";
import { StoreImage } from "@/components/store-image";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-card-image-wrap"><Link href={`/products/${product.slug}`} className="product-card-image-link" aria-label={`View ${product.name}`}><StoreImage className="product-card-image" src={product.image} alt={product.name} />{product.badge && <span className="product-badge">{product.badge}</span>}</Link><button className={saved ? "wishlist-button is-saved" : "wishlist-button"} type="button" onClick={() => toggleWishlist(product.id)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved}><Heart aria-hidden="true" /></button><button className="quick-add-button" type="button" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to bag`}><Plus aria-hidden="true" /></button></div>
      <div className="product-card-copy"><span className="product-card-category">{product.category}</span><Link href={`/products/${product.slug}`} className="product-card-title">{product.name}</Link><div className="product-card-rating"><Star aria-hidden="true" fill="currentColor" /><span>{product.rating.toFixed(1)}</span><span>({product.reviewCount})</span></div><div className="product-card-price"><strong>{formatNpr(product.price)}</strong>{product.originalPrice && <del>{formatNpr(product.originalPrice)}</del>}</div></div>
    </article>
  );
}

export function ProductGrid({ products, className = "" }: { products: CatalogProduct[]; className?: string }) {
  if (!products.length) return <p className="empty-products">Nothing here just yet. Try another category or search.</p>;
  return <div className={`product-grid ${className}`}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
