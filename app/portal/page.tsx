import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "Your account — Riyad Tech",
  description: "Track your order and message us directly.",
  /* A signed-in area has nothing for a search engine, and indexing it would
     only ever show the sign-in screen. */
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return <PortalShell />;
}