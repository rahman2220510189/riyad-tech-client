import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * The four promises (spec §3.2) — the most important block on the page. It
 * exists to kill the reader's single biggest fear, that we will contact or
 * claim his clients, in the first ten seconds — before pricing or services
 * get a chance to be read at all.
 *
 * Rendered as a tight bordered list rather than cards: cards read as options
 * to weigh against each other, and these four are not options. They are one
 * statement, said in four lines.
 */
export function AgencyPromises() {
  const { promises } = site.agencies;

  return (
    <Section tone="lift" eyebrow={promises.eyebrow} heading={promises.heading}>
      <Reveal>
        <ul className="divide-y divide-rule border border-rule rounded-[var(--radius-card)]">
          {promises.items.map((item) => (
            <li key={item} className="flex items-start gap-3 px-5 py-4 sm:px-6">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-0.5 size-5 shrink-0 text-depth"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 10.5l4 4 8-9"
                />
              </svg>
              <p className="text-[0.9375rem] text-ink">{item}</p>
            </li>
          ))}
        </ul>

        <p className="mono-label mt-5 text-muted">{promises.footnote}</p>
      </Reveal>
    </Section>
  );
}