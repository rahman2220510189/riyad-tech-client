"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { site } from "@/content/site";

/**
 * The buy request.
 *
 * It does not take money. At €800 to €3,000 a European company expects an
 * invoice and a bank transfer — a card form would be the unfamiliar option,
 * not the convenient one. This opens the conversation; the invoice follows.
 *
 * Country and VAT number are asked here because they decide whether reverse
 * charge applies. A finance person expects the question, and asking now saves
 * an email later.
 */
export function ProductRequestForm({ slug }: { slug: string }) {
  const toast = useToast();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);
    setFields({});

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product-requests`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          /* The API sleeps on a free instance and can take most of a minute to
             wake. A short timeout would tell someone the form is broken when
             it is only cold. */
          signal: AbortSignal.timeout(60_000),
          body: JSON.stringify({ ...payload, slug }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const first = Object.values(
          (data.fields ?? {}) as Record<string, string[]>,
        )[0]?.[0];

        setError(first ?? data.error ?? "Something went wrong. Try email instead.");
        setFields(data.fields ?? {});
        setState("idle");
        return;
      }

      toast("Request sent — expect a reply within one working day.");
      setState("sent");
    } catch {
      setError(
        `Could not reach us. Email ${site.contact.email} and we will pick it up there.`,
      );
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="card p-8">
        <p className="mono-label text-muted">Sent</p>
        <p className="h-card mt-3">{site.buying.success}</p>
      </div>
    );
  }

  return (
    <form className="card p-8" onSubmit={onSubmit}>
      <p className="mono-label text-muted">{site.buying.formTitle}</p>

      {error && (
        <p className="mono mt-4 border-l-2 border-ink bg-paper px-3 py-2">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" required errors={fields.name} />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          errors={fields.email}
        />
        <Field name="company" label="Company" errors={fields.company} />
        <Field name="country" label="Country" errors={fields.country} />
        <div className="sm:col-span-2">
          <Field
            name="vatNumber"
            label="VAT number"
            hint="If you have one — it decides whether reverse charge applies."
            errors={fields.vatNumber}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="mono-label text-muted">
              Anything we should know
            </span>
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[0.9375rem] focus:border-ink focus:outline-none"
              placeholder="What you would use it for, what it has to connect to."
            />
          </label>
        </div>
      </div>

      {/* Honeypot. Real people leave it empty; it costs the visitor nothing
          and works better than a puzzle. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0"
      />

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send request"}
        </Button>
        <p className="mono-label max-w-[34ch] text-muted">
          {site.buying.formNote}
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  hint,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
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
        className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[0.9375rem] focus:border-ink focus:outline-none"
      />
      {hint && <span className="caption mt-1.5 block text-muted">{hint}</span>}
      {errors?.[0] && (
        <span className="caption mt-1.5 block font-medium">{errors[0]}</span>
      )}
    </label>
  );
}