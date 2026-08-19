import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { StructuredData } from "@../../../app/StructuredData";
import { ToastProvider } from "@/components/ui/Toast";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";
import "./globals.css";

/* Only the display face is preloaded. It renders the headline, which is the
   largest thing on screen and therefore what LCP is measured against; the
   other two arrive a moment later without anyone noticing. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-public-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  /* The deployed address wins, so a preview build does not advertise the
     production domain in its own metadata. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.meta.url),
  title: site.meta.title,
  description: site.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.meta.url,
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.meta.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  /* Read by a search engine to connect the site to the company behind it.
     Small, and one of the few structured-data types that is worth the bytes
     for a business this size. */
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F5F0",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body>
        <StructuredData settings={content.settings} />
        <ToastProvider>
          <Nav />
          <div id="main">{children}</div>
          <Footer settings={content.settings} />
          <ChatWidget />
        </ToastProvider>
      </body>
    </html>
  );
}