import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * How a project runs (spec §3.5). Same dark-band treatment as HowWeWork on
 * the home page, reused here for rhythm — the second and last dark band on
 * this page, so it still reads as a deliberate break rather than a habit.
 */
export function AgencyProjectSteps() {
  const { projectSteps } = site.agencies;

  return (
    <Section tone="depth" eyebrow={projectSteps.eyebrow} heading={projectSteps.heading}>
      <ol className="grid md:grid-cols-4">
        {projectSteps.steps.map((step, i) => (
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