import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, Gift, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { products, storefrontContent } from "@/lib/catalog";

export const metadata: Metadata = { title: "Offers", description: "A little thank-you from AI CommerceHub, with offers on thoughtful everyday finds." };

export default function OffersPage() {
  const sale = products.filter((product) => product.originalPrice);
  return <div className="page-container offers-page"><section className="page-intro"><span className="eyebrow">A LITTLE THANK-YOU</span><h1>Good things, for a little less.</h1><p>Thoughtful picks and little perks, just for being here.</p></section><section className="offer-feature"><div className="offer-feature-icon"><Gift aria-hidden="true" /></div><div><span className="eyebrow">A WARM WELCOME</span><h2>10% off your first order.</h2><p>Find something you love, then take a little something off at checkout.</p><span className="offer-coupon"><span>USE CODE</span><strong>{storefrontContent.couponCode}</strong></span><small>Promotional sample only. Checkout is not available in this phase.</small></div><Link className="button button-dark" href="/shop">Browse the shop <span aria-hidden="true">→</span></Link><span className="offer-feature-spark"><Sparkles aria-hidden="true" /></span></section><div className="offers-title"><BadgePercent aria-hidden="true" /><div><span className="eyebrow">A FEW GOOD FINDS</span><h2>Little price drops, big everyday energy.</h2></div></div><ProductGrid products={sale} /></div>;
}
