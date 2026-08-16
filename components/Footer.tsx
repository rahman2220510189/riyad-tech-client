import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/api";

/**
 * Footer (spec §4.10). The Privacy and Imprint links matter more than they
 * look: a European visitor checks for them, and notices when they are missing.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-depth bg-ink text-paper">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
              {site.nav.wordmark}
            </p>
            <p className="mono-label mt-3 text-paper/55">
              {settings.location}
            </p>
          </div>

          {site.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mono-label text-paper/55">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[0.9375rem] text-paper/80 transition-colors duration-150 hover:text-marker"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="mono-label text-paper/55">{site.footer.contactTitle}</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[0.9375rem] text-paper/80 transition-colors duration-150 hover:text-marker"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={settings.linkedin}
                  rel="noreferrer"
                  className="text-[0.9375rem] text-paper/80 transition-colors duration-150 hover:text-marker"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mono-label mt-14 border-t border-paper/15 pt-6 text-paper/55">
          {site.footer.bottom} · © {year}
        </p>
      </div>
    </footer>
  );
}