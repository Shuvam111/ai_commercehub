import Link from "next/link";
import { ArrowRight, ArrowUpRight, Box, Headphones, MapPin, Sparkles, Truck } from "lucide-react";
import { ProductGrid } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { NewsletterForm } from "@/components/newsletter-form";
import { StoreImage } from "@/components/store-image";
import { categories, products, storefrontContent } from "@/lib/catalog";

export default function HomePage() {
  const featured = products.filter((product) => product.featured);
  const bestSellers = products.filter((product) => product.bestSeller);
  const newArrivals = products.filter((product) => product.newArrival);

  return <>
    <section className="hero-section"><div className="hero-copy"><span className="eyebrow">THE EVERYDAY EDIT <span className="eyebrow-dot">·</span> VOL. 04</span><h1>A little more joy in <em>the everyday.</em></h1><p>Find well-made pieces for home, style and wherever the day takes you. Curated with care, close to home.</p><div className="hero-actions"><Link className="button button-dark" href="/shop">Shop the collection <ArrowRight aria-hidden="true" /></Link><Link className="underlined-link" href="/about">A little about us <span aria-hidden="true">↗</span></Link></div><div className="hero-note"><span className="avatar-stack"><i>J</i><i>L</i><i>+</i></span><span>Loved by 2,400+ everyday explorers</span></div></div><div className="hero-visual"><StoreImage src={storefrontContent.heroImage} alt="A sunlit wardrobe and thoughtfully styled everyday clothing" loading="eager" /><div className="hero-image-caption"><span>Small joys, made to stay.</span><span>01 — 04</span></div><div className="hero-stamp"><Sparkles aria-hidden="true" /><span>GOOD<br />THINGS</span></div></div><div className="hero-index">KATHMANDU <span>27° 42′ N</span></div></section>

    <section className="store-section category-section"><SectionHeading eyebrow="FIND YOUR KIND OF GOOD" title="A little something for every day." description="A few corners of the shop to start exploring." href="/categories" /><div className="category-grid">{categories.slice(0, 4).map((category, index) => <Link className={`category-card category-card-${index + 1}`} href={`/categories/${category.slug}`} key={category.id}><StoreImage src={category.image} alt="" /><span className="category-overlay" /><span className="category-copy"><small>{String(index + 1).padStart(2, "0")} / {category.productCount} finds</small><strong>{category.name}</strong><span>Explore <ArrowUpRight aria-hidden="true" /></span></span></Link>)}</div></section>

    <section className="store-section featured-section"><SectionHeading eyebrow="A GOOD PLACE TO BEGIN" title="A few things we love." description="Thoughtful pieces, chosen to make the everyday feel a little nicer." href="/shop" /><ProductGrid products={featured.slice(0, 4)} /></section>

    <section className="promo-banner"><div className="promo-image"><StoreImage src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1400&q=85" alt="Calm, warm-toned homewares arranged in a sunlit room" /><span className="promo-image-note">Made for the everyday, in Nepal</span></div><div className="promo-copy"><span className="eyebrow">A BETTER KIND OF EVERYDAY</span><h2>Make room for<br /><em>the good stuff.</em></h2><p>Useful objects, honest materials and small joys worth keeping around. A little less rush, a little more room to enjoy the things you bring home.</p><Link className="underlined-link" href="/about">The story behind the shop <span aria-hidden="true">↗</span></Link><span className="promo-number">02<span> / 04</span></span></div></section>

    <section className="store-section best-sellers-section"><SectionHeading eyebrow="THE COMMUNITY FAVOURITES" title="The ones you keep coming back to." description="A few well-loved pieces, picked by you." href="/shop" /><ProductGrid products={bestSellers.slice(0, 4)} /></section>

    <section className="arrival-strip"><div><span className="eyebrow">JUST FOUND THEIR WAY IN</span><h2>New things, same good feeling.</h2><p>Fresh finds to make home a little cozier and everyday plans a little better.</p><Link className="button button-outline" href="/shop">See what&apos;s new <ArrowRight aria-hidden="true" /></Link></div><ProductGrid products={newArrivals.slice(0, 2)} className="arrival-products" /></section>

    <section className="offer-callout"><div className="offer-copy"><span className="eyebrow">A LITTLE THANK-YOU</span><h2>Your next everyday favourite, <em>10% off.</em></h2><p>Take a little something off your first order. Consider it a warm welcome.</p><Link className="button button-light" href="/offers">Find your offer <ArrowRight aria-hidden="true" /></Link></div><div className="offer-code"><span>USE CODE</span><strong>EVERYDAY10</strong><small>At your first order</small></div></section>

    <section className="benefit-row" aria-label="Shopping benefits"><div className="benefit-item"><span><Truck aria-hidden="true" /></span><div><strong>Thoughtful delivery</strong><p>Free over NPR 5,000 in Kathmandu Valley.</p></div></div><div className="benefit-item"><span><Box aria-hidden="true" /></span><div><strong>Made to be kept</strong><p>Carefully chosen quality over passing trends.</p></div></div><div className="benefit-item"><span><Headphones aria-hidden="true" /></span><div><strong>A real person, always</strong><p>Friendly help, from our team in Kathmandu.</p></div></div><div className="benefit-item"><span><MapPin aria-hidden="true" /></span><div><strong>Rooted in Nepal</strong><p>Local finds, makers and good neighbours.</p></div></div></section>

    <section className="home-newsletter"><div><span className="eyebrow">NOTES FROM OUR LITTLE CORNER</span><h2>Good things are better shared.</h2><p>New arrivals, considered picks and a note when something special comes along.</p></div><NewsletterForm /></section>
  </>;
}
