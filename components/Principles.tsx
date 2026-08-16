import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * Four commitments, not four values.
 *
 * "Integrity. Excellence. Innovation." appears on every agency site and means
 * nothing, because nobody can be held to it. Each line below costs us
 * something if we break it — turning down work, publishing prices, giving away
 * the source. That is the only reason it is worth printing.
 */
export function Principles() {
  const { principles } = site.about;

  return (
    <Section
      tone="depth"
      eyebrow={principles.eyebrow}
      heading={principles.heading}
    >
      <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {principles.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 60}>
            <p className="mono-label text-marker">0{i + 1}</p>
            <h3 className="h-card mt-3 max-w-[24ch]">{item.title}</h3>
            <p className="mt-3 max-w-[46ch] text-[0.9375rem] text-paper/70">
              {item.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}