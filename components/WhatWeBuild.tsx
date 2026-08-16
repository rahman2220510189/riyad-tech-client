import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import type { ServiceItem } from "@/lib/api";

/**
 * What we build (spec §4.3).
 *
 * The 01/02/03 indices earn their place: they map onto the three pricing
 * tiers further down the page. They are a reference, not decoration.
 */
export function WhatWeBuild({
  items,
  eyebrow,
  heading,
  sub,
  showHeader = true,
  showLink = true,
}: {
  items: ServiceItem[];
  /** Override the default header — the About page frames these differently */
  eyebrow?: string;
  heading?: string;
  sub?: string;
  showHeader?: boolean;
  showLink?: boolean;
}) {
  const { whatWeBuild } = site;

  return (
    <Section
      id="what-we-build"
      eyebrow={showHeader ? (eyebrow ?? whatWeBuild.eyebrow) : undefined}
      heading={showHeader ? (heading ?? whatWeBuild.heading) : undefined}
      sub={showHeader ? sub : undefined}
      ruled={showHeader}
      action={
        showLink ? <ArrowLink href="/services">All services</ArrowLink> : undefined
      }
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.index} delay={i * 60} className="card p-8">
            <p className="mono-label text-muted">{item.index}</p>

            <h3 className="h-card mt-6">{item.title}</h3>

            <p className="mt-3 text-[0.9375rem] text-ink-soft">{item.body}</p>

            <ul className="mono mt-6 space-y-1.5 border-t border-rule pt-5 text-muted">
              {item.uses.map((use) => (
                <li key={use}>{use}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}