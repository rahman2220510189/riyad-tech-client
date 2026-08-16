import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import type { PricingTier } from "@/lib/api";
import { cn } from "@/lib/cn";

/**
 * Pricing (spec §4.6).
 *
 * The numbers are on the page, readable without a click. Most studios make
 * you ask; putting it in writing removes the one question that stops a
 * skeptical visitor from booking.
 *
 * Pilot is emphasised with a 2px --ink border and a marker tag — no larger
 * card, no shadow, no scale. The weight of the border does the work.
 */
export function Pricing({
  tiers,
  headingLevel = 2,
  showLink = true,
}: {
  tiers: PricingTier[];
  headingLevel?: 1 | 2 | 3;
  showLink?: boolean;
}) {
  const { pricing } = site;

  return (
    <Section
      id="pricing"
      eyebrow={pricing.eyebrow}
      heading={pricing.heading}
      sub={pricing.sub}
      headingLevel={headingLevel}
      ruled={headingLevel === 2}
      action={
        showLink ? <ArrowLink href="/pricing">What is included</ArrowLink> : undefined
      }
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal
            as="li"
            key={tier.name}
            delay={i * 60}
            className={cn(
              "card flex flex-col p-8",
              tier.featured && "border-2 border-ink",
            )}
          >
            {tier.featured && (
              <span className="tag mb-6 self-start">{pricing.featuredTag}</span>
            )}

            <h3 className="h-card">{tier.name}</h3>

            <p className="mono-label mt-6 text-muted">{pricing.currency}</p>
            <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.03em]">
              {tier.price}
            </p>

            <dl className="mt-6 border-t border-rule pt-5">
              <dt className="mono-label text-muted">{pricing.timelineLabel}</dt>
              <dd className="mono mt-1">{tier.timeline}</dd>
            </dl>

            <dl className="mt-6">
              <dt className="mono-label text-muted">{pricing.includesLabel}</dt>
              <dd>
                <ul className="mt-3 space-y-2">
                  {tier.includes.map((line) => (
                    <li
                      key={line}
                      className="border-t border-rule pt-2 text-[0.9375rem] text-ink-soft first:border-0 first:pt-0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </Reveal>
        ))}
      </ul>

      {/* One line that tells a European finance person we understand how they buy. */}
      <Reveal>
        <p className="mono mt-10 max-w-[68ch] text-muted">{pricing.vatNote}</p>
      </Reveal>
    </Section>
  );
}