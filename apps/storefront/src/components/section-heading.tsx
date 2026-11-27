import Link from "next/link";

export function SectionHeading({ eyebrow, title, description, href, linkLabel = "View all" }: { eyebrow?: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return <div className="store-section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{href && <Link className="text-link" href={href}>{linkLabel}<span aria-hidden="true">↗</span></Link>}</div>;
}
