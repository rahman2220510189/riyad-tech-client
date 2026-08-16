import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { FaqItem } from "@/lib/api";

/**
 * The questions people actually ask, answered before the call.
 *
 * Built on <details> and <summary>, so it works with no JavaScript at all,
 * arrives keyboard-operable and screen-reader-correct for free, and adds
 * nothing to the bundle. The open state survives a print, too.
 *
 * The first one is open on load, so the section does not read as a wall of
 * closed doors.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const { faq } = site;

  return (
    <Section id="faq" eyebrow={faq.eyebrow} heading={faq.heading}>
      <div className="border-t border-rule" role="group">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 40}>
            <details
              open={i === 0}
              className="group border-b border-rule [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start gap-6 py-5">
                <h3 className="h-card measure flex-1 font-normal">{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-display text-[1.25rem] leading-none text-muted transition-transform duration-150 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="measure pb-6 text-ink-soft">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}