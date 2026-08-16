import { ExtractionDemo } from "@/components/ExtractionDemo";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * Hero (spec §4.2). Seven-five split on desktop, stacked on mobile with the
 * demo underneath the text.
 *
 * The load sequence is CSS only and runs once: each element fades up 12px,
 * 60ms behind the one above it. The marker stroke under the last word arrives
 * at 700ms, after the sentence has had a moment to be read — the effect is
 * someone reaching for a highlighter, not a box appearing.
 */
export function Hero() {
  const { hero } = site;

  return (
    <section className="band pt-10 md:pt-16">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow load-in load-in-1">{hero.eyebrow}</p>

            <h1 className="h-hero load-in load-in-2 mt-5 max-w-[13ch]">
              {hero.headline.lead}{" "}
              <span className="marker marker-draw">{hero.headline.marked}</span>
              {hero.headline.tail}
            </h1>

            <p className="measure load-in load-in-3 mt-6 text-ink-soft">
              {hero.body}
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

          <div className="load-in load-in-4 lg:col-span-5">
            <ExtractionDemo />
          </div>
        </div>
      </div>
    </section>
  );
}