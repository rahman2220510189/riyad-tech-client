import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riyad.tech";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* The portal is behind a session and the API route does nothing for a
         crawler; indexing either would only ever surface a sign-in screen. */
      disallow: ["/portal", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}