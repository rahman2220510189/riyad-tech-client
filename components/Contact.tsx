import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/api";

/**
 * Contact (spec §4.9).
 *
 * A calendar first, a form second. A form is where interest goes to die; a
 * calendar is a decision. But a good number of people are not ready to put
 * a slot in their week yet, and for them a form beats an email address —
 * so both are here, in that order of prominence.
 *
 * Cal.com is embedded as a plain lazy iframe rather than their React package.
 * It keeps the bundle where it is and costs nothing at page load. If no
 * booking URL is configured the calendar is simply absent, and the form takes
 * the whole page rather than leaving a broken frame.
 */
export function Contact({
  settings,
  headingLevel = 2,
}: {
  settings: SiteSettings;
  headingLevel?: 1 | 2 | 3;
}) {
  const { booking } = site;
  const hasCalendar = Boolean(settings.calUrl);

  return (
    <>
      <Section
        id="contact"
        eyebrow={booking.eyebrow}
        heading={booking.heading}
        sub={booking.sub}
        headingLevel={headingLevel}
        ruled={headingLevel === 2}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:gap-12">
          {hasCalendar ? (
            <Reveal className="card overflow-hidden">
              <iframe
                src={settings.calUrl}
                title="Book a 15-minute call"
                loading="lazy"
                className="h-[42rem] w-full border-0"
              />
            </Reveal>
          ) : (
            <Reveal>
              <ContactForm source="contact" />
            </Reveal>
          )}

          <Reveal delay={60}>
            <p className="mono-label text-muted">{booking.fallbackTitle}</p>

            <ul className="mt-4 border-t border-rule">
              <li className="border-b border-rule py-3">
                <a
                  href={`mailto:${settings.email}`}
                  className="mono text-ink transition-colors duration-150 hover:text-depth"
                >
                  {settings.email}
                </a>
              </li>
              <li className="border-b border-rule py-3">
                <a
                  href={settings.linkedin}
                  rel="noreferrer"
                  className="mono text-ink transition-colors duration-150 hover:text-depth"
                >
                  LinkedIn
                </a>
              </li>
            </ul>

            <p className="mono-label mt-4 text-muted">{settings.responseTime}</p>
          </Reveal>
        </div>
      </Section>

      {/* Only when the calendar took the space above. */}
      {hasCalendar && (
        <Section tone="lift" className="border-t border-rule">
          <div className="max-w-[46rem]">
            <ContactForm source="contact" />
          </div>
        </Section>
      )}
    </>
  );
}