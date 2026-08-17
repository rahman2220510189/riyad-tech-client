"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { PortalError, portal } from "@/lib/portal";
import { usePortalAuth } from "./PortalAuth";

/**
 * Account settings: change a password, and see what we hold.
 *
 * The second half is not decoration. A European buyer has a right to know what
 * a supplier stores about them, and a short honest list answers the question
 * better than a link to a privacy policy nobody opens.
 */
export function AccountSettings() {
  const { customer } = usePortalAuth();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const current = String(data.get("current") ?? "");
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    if (password !== confirm) {
      setError("Those two do not match.");
      return;
    }

    setBusy(true);

    try {
      await portal.changePassword(current, password);
      toast("Password changed.");
      form.reset();
    } catch (caught) {
      setError(
        caught instanceof PortalError
          ? (caught.fields?.current?.[0] ??
            caught.fields?.password?.[0] ??
            caught.message)
          : "Could not reach us. Try again in a moment.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <form className="card p-6 sm:p-7" onSubmit={onSubmit}>
        <p className="mono-label text-muted">Change password</p>

        {error && (
          <p className="mono mt-5 border-l-2 border-ink bg-paper px-3 py-2">
            {error}
          </p>
        )}

        <label className="mt-6 block">
          <span className="mono-label text-muted">Current password</span>
          <input
            type="password"
            name="current"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
          />
        </label>

        <label className="mt-5 block">
          <span className="mono-label text-muted">New password</span>
          <input
            type="password"
            name="password"
            required
            minLength={12}
            autoComplete="new-password"
            className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
          />
          <span className="caption mt-1.5 block text-muted">
            At least 12 characters.
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

        <Button type="submit" disabled={busy} className="mt-6">
          {busy ? "Saving…" : "Change password"}
        </Button>
      </form>

      <div className="card p-6 sm:p-7">
        <p className="mono-label text-muted">What we hold</p>

        <dl className="mt-5 border-t border-rule">
          <Row label="Name" value={customer?.name ?? "—"} />
          <Row label="Email" value={customer?.email ?? "—"} />
          <Row label="Company" value={customer?.company || "—"} />
          <Row label="Country" value={customer?.country || "—"} />
        </dl>

        <p className="measure mt-6 text-[0.9375rem] text-ink-soft">
          That is the lot — this account holds your contact details, the
          requests you have sent, and the messages in this thread. Nothing else,
          and none of it is shared.
        </p>

        <p className="caption mt-4 text-muted">
          To change these details or have the account deleted, send us a message
          and it is done the same day.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_1fr] gap-4 border-b border-rule py-3">
      <dt className="mono-label pt-0.5 text-muted">{label}</dt>
      <dd className="mono break-words">{value}</dd>
    </div>
  );
}