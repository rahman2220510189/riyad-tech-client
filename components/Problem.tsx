import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * The problem, stated before anything is sold.
 *
 * Set as a table rather than three cards on purpose. A table reads as an
 * audit — something measured — and the whole site is built to look like a
 * marked-up document. Three cards with icons would read as an advert.
 *
 * The manual column is arithmetic the reader can check against their own
 * week, which is what makes the automated column believable. The note under
 * the table is not a disclaimer; it is the argument for the pilot.
 */
export function Problem() {
  const { problem } = site;

  return (
    <Section
      id="problem"
      eyebrow={problem.eyebrow}
      heading={problem.heading}
      sub={problem.sub}
    >
      <Reveal className="overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-lift bg-none">
        {/* Column headings, desktop only — on mobile each row labels itself. */}
        <div className="hidden grid-cols-[1fr_9rem_11rem] gap-6 border-b border-rule px-7 py-4 md:grid">
          <p className="mono-label text-muted">{problem.columns.task}</p>
          <p className="mono-label text-muted">{problem.columns.manual}</p>
          <p className="mono-label text-muted">{problem.columns.automated}</p>
        </div>

        <ul>
          {problem.rows.map((row) => (
            <li
              key={row.task}
              className="grid gap-4 border-b border-rule px-7 py-6 last:border-b-0 md:grid-cols-[1fr_9rem_11rem] md:items-baseline md:gap-6"
            >
              <div>
                <p className="text-[0.9375rem] font-medium text-ink">{row.task}</p>
                <p className="caption mt-1 text-muted">{row.detail}</p>
              </div>

              <div className="flex items-baseline gap-3 md:block">
                <p className="mono-label text-muted md:hidden">
                  {problem.columns.manual}
                </p>
                <p className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink-soft">
                  {row.manual}
                </p>
              </div>

              <div className="flex items-baseline gap-3 md:block">
                <p className="mono-label text-muted md:hidden">
                  {problem.columns.automated}
                </p>
                <p className="font-display text-[1.25rem] font-bold tracking-[-0.02em]">
                  <span className="marker">{row.automated}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <p className="measure mono mt-8 text-muted">{problem.note}</p>
      </Reveal>
    </Section>
  );
}