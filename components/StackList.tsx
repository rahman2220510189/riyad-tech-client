import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * What we build with.
 *
 * A technical buyer checks this before the call, and the reassuring answer is
 * a boring one. Set as a plain list of rows rather than a wall of logos — logos
 * read as sponsorship, a list reads as a fact.
 */
export function StackList() {
  const { stack } = site.about;

  return (
    <Section tone="lift" className="border-y border-rule">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{stack.eyebrow}</p>
          <h2 className="h-section mt-4 max-w-[14ch]">{stack.heading}</h2>
          <p className="measure mt-4 text-ink-soft">{stack.body}</p>
        </Reveal>

        <Reveal delay={60}>
          <dl className="border-t border-rule">
            {stack.groups.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6"
              >
                <dt className="mono-label pt-0.5 text-muted">{group.label}</dt>
                <dd className="mono">{group.items}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}