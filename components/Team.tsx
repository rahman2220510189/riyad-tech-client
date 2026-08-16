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
          <Reveal as="li" key={member.name} delay={i * 60} className="card p-6">
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
            <p className="mt-3 text-[0.9375rem] text-ink-soft">{member.line}</p>

            <a
              href={member.linkedin ?? "#"}
              rel="noreferrer"
              className="mono-label mt-5 inline-block border-b border-rule pb-0.5 text-ink transition-colors duration-150 hover:border-ink"
            >
              LinkedIn
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mono mt-10 text-muted">{hours}</p>
      </Reveal>
    </Section>
  );
}