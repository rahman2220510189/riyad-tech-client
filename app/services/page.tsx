import type { Metadata } from "next";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Included } from "@/components/Included";
import { HowWeWork } from "@/components/HowWeWork";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.services.title,
  description: site.pages.services.description,
  alternates: { canonical: "/services" },
};

export default async function Services() {
  const page = site.pages.services;
  const content = await getContent();

  return (
    <main>
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} sub={page.sub} />
      <WhatWeBuild items={content.services} showHeader={false} />
      <Included />
      <HowWeWork />
      <CtaBand />
    </main>
  );
}