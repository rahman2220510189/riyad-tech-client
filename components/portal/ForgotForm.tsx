"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { portal } from "@/lib/portal";

/**
 * Ask for a reset link.
 *
 * The confirmation is deliberately vague — "if that address has an account" —
 * and it is shown whether the address exists or not. Anything more specific
 * turns this form into a way of checking which addresses are our customers.
 */
export function ForgotForm({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);

    const email = String(new FormData(event.currentTarget).get("email") ?? "");

    try {
      const result = await portal.forgot(email);
      setSent(result.message);
    } catch {
      /* Same message on failure. The visitor learns nothing either way, and
         neither does anyone testing addresses. */
      setSent(
        "If that address has an account, a reset link is on its way. It expires in an hour.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-[26rem]">
        <div className="card p-6 sm:p-8">
          <p className="mono-label text-muted">Check your email</p>
          <p className="h-card mt-3 text-[1.25rem]">{sent}</p>
          <p className="caption mt-4 text-muted">
            Nothing arrived? Look in spam, then try again in a few minutes.
          </p>
        </div>
        <p className="caption mt-5 text-center">
          <button
            type="button"
            onClick={onBack}
            className="border-b border-rule pb-0.5 text-ink transition-colors duration-150 hover:border-ink"
          >
            Back to sign in
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <form className="card p-6 sm:p-8" onSubmit={onSubmit}>
        <p className="mono-label text-muted">Forgotten password</p>
        <h1 className="h-card mt-3 text-[1.5rem]">
          We will send you a link.
        </h1>

        <label className="mt-6 block">
          <span className="mono-label text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            autoFocus
            autoComplete="email"
            className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
          />
        </label>

        <Button type="submit" disabled={busy} className="mt-6 w-full">
          {busy ? "Sending…" : "Send reset link"}
        </Button>
      </form>

      <p className="caption mt-5 text-center text-muted">
        Remembered it?{" "}
        <button
          type="button"
          onClick={onBack}
          className="border-b border-rule pb-0.5 text-ink transition-colors duration-150 hover:border-ink"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}