import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * The obvious questions (spec §3.6). Plain text, not an accordion — an
 * accordion hides exactly the content that builds trust with a reader who
 * has been burned before and is looking for the catch.
 */
export function AgencyQuestions() {
  const { questions } = site.agencies;

  return (
    <Section tone="lift" eyebrow={questions.eyebrow} heading={questions.heading}>
      <div className="grid gap-10 border-t border-rule pt-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
        {questions.items.map((item, i) => (
          <Reveal key={item.q} delay={i * 40}>
            <h3 className="h-card">{item.q}</h3>
            <p className="measure mt-3 text-ink-soft">{item.a}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}