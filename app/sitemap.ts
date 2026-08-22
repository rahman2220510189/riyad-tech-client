import type { MetadataRoute } from "next";
import { getContent } from "@/lib/api";

/**
 * Generated from the same source as the pages themselves, so a system added in
 * the admin panel is in the sitemap without anyone remembering to add it.
 *
 * Priorities are honest rather than uniform: the home page and the two pages
 * that answer a buying question rank above the legal ones. Nothing here
 * includes /portal — a signed-in area has nothing for a crawler.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riyad.tech";
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, priority: 0.9 },
    { url: `${base}/products`, lastModified: now, priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, priority: 0.9 },
    { url: `${base}/agencies`, lastModified: now, priority: 0.85 },

    { url: `${base}/work`, lastModified: now, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/imprint`, lastModified: now, priority: 0.3 },
  ];

  const { products } = await getContent();

  return [
    ...pages,
    ...products.map((product) => ({
      url: `${base}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}