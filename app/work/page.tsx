import type { Metadata } from "next";
import { Work } from "@/components/Work";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.work.title,
  description: site.pages.work.description,
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const content = await getContent();
  return (
    <main>
      <Work items={content.work} headingLevel={1} showLink={false} />
      <CtaBand />
    </main>
  );
}