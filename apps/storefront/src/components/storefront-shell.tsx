"use client";

import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";

const StoreContext = createContext<{
  cartCount: number;
  wishlist: string[];
  addToCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
} | null>(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StorefrontShell");
  return context;
}

function Header() {
  const { cartCount } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" }, { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" }, { href: "/offers", label: "Offers" },
    { href: "/about", label: "Our story" }, { href: "/contact", label: "Contact" },
  ];
  const openNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <>
      <div className="announcement-bar"><span>{"Thoughtfully chosen for everyday living — free Kathmandu Valley delivery over NPR 5,000"}</span><Link href="/offers">Explore this week&apos;s offers <span aria-hidden="true">↗</span></Link></div>
      <header className="store-header">
        <div className="store-header-inner">
          <button className="mobile-nav-trigger" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
          <Link className="store-brand" href="/" aria-label="AI CommerceHub home"><span className="store-brand-mark"><Sparkles aria-hidden="true" /></span><span><strong>AI Commerce<span>Hub</span></strong><small>GOOD THINGS, GATHERED</small></span></Link>
          <nav className={menuOpen ? "store-nav is-open" : "store-nav"} aria-label="Store navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          </nav>
          <div className="store-header-actions">
            <form className="store-search" action="/shop" role="search"><label className="sr-only" htmlFor="store-search">Search products</label><input id="store-search" name="q" type="search" placeholder="Search the store" /><button type="submit" aria-label="Search"><Search aria-hidden="true" /></button></form>
            <button className="store-icon-button account-action" type="button" aria-label="Customer account" onClick={() => openNotice("Customer accounts are planned for a future phase.")}><UserRound aria-hidden="true" /></button>
            <Link className="store-icon-button wishlist-action" href="/shop" aria-label="Browse your wishlist"><Heart aria-hidden="true" /></Link>
            <Link className="store-icon-button cart-action" href="/shop" aria-label="Shopping bag"><ShoppingBag aria-hidden="true" /><span className="cart-count" aria-label={`${cartCount} items`}>{cartCount}</span></Link>
          </div>
        </div>
      </header>
      {notice && <div className="store-toast" role="status">{notice}</div>}
    </>
  );
}

function Footer() {
  const [message, setMessage] = useState("");
  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Thanks for stopping by. Newsletter signup is a preview-only interaction.");
    event.currentTarget.reset();
  };

  return (
    <footer className="store-footer">
      <div className="footer-newsletter"><div><span className="eyebrow">A LITTLE NOTE FROM US</span><h2>Good things, in your inbox.</h2><p>New arrivals, considered picks and an occasional treat for your next order.</p></div><form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" autoComplete="email" placeholder="Your email address" required /><button type="submit">Sign me up <span aria-hidden="true">→</span></button>{message && <span className="newsletter-message" role="status">{message}</span>}</form></div>
      <div className="footer-main"><div className="footer-brand"><Link className="store-brand" href="/"><span className="store-brand-mark"><Sparkles aria-hidden="true" /></span><span><strong>AI Commerce<span>Hub</span></strong><small>GOOD THINGS, GATHERED</small></span></Link><p>Thoughtful everyday finds, gathered with care in Nepal.</p></div>
        <div className="footer-column"><strong>Explore</strong><Link href="/shop">Shop all</Link><Link href="/categories">Categories</Link><Link href="/offers">Offers</Link><Link href="/about">Our story</Link></div>
        <div className="footer-column"><strong>Here to help</strong><Link href="/contact">Contact us</Link><a href="mailto:hello@juniperandloom.example">Shipping & returns</a><a href="mailto:hello@juniperandloom.example">FAQs</a></div>
        <div className="footer-column"><strong>Come say hello</strong><span>Thamel, Kathmandu, Nepal</span><a href="tel:+97715550142">+977 1 555 0142</a><a href="mailto:hello@juniperandloom.example">hello@juniperandloom.example</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 AI CommerceHub. A storefront experience by Juniper & Loom.</span><span>Made for the everyday, in Nepal.</span></div>
    </footer>
  );
}

export function StorefrontShell({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(2);
  const [wishlist, setWishlist] = useState<string[]>([]);
  return <StoreContext.Provider value={{ cartCount, wishlist, addToCart: () => setCartCount((count) => count + 1), toggleWishlist: (productId) => setWishlist((items) => items.includes(productId) ? items.filter((item) => item !== productId) : [...items, productId]) }}><div className="store-app"><Header /><main>{children}</main><Footer /></div></StoreContext.Provider>;
}
