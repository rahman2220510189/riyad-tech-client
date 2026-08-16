import type { ReactNode } from "react";

/**
 * The opening block of a subpage: eyebrow, h1, one line of context.
 *
 * Kept separate from Section because it is never ruled at the top — a page
 * should begin against the nav, not behind a divider.
 */
export function PageHeader({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow?: string;
  heading: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <section className="band pb-0 pt-14 md:pt-20">
      <div className="wrap">
        {eyebrow && <p className="eyebrow load-in load-in-1">{eyebrow}</p>}
        <h1 className="h-hero load-in load-in-2 mt-4 max-w-[16ch]">{heading}</h1>
        {sub && (
          <p className="measure load-in load-in-3 mt-6 text-ink-soft">{sub}</p>
        )}
      </div>
    </section>
  );
}