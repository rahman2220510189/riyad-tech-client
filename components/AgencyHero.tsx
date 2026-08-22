import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * Hero for /agencies (spec §3.1).
 *
 * No demo panel — unlike the homepage hero, this reader is not evaluating
 * whether we can code. He assumes we can. The fold is spent on the four
 * promises directly below instead.
 *
 * Team size comes from Settings, not a literal, so the number here can never
 * drift from what is actually true in the admin panel.
 */
export function AgencyHero({ teamSize }: { teamSize: string }) {
  const { hero } = site.agencies;

  return (
    <section className="band pt-10 md:pt-16">
      <div className="wrap">
        <p className="eyebrow load-in load-in-1">{hero.eyebrow}</p>

        <h1 className="h-hero load-in load-in-2 mt-5 max-w-[18ch]">
          <span className="block">{hero.headline.line1}</span>
          <span className="block">
            {hero.headline.line2Lead}
            <span className="marker marker-draw">{hero.headline.marked}</span>
            {hero.headline.line2Tail}
          </span>
        </h1>

        <p className="measure load-in load-in-3 mt-6 text-ink-soft">
          {hero.bodyLead}
          {teamSize}
          {hero.bodyTail}
        </p>

        <div className="load-in load-in-4 mt-9 flex flex-wrap gap-3">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button variant="secondary" href={hero.secondary.href}>
            {hero.secondary.label}
            <span aria-hidden="true">↓</span>
          </Button>
        </div>

        <p className="mono-label load-in load-in-5 mt-8 max-w-[46ch] text-muted">
          {hero.assurance}
        </p>
      </div>
    </section>
  );
}