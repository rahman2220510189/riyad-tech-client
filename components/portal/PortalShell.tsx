"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToastProvider } from "@/components/ui/Toast";
import { PortalAuthProvider, usePortalAuth } from "./PortalAuth";
import { SignInForm } from "./SignInForm";
import { Messages } from "./Messages";
import { Orders } from "./Orders";
import { cn } from "@/lib/cn";

/**
 * The portal.
 *
 * Signed out, this is a sign-in card and nothing else — there is no protected
 * route to forget to protect, because signed out there are no routes at all.
 *
 * Two tabs rather than two pages: on a phone, tabs are one tap and keep the
 * whole thing on one screen.
 */
function Inner() {
  const { customer, checking, unread, signOut } = usePortalAuth();
  const [tab, setTab] = useState<"orders" | "messages">("orders");

  if (checking) {
    return (
      <div className="band wrap">
        <p className="mono-label text-muted">Loading…</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="band wrap">
        <SignInForm />
      </div>
    );
  }

  return (
    <div className="band wrap">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your account</p>
          <h1 className="h-section mt-3">{customer.name}</h1>
          <p className="mono-label mt-2 text-muted">{customer.email}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <div
        className="mt-10 flex gap-6 border-b border-rule"
        role="tablist"
        aria-label="Account sections"
      >
        {(["orders", "messages"] as const).map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-[0.9375rem] capitalize transition-colors duration-150",
              tab === name
                ? "border-ink text-ink"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {name}
            {name === "messages" && unread > 0 && (
              <span className="tag ml-2">{unread}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">{tab === "orders" ? <Orders /> : <Messages />}</div>
    </div>
  );
}

export function PortalShell() {
  return (
    <PortalAuthProvider>
      <ToastProvider>
        <main id="top">
          <Inner />
        </main>
      </ToastProvider>
    </PortalAuthProvider>
  );
}