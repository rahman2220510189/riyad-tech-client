import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * Why the company exists, in three paragraphs.
 *
 * Written as an observation rather than a mission. "We are passionate about
 * digital transformation" tells a reader nothing they can check; "we kept
 * meeting people whose week disappeared into invoices" is a claim they can
 * measure against their own office, and most of them will recognise it.
 */
export function AboutStory() {
  const { story } = site.about;

  return (
    <Section eyebrow={story.eyebrow} heading={story.heading}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="measure text-[1.0625rem] text-ink-soft">
            {story.body[0]}
          </p>
        </Reveal>
        <Reveal delay={60} className="space-y-5">
          <p className="measure text-ink-soft">{story.body[1]}</p>
          <p className="measure text-ink-soft">{story.body[2]}</p>
        </Reveal>
      </div>
    </Section>
  );
}