import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/api";

/**
 * What a search engine reads about the company.
 *
 * Kept to the two types that a business this size can honestly fill in:
 * who we are, and where to write. No invented ratings, no aggregate review
 * counts, no fake opening hours — those get a site penalised when they are
 * wrong, and they are almost always wrong.
 */
export function StructuredData({ settings }: { settings: SiteSettings }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riyad.tech";

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${base}/#organization`,
    name: site.meta.name,
    url: base,
    email: settings.email,
    description: site.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    knowsAbout: [
      "Document automation",
      "AI integration",
      "Custom web applications",
    ],
    sameAs: [settings.linkedin].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      /* JSON.stringify output is data we produced, not user input; the only
         escaping that matters is the closing script tag. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}