import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import type { WorkItem } from "@/lib/api";

/**
 * Work (spec §4.5).
 *
 * Every card says INTERNAL BUILD. Saying it plainly reads as confidence;
 * a European buyer can tell the difference between a new studio being
 * straight with them and an old studio inventing a client list.
 *
 * The whole card is the link, so the target is large and the hover state
 * covers everything the eye is already on.
 */
export function Work({
  items,
  headingLevel = 2,
  showLink = true,
}: {
  items: WorkItem[];
  headingLevel?: 1 | 2 | 3;
  showLink?: boolean;
}) {
  const { work } = site;

  return (
    <Section
      id="work"
      eyebrow={work.eyebrow}
      heading={work.heading}
      sub={work.note}
      headingLevel={headingLevel}
      ruled={headingLevel === 2}
      action={showLink ? <ArrowLink href="/work">All work</ArrowLink> : undefined}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 60}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="card card-hover group flex h-full flex-col overflow-hidden p-8"
            >
              {item.coverImage && (
                <div className="relative -mx-8 -mt-8 mb-7 aspect-[16/10] overflow-hidden border-b border-rule bg-paper">
                  <Image
                    src={item.coverImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <span className="tag self-start">{item.tag}</span>

              <h3 className="h-card mt-6">{item.title}</h3>

              <p className="mt-3 text-[0.9375rem] text-muted">{item.problem}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{item.result}</p>

              <p className="mono mt-6 border-t border-rule pt-5 text-muted">
                {item.stack}
              </p>

              <p className="mono-label mt-5 flex items-center gap-1.5 text-ink">
                {work.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  →
                </span>
                <span className="sr-only">, opens in a new tab</span>
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}