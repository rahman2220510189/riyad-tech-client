import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * Data and compliance (spec §4.7).
 *
 * No padlocks, no shields, no invented certification badges. Four rows of
 * plain type read as facts; a badge reads as decoration, and a visitor who
 * has been burned before knows the difference.
 */
export function Compliance() {
  const { compliance } = site;

  return (
    <Section tone="lift" className="border-y border-rule">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="h-section max-w-[16ch]">{compliance.heading}</h2>
          <p className="measure mt-5 text-ink-soft">{compliance.body}</p>
        </Reveal>

        <Reveal delay={60}>
          <dl className="border-t border-rule">
            {compliance.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6"
              >
                <dt className="mono-label pt-0.5 text-muted">{row.label}</dt>
                <dd className="mono">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}