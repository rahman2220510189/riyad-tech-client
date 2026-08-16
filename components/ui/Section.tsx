import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type Tone = "paper" | "lift" | "depth";

const tones: Record<Tone, string> = {
  paper: "",
  lift: "bg-paper-lift bg-none",
  // The one dark band on the page (§4.4)
  depth: "on-depth bg-depth bg-none text-paper",
};

export function Section({
  id,
  eyebrow,
  heading,
  sub,
  tone = "paper",
  ruled = true,
  headingLevel = 2,
  action,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  heading?: ReactNode;
  sub?: ReactNode;
  tone?: Tone;
  /** 1px --rule divider above the section (§3.4) */
  ruled?: boolean;
  headingLevel?: 1 | 2 | 3;
  /** Rendered under the children — the "see all" link on home page sections */
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3";
  const hasHeader = Boolean(eyebrow || heading || sub);

  return (
    <section
      id={id}
      className={cn("band", ruled && tone === "paper" && "band-ruled", tones[tone], className)}
    >
      <div className="wrap">
        {hasHeader && (
          <Reveal className="mb-12 md:mb-16">
            {eyebrow && (
              <p className={cn("eyebrow mb-4", tone === "depth" && "text-marker")}>
                {eyebrow}
              </p>
            )}
            {heading && <Heading className="h-section max-w-[20ch]">{heading}</Heading>}
            {sub && (
              <p
                className={cn(
                  "measure mt-4",
                  tone === "depth" ? "text-paper/75" : "text-ink-soft",
                )}
              >
                {sub}
              </p>
            )}
          </Reveal>
        )}
        {children}
        {action && <div className="mt-10">{action}</div>}
      </div>
    </section>
  );
}