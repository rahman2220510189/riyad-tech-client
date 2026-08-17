"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PortalError, portal } from "@/lib/portal";
import { usePortalAuth } from "./PortalAuth";

/**
 * Sign in and sign up, in one card.
 *
 * Two separate pages would double the routes and add a decision nobody wants
 * to make on arrival. A single toggle keeps the whole thing to one screen,
 * which matters most on a phone.
 */
export function SignInForm({ onForgot }: { onForgot: () => void }) {
  const { setCustomer } = usePortalAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setFields({});

    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries()) as Record<string, string>;

    try {
      const result =
        mode === "in"
          ? await portal.login(values.email, values.password)
          : await portal.register({
              name: values.name,
              email: values.email,
              password: values.password,
              company: values.company,
              country: values.country,
            });

      setCustomer(result.customer);
    } catch (caught) {
      if (caught instanceof PortalError) {
        setError(caught.message);
        setFields(caught.fields ?? {});
      } else {
        setError("Could not reach us. Try again in a moment.");
      }
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[26rem]">
      <div className="card p-6 sm:p-8">
        <p className="mono-label text-muted">
          {mode === "in" ? "Sign in" : "Create an account"}
        </p>
        <h1 className="h-card mt-3 text-[1.5rem]">
          {mode === "in"
            ? "Your orders and messages."
            : "Track your order in one place."}
        </h1>

        {error && (
          <p className="mono mt-5 border-l-2 border-ink bg-paper px-3 py-2">
            {error}
          </p>
        )}

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          {mode === "up" && (
            <Field name="name" label="Name" required errors={fields.name} />
          )}

          <Field
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            errors={fields.email}
          />

          <Field
            name="password"
            label="Password"
            type="password"
            autoComplete={mode === "in" ? "current-password" : "new-password"}
            required
            hint={mode === "up" ? "At least 12 characters." : undefined}
            errors={fields.password}
          />

          {mode === "up" && (
            <>
              <Field name="company" label="Company" errors={fields.company} />
              <Field name="country" label="Country" errors={fields.country} />
            </>
          )}

          <Button type="submit" disabled={busy} className="w-full">
            {busy
              ? "Working…"
              : mode === "in"
                ? "Sign in"
                : "Create account"}
          </Button>

          {mode === "in" && (
            <p className="caption text-center">
              <button
                type="button"
                onClick={onForgot}
                className="text-muted transition-colors duration-150 hover:text-ink"
              >
                Forgotten your password?
              </button>
            </p>
          )}
        </form>
      </div>

      <p className="caption mt-5 text-center text-muted">
        {mode === "in" ? "No account yet? " : "Already have one? "}
        <button
          type="button"
          className="border-b border-rule pb-0.5 text-ink transition-colors duration-150 hover:border-ink"
          onClick={() => {
            setMode(mode === "in" ? "up" : "in");
            setError(null);
            setFields({});
          }}
        >
          {mode === "in" ? "Create one" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  hint,
  autoComplete,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
  errors?: string[];
}) {
  return (
    <label className="block">
      <span className="mono-label text-muted">
        {label}
        {!required && <span className="normal-case"> · optional</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
      />
      {hint && <span className="caption mt-1.5 block text-muted">{hint}</span>}
      {errors?.[0] && (
        <span className="caption mt-1.5 block font-medium">{errors[0]}</span>
      )}
    </label>
  );
}