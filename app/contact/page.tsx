import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.contact.title,
  description: site.pages.contact.description,
  alternates: { canonical: "/contact" },
};

/* No closing CTA band here — the visitor is already at the ask. */
export default async function ContactPage() {
  const content = await getContent();
  return (
    <main>
      <Contact settings={content.settings} headingLevel={1} />
    </main>
  );
}