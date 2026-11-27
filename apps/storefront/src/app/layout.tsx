import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StorefrontShell } from "@/components/storefront-shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "AI CommerceHub — Good things, gathered", template: "%s | AI CommerceHub" },
  description: "Thoughtfully chosen pieces for home, style and everyday living. Curated with care, close to home.",
  applicationName: "AI CommerceHub",
  keywords: ["Nepal shopping", "home and lifestyle", "thoughtful everyday finds"],
};
export const viewport: Viewport = { themeColor: "#f8f7f3", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body><StorefrontShell>{children}</StorefrontShell></body></html>;
}
