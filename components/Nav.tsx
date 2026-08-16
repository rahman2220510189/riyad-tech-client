"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountLink } from "@/components/AccountLink";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Navigation (spec §4.1), extended for a multi-page site.
 *
 * 64px, sticky, translucent paper over a blur. The bottom rule is absent at
 * the top of the page and appears once the visitor has scrolled 40px.
 *
 * The wordmark is the logo. No mark is needed at launch — a typographic
 * wordmark set well reads as more confident than a hurried symbol.
 *
 * The current page is marked with a rule underneath rather than a colour
 * change, so the marker keeps its one job on the page.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A route change must close the menu, or the overlay outlives the page. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* "/" is a prefix of every path, so it needs an exact match. Everything
     else matches its sub-paths too, ready for /work/some-project later. */
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-depth focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 h-16 border-b backdrop-blur-[8px]",
          "bg-[color-mix(in_srgb,var(--paper)_88%,transparent)]",
          "transition-colors duration-150",
          scrolled ? "border-rule" : "border-transparent",
        )}
      >
        <nav className="wrap flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.nav.wordmark} — home`}
            className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-ink"
          >
            {site.nav.wordmark}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    "border-b pb-0.5 text-[0.9375rem] transition-colors duration-150",
                    isCurrent(link.href)
                      ? "border-ink text-ink"
                      : "border-transparent text-ink-soft hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Quiet by design: a link, not a button. Almost nobody arriving
                here has an account, and the ones who do go looking for it. */}
            <AccountLink className="hidden text-[0.9375rem] text-ink-soft transition-colors duration-150 hover:text-ink lg:inline" />

            <Button href={site.nav.cta.href} size="sm" className="hidden sm:inline-flex">
              {site.nav.cta.label}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? site.nav.menuClose : site.nav.menuOpen}
              className="flex size-10 flex-col items-center justify-center gap-[7px] md:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-ink transition-transform duration-150",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-ink transition-transform duration-150",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-paper md:hidden"
        >
          <div className="wrap flex flex-col gap-1 pt-8">
            {site.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={cn(
                  "h-section border-b border-rule py-4",
                  isCurrent(link.href) ? "text-muted" : "text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
            <AccountLink className="h-section border-b border-rule py-4 text-ink" />
            <Button href={site.nav.cta.href} className="mt-8">
              {site.nav.cta.label}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}