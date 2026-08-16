import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";
import { Included } from "@/components/Included";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.pricing.title,
  description: site.pages.pricing.description,
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const content = await getContent();
  return (
    <main>
      <Pricing tiers={content.pricing} headingLevel={1} showLink={false} />
      <Included />
      <Faq items={content.faq} />
      <CtaBand />
    </main>
  );
}