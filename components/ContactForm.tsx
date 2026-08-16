"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { site } from "@/content/site";

/**
 * The alternative to the calendar.
 *
 * Four fields. Every extra one — phone number, company size, budget range,
 * "how did you hear about us" — costs submissions and changes nothing about
 * what happens on the call.
 *
 * The one question that earns its place is the last: what is being done by
 * hand today. That answer decides whether we can help at all, and it lets the
 * first reply be useful instead of a request for more information.
 */
export function ContactForm({ source = "contact" }: { source?: string }) {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/leads`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...payload, source }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        /* The server names the field and says what is wrong with it. Repeating
           "some fields need attention" above a form the visitor has to hunt
           through is worse than saying nothing — so the first real message is
           promoted to the top. */
        const first = Object.values(
          (data.fields ?? {}) as Record<string, string[]>,
        )[0]?.[0];

        setError(first ?? data.error ?? "Something went wrong.");
        setFields(data.fields ?? {});
        setState("idle");
        return;
      }

      toast("Sent — we will reply within one working day.");
      setState("sent");
    } catch {
      setError(
        `Could not reach us. Email ${site.contact.email} and it will get to the same place.`,
      );
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="card p-8">
        <p className="mono-label text-muted">Sent</p>
        <p className="h-card mt-3">{site.contactForm.success}</p>
        <p className="measure mt-3 text-[0.9375rem] text-ink-soft">
          {site.contactForm.successNote}
        </p>
      </div>
    );
  }

  return (
    <form className="card p-8" onSubmit={onSubmit}>
      <p className="mono-label text-muted">{site.contactForm.title}</p>
      <p className="measure mt-3 text-[0.9375rem] text-ink-soft">
        {site.contactForm.intro}
      </p>

      {error && (
        <p className="mono mt-5 border-l-2 border-ink bg-paper px-3 py-2">
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
        <div className="sm:col-span-2">
          <Field name="company" label="Company" errors={fields.company} />
        </div>
        <div className="sm:col-span-2">
          <label className="block">
            <span className="mono-label text-muted">
              {site.contactForm.messageLabel}
            </span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder={site.contactForm.messagePlaceholder}
              className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[0.9375rem] focus:border-ink focus:outline-none"
            />
            <span className="caption mt-1.5 block text-muted">
              {site.contactForm.messageHint}
            </span>
            {fields.message?.[0] && (
              <span className="caption mt-1 block font-medium">
                {fields.message[0]}
              </span>
            )}
          </label>
        </div>
      </div>

      {/* Honeypot: real people leave it empty, and it costs them nothing. */}
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
          {state === "sending" ? "Sending…" : site.contactForm.action}
        </Button>
        <p className="mono-label text-muted">{site.contact.responseTime}</p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
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
      {errors?.[0] && (
        <span className="caption mt-1.5 block font-medium">{errors[0]}</span>
      )}
    </label>
  );
}