"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PortalError, portal } from "@/lib/portal";

/**
 * Choose a new password from an emailed link.
 *
 * The token is checked as soon as the page loads. Letting someone type a
 * password twice and then telling them the link expired is a small cruelty
 * that is easy to avoid.
 */
export function ResetForm({ token }: { token: string }) {
  const [state, setState] = useState<"checking" | "ready" | "dead" | "done">(
    "checking",
  );
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("dead");
      return;
    }

    portal
      .checkReset(token)
      .then(() => setState("ready"))
      .catch(() => setState("dead"));
  }, [token]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    /* Checked here rather than on the server: it is not a security rule, it
       is a typing mistake, and the answer is known without a round trip. */
    if (password !== confirm) {
      setError("Those two do not match.");
      return;
    }

    setBusy(true);

    try {
      await portal.reset(token, password);
      setState("done");
    } catch (caught) {
      setError(
        caught instanceof PortalError
          ? (caught.fields?.password?.[0] ?? caught.message)
          : "Could not reach us. Try again in a moment.",
      );
      setBusy(false);
    }
  }

  if (state === "checking") {
    return <p className="mono-label text-center text-muted">Checking the link…</p>;
  }

  if (state === "dead") {
    return (
      <div className="mx-auto w-full max-w-[26rem] card p-6 sm:p-8">
        <p className="mono-label text-muted">Expired</p>
        <h1 className="h-card mt-3 text-[1.5rem]">
          That link has expired or has already been used.
        </h1>
        <p className="measure mt-3 text-[0.9375rem] text-ink-soft">
          Reset links work once and last an hour. Ask for a new one and it will
          be with you in a moment.
        </p>
        <Button href="/portal" className="mt-6">
          Back to sign in
        </Button>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="mx-auto w-full max-w-[26rem] card p-6 sm:p-8">
        <p className="mono-label text-muted">Done</p>
        <h1 className="h-card mt-3 text-[1.5rem]">Your password is changed.</h1>
        <Button href="/portal" className="mt-6">
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <form className="card p-6 sm:p-8" onSubmit={onSubmit}>
        <p className="mono-label text-muted">Reset password</p>
        <h1 className="h-card mt-3 text-[1.5rem]">Choose a new one.</h1>

        {error && (
          <p className="mono mt-5 border-l-2 border-ink bg-paper px-3 py-2">
            {error}
          </p>
        )}

        <label className="mt-6 block">
          <span className="mono-label text-muted">New password</span>
          <input
            type="password"
            name="password"
            required
            minLength={12}
            autoFocus
            autoComplete="new-password"
            className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
          />
          <span className="caption mt-1.5 block text-muted">
            At least 12 characters. Length matters more than symbols.
          </span>
        </label>

        <label className="mt-5 block">
          <span className="mono-label text-muted">Again</span>
          <input
            type="password"
            name="confirm"
            required
            minLength={12}
            autoComplete="new-password"
            className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
          />
        </label>

        <Button type="submit" disabled={busy} className="mt-6 w-full">
          {busy ? "Saving…" : "Save new password"}
        </Button>
      </form>

      <p className="caption mt-5 text-center text-muted">
        <Link href="/portal" className="border-b border-rule pb-0.5 text-ink">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}