import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * The closing band. Every page ends with the same single ask, so a visitor who
 * arrives on any page — from search, from a link — always has somewhere to go.
 *
 * It uses --depth rather than --ink so it reads as the end of the page rather
 * than the start of the footer.
 */
export function CtaBand() {
  const { ctaBand } = site;

  return (
    <section className="on-depth band bg-depth bg-none text-paper">
      <div className="wrap">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="h-section max-w-[18ch]">{ctaBand.heading}</h2>
            <p className="measure mt-4 text-paper/70">{ctaBand.sub}</p>
          </div>
          <Button variant="onDepth" href={ctaBand.action.href} className="shrink-0">
            {ctaBand.action.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}