import type { Metadata } from "next";
import { AgencyHero } from "@/components/AgencyHero";
import { AgencyPromises } from "@/components/AgencyPromises";
import { AgencyOfferings } from "@/components/AgencyOfferings";
import { AgencyProjectSteps } from "@/components/AgencyProjectSteps";
import { AgencyQuestions } from "@/components/AgencyQuestions";
import { StackList } from "@/components/StackList";
import { Contact } from "@/components/Contact";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.agencies.meta.title,
  description: site.agencies.meta.description,
  alternates: { canonical: "/agencies" },
};

/**
 * /agencies — a separate page for a separate audience: owners of small
 * European digital agencies weighing white-label capacity. Unlike the rest
 * of the site, this reader is not asking whether we can build things. He is
 * asking whether we will embarrass him or steal his clients, and the page is
 * sequenced to answer that first.
 *
 *   the offer            AgencyHero
 *   kill the fear        AgencyPromises   ← before anything else
 *   what it costs        AgencyOfferings  → /products (card 04)
 *   what we build with   StackList        (shared with /about)
 *   how it runs          AgencyProjectSteps
 *   remaining doubts     AgencyQuestions
 *   the ask              Contact
 */
export default async function AgenciesPage() {
  const content = await getContent();
  const { closing } = site.agencies;

  return (
    <main>
      <AgencyHero teamSize={content.settings.agencyTeamSize} />
      <AgencyPromises />
      <AgencyOfferings settings={content.settings} />
      <StackList />
      <AgencyProjectSteps />
      <AgencyQuestions />
      <Contact
        settings={content.settings}
        eyebrow={closing.eyebrow}
        heading={closing.heading}
        sub={closing.body}
      />
    </main>
  );
}