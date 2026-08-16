import { Hero } from "@/components/Hero";
import { ProofBar } from "@/components/ProofBar";
import { Problem } from "@/components/Problem";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { HowWeWork } from "@/components/HowWeWork";
import { Work } from "@/components/Work";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { getContent } from "@/lib/api";

/**
 * Home — the strongest page on the site, not a table of contents.
 *
 * The order is an argument, read top to bottom:
 *
 *   see it work        Hero, with the demo
 *   four facts         ProofBar
 *   name the pain      Problem
 *   what we do         WhatWeBuild  → /services
 *   how it goes        HowWeWork
 *   proof              Work         → /work
 *   what it costs      Pricing      → /pricing
 *   remaining doubts   Faq
 *   the ask            CtaBand
 *
 * A visitor can leave at any point and will already have what matters at that
 * depth. Content comes from the API at build time and falls back to
 * content/site.ts, so this page is static either way.
 */
export default async function Home() {
  const content = await getContent();

  return (
    <main id="top">
      <Hero />
      <ProofBar />
      <Problem />
      <WhatWeBuild items={content.services} />
      <HowWeWork />
      <Work items={content.work} />
      <Pricing tiers={content.pricing} />
      <Faq items={content.faq} />
      <CtaBand />
    </main>
  );
}