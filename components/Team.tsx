import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { TeamMember } from "@/lib/api";

/**
 * Team (spec §4.8).
 *
 * Saying where we are and which hours we keep converts better than hiding it.
 * Anyone can find out anyway, and being found out destroys the trust the rest
 * of the page spends its time building.
 *
 * Photos are grayscale and take on colour on hover — a quiet reward, and it
 * keeps three portraits from fighting the marker for attention.
 */
export function Team({
  members,
  hours,
  heading,
  sub,
  showHeader = true,
}: {
  members: TeamMember[];
  hours: string;
  heading?: string;
  sub?: string;
  showHeader?: boolean;
}) {
  const { team } = site;

  return (
    <Section
      id="team"
      eyebrow={showHeader ? team.eyebrow : undefined}
      heading={showHeader ? (heading ?? team.heading) : undefined}
      sub={showHeader ? (sub ?? team.sub) : undefined}
      ruled={showHeader}
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {members.map((member, i) => (
          <Reveal
            as="li"
            key={member.name}
            delay={i * 60}
            /* Column layout with the link pushed to the bottom, so a card
               without one lines up with a card that has one. */
            className="card flex flex-col p-6"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-paper">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-[filter] duration-150 hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-rule">
                  <span className="font-display text-[2.5rem] font-bold text-rule">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <h3 className="h-card mt-5">{member.name}</h3>
            <p className="mono-label mt-1.5 text-muted">{member.role}</p>
            <p className="mt-3 flex-1 text-[0.9375rem] text-ink-soft">
              {member.line}
            </p>

            {/* Only rendered when there is somewhere to go. A LinkedIn button
                that leads nowhere is worse than no button: it is the first
                thing a cautious buyer clicks, and the first thing that tells
                them the page was assembled rather than written. */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group mono-label mt-5 inline-flex items-center gap-1.5 border-b border-rule pb-0.5 text-ink transition-colors duration-150 hover:border-ink"
              >
                LinkedIn
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
                <span className="sr-only">
                  , {member.name}, opens in a new tab
                </span>
              </a>
            )}
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mono mt-10 text-muted">{hours}</p>
      </Reveal>
    </Section>
  );
}