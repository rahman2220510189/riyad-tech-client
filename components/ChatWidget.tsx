"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * The site assistant.
 *
 * Closed by default, and quiet about it. A panel that opens itself after ten
 * seconds is the most disliked pattern on a B2B site, and this one is selling
 * to people who have been chased by enough of them.
 *
 * Answers come from the database through the API, which refuses anything the
 * site does not actually say. That refusal is part of what we sell, so it had
 * better work here first.
 */

type Message = { role: "user" | "assistant"; content: string };

const OPENING: Message = {
  role: "assistant",
  content:
    "Ask me about what we build, what it costs, or how a project runs. If I do not know, I will say so.",
};

const SUGGESTIONS = [
  "What does a pilot cost?",
  "Where is our data processed?",
  "Can you read scanned invoices?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [busy, setBusy] = useState(false);
  const [nudge, setNudge] = useState(false);
  const nudged = useRef(false);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  /**
   * A single prompt, once, and only after the visitor has read some of the
   * page. Scrolling past the fold is the signal: it means they are looking
   * for something, which is the moment a question is worth offering.
   *
   * It says its piece and leaves. A bubble that cycles through messages is
   * built to catch the eye every few seconds, and the thing it mostly teaches
   * people is to stop looking at that corner.
   */
  useEffect(() => {
    if (nudged.current) return;

    const onScroll = () => {
      if (nudged.current || window.scrollY < 700) return;
      nudged.current = true;
      setNudge(true);
      window.removeEventListener("scroll", onScroll);
      setTimeout(() => setNudge(false), 10_000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) bottom.current?.scrollIntoView({ block: "end" });
  }, [messages.length, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setMessages((previous) => [...previous, { role: "user", content: question }]);
    setBusy(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            message: question,
            /* The opening line is ours, not a real exchange, so it is dropped
               before the history is sent. */
            history: messages
              .filter((message) => message !== OPENING)
              .slice(-8),
          }),
        },
      );

      const data = (await response.json()) as { reply?: string };

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            data.reply ??
            "Something went wrong on my side. Book a call and we will answer properly.",
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I could not reach the server. Book a call and we will answer directly.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = String(new FormData(form).get("q") ?? "");
    form.reset();
    send(value);
  }

  return (
    <>
      {/* Two controls side by side rather than one nested in the other: a
          button inside a button is invalid, and the dismiss becomes
          unreachable from a keyboard. */}
      {nudge && !open && (
        <div className="load-in load-in-1 card fixed bottom-[4.75rem] right-5 z-40 hidden max-w-[17rem] sm:block">
          <button
            type="button"
            onClick={() => {
              setNudge(false);
              setOpen(true);
              setTimeout(() => input.current?.focus(), 100);
            }}
            className="block px-4 py-3 pr-8 text-left text-[0.875rem] text-ink-soft transition-colors duration-150 hover:text-ink"
          >
            Questions about pricing, timelines or where your data goes? Ask.
          </button>
          <button
            type="button"
            onClick={() => setNudge(false)}
            aria-label="Dismiss"
            className="mono-label absolute right-2 top-2 px-1.5 py-0.5 text-muted transition-colors duration-150 hover:text-ink"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setNudge(false);
          setOpen(true);
          setTimeout(() => input.current?.focus(), 100);
        }}
        aria-expanded={open}
        aria-controls="assistant"
        aria-label="Ask the assistant a question"
        className={cn(
          "group fixed bottom-5 right-5 z-40 flex items-center gap-2.5",
          "rounded-[var(--radius-btn)] border border-depth bg-depth text-paper",
          "transition-colors duration-150 hover:border-ink hover:bg-ink",
          /* Icon only where the screen is narrow, icon and label where it is
             not: a lone icon is guessed at, and a guess is a click not made. */
          "size-12 justify-center sm:h-12 sm:w-auto sm:justify-start sm:pl-4 sm:pr-5",
          open && "hidden",
        )}
      >
        <AssistantMark />
        <span className="hidden text-[0.9375rem] font-medium sm:inline">
          Ask
        </span>
      </button>

      {open && (
        <div
          id="assistant"
          role="dialog"
          aria-label="Site assistant"
          className={cn(
            "card fixed z-40 flex flex-col overflow-hidden",
            /* Full screen on a phone: a 360px panel over a 375px viewport is
               neither one thing nor the other. */
            "inset-x-0 bottom-0 top-16 rounded-none",
            "sm:inset-auto sm:bottom-5 sm:right-5 sm:top-auto sm:h-[32rem] sm:w-[23rem] sm:rounded-[var(--radius-card)]",
          )}
        >
          <div className="flex items-center gap-2.5 border-b border-rule px-4 py-3">
            <AssistantMark className="text-depth" />
            <p className="mono-label">Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mono-label ml-auto text-muted transition-colors duration-150 hover:text-ink"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, i) => (
              <p
                key={i}
                className={cn(
                  "max-w-[30ch] whitespace-pre-line rounded-[4px] border px-3.5 py-2.5 text-[0.9375rem]",
                  message.role === "user"
                    ? "ml-auto border-rule bg-paper text-ink"
                    : "border-depth/15 bg-depth/5 text-ink-soft",
                )}
              >
                {message.content}
              </p>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-[2px] border border-rule px-2.5 py-1.5 text-left text-[0.8125rem] text-ink-soft transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {busy && <p className="mono-label text-muted">Thinking…</p>}

            <div ref={bottom} />
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-rule px-3 py-3"
          >
            <input
              ref={input}
              name="q"
              autoComplete="off"
              maxLength={1000}
              placeholder="Ask about pricing, data, timelines…"
              className="flex-1 rounded-[2px] border border-rule bg-paper px-3 py-2 text-[1rem] focus:border-ink focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-[var(--radius-btn)] border border-depth bg-depth px-4 py-2 text-[0.875rem] font-medium text-paper transition-colors duration-150 hover:border-ink hover:bg-ink disabled:opacity-55"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/**
 * The assistant's mark.
 *
 * A document with a line marked on it, not a speech bubble — the site is about
 * reading paperwork, and every other chat widget on the internet is a bubble.
 * The marked line is drawn in --marker, the same stroke that highlights a word
 * in the headline and a field in the demo, so the button belongs to the page
 * rather than sitting on top of it.
 */
function AssistantMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      {/* the sheet */}
      <path
        d="M5.5 3.5h9l4.5 4.5v12.5h-13.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* the folded corner */}
      <path
        d="M14.5 3.5V8h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* two plain lines of text */}
      <path
        d="M8.5 11.5h7M8.5 17h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* and the one that has been marked */}
      <path
        d="M8.5 14.25h7"
        stroke="var(--color-marker)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}