import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * How we work (spec §4.4). The one dark section on the page — it exists as
 * much for rhythm as for content, breaking the run of paper-coloured bands.
 *
 * The marker rule that joins the steps is the top border of each cell, not a
 * separate element, so it stays unbroken across the row. On mobile the same
 * border moves to the left edge and the row becomes a timeline.
 *
 * The numbering is justified here: this is a sequence, and the order carries
 * information the reader needs.
 */
export function HowWeWork() {
  const { howWeWork } = site;

  return (
    <Section
      id="how-we-work"
      tone="depth"
      eyebrow={howWeWork.eyebrow}
      heading={howWeWork.heading}
    >
      <ol className="grid md:grid-cols-4">
        {howWeWork.steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.index}
            delay={i * 60}
            className="border-l border-marker/40 pb-8 pl-6 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-6"
          >
            <p className="mono-label text-marker">{step.index}</p>
            <h3 className="h-card mt-3">{step.title}</h3>
            <p className="mt-3 max-w-[34ch] text-[0.9375rem] text-paper/70">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}