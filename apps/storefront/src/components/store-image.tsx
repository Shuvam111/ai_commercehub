import Image from "next/image";

export function StoreImage({ src, alt, className, loading = "lazy" }: { src: string; alt: string; className?: string; loading?: "eager" | "lazy" }) {
  return <Image src={src} alt={alt} className={className} width={1600} height={1200} sizes="(max-width: 620px) 100vw, (max-width: 1100px) 60vw, 45vw" loading={loading} unoptimized />;
}
