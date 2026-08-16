"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * The Account link in the nav, with a dot when something is waiting.
 *
 * It asks the API once on load and then every thirty seconds — but only after
 * it has learned there is a session, so a visitor who has never signed in
 * makes exactly one request and never another.
 *
 * A dot rather than a number: from the nav, "there is something" is the whole
 * message, and the count is one click away.
 */
export function AccountLink({ className }: { className?: string }) {
  const [unread, setUnread] = useState(0);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/unread`,
          { credentials: "include" },
        );

        if (!response.ok) {
          if (!cancelled) setSignedIn(false);
          return;
        }

        const data = (await response.json()) as { unread: number };
        if (!cancelled) {
          setSignedIn(true);
          setUnread(data.unread);
        }
      } catch {
        if (!cancelled) setSignedIn(false);
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (signedIn !== true) return;

    const timer = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/unread`,
          { credentials: "include" },
        );
        if (!response.ok) return;
        const data = (await response.json()) as { unread: number };
        setUnread(data.unread);
      } catch {
        /* Not worth reporting — the next tick is thirty seconds away. */
      }
    }, 30_000);

    return () => clearInterval(timer);
  }, [signedIn]);

  return (
    <Link href={site.nav.account.href} className={className}>
      {site.nav.account.label}
      {unread > 0 && (
        <>
          <span
            aria-hidden="true"
            className="ml-1.5 inline-block size-1.5 translate-y-[-2px] rounded-full bg-marker ring-1 ring-ink/20"
          />
          <span className="sr-only">
            {" "}
            — {unread} unread {unread === 1 ? "message" : "messages"}
          </span>
        </>
      )}
    </Link>
  );
}