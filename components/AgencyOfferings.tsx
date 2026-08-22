import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/api";

/**
 * What we take on (spec §3.3). Prices for the first three cards come from
 * Settings in the admin panel — team rates change more often than the rest
 * of this page's copy, and this is the one place on the site where a stale
 * number costs a deal, not just an update.
 */
export function AgencyOfferings({ settings }: { settings: SiteSettings }) {
  const { offerings } = site.agencies;

  return (
    <Section id="offerings" eyebrow={offerings.eyebrow} heading={offerings.heading}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offerings.items.map((item, i) => {
          const price = item.priceSettingKey
            ? settings[item.priceSettingKey as keyof SiteSettings] || item.priceFallback
            : item.priceFallback;

          const content = (
            <>
              <p className="mono-label text-muted">{item.index}</p>
              <h3 className="h-card mt-4">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">{item.body}</p>
              <p className="mono mt-4 text-depth">{price}</p>
              <ul className="mono mt-4 space-y-1 text-muted">
                {item.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </>
          );

          return (
            <Reveal key={item.index} delay={i * 60}>
              {item.href ? (
                <Link href={item.href} className="card card-hover block h-full p-6">
                  {content}
                </Link>
              ) : (
                <div className="card h-full p-6">{content}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      <p className="mono-label mt-8 text-muted">{offerings.footnote}</p>
    </Section>
  );
}