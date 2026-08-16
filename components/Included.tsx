import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * Every project includes (§ added during the multi-page rework).
 *
 * Design, CI/CD, monitoring and documentation live here rather than in the
 * service list. Sold as services they would be four more claims to defend;
 * stated as what comes as standard they are four reasons to relax. It is the
 * same set of skills, moved to where it does the buyer some good.
 */
export function Included() {
  const { included } = site;

  return (
    <Section tone="lift" eyebrow={included.eyebrow} heading={included.heading}>
      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-rule bg-rule sm:grid-cols-2">
        {included.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={i * 60}
            className="bg-paper-lift bg-none p-7"
          >
            <h3 className="h-card">{item.title}</h3>
            <p className="mt-3 text-[0.9375rem] text-ink-soft">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}