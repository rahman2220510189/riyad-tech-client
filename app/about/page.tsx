import type { Metadata } from "next";
import { AboutStory } from "@/components/AboutStory";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Principles } from "@/components/Principles";
import { Team } from "@/components/Team";
import { HowWeWork } from "@/components/HowWeWork";
import { StackList } from "@/components/StackList";
import { Compliance } from "@/components/Compliance";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.about.title,
  description: site.pages.about.description,
  alternates: { canonical: "/about" },
};

/**
 * About.
 *
 * Someone who clicks "About" is asking three questions: who are these people,
 * what do they actually do, and why should I trust them. The order below
 * answers them in that sequence and stops.
 *
 *   why we exist       AboutStory
 *   what we do         WhatWeBuild
 *   how we behave      Principles
 *   who we are         Team
 *   how a project goes HowWeWork
 *   what we build with StackList
 *   where data lives   Compliance
 */
export default async function About() {
  const page = site.pages.about;
  const content = await getContent();

  return (
    <main>
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} sub={page.sub} />
      <AboutStory />
      <WhatWeBuild
        items={content.services}
        eyebrow={site.about.services.eyebrow}
        heading={site.about.services.heading}
        sub={site.about.services.sub}
        showLink={false}
      />
      <Principles />
      <Team members={content.team} hours={content.settings.workingHours} />
      <HowWeWork />
      <StackList />
      <Compliance />
      <CtaBand />
    </main>
  );
}