"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePortalAuth } from "./PortalAuth";
import { portal, type Message, type Thread } from "@/lib/portal";
import { cn } from "@/lib/cn";

/**
 * Messages.
 *
 * New replies arrive by polling every ten seconds rather than over a socket.
 * That is not a shortcut: the API sleeps on a free instance and drops
 * websockets when it does, and a support thread that silently stops updating
 * is worse than one that takes ten seconds. Each poll asks only for messages
 * after the last id it has, so it almost always comes back empty.
 *
 * On a phone the list and the thread are separate screens — a two-pane layout
 * at 375px gives you two unusable panes.
 */
export function Messages() {
  const { refreshUnread } = usePortalAuth();
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);

  const loadThreads = useCallback(() => {
    portal
      .threads()
      .then(({ conversations }) => setThreads(conversations))
      .catch(() => setThreads([]));
  }, []);

  useEffect(loadThreads, [loadThreads]);

  if (threads === null) {
    return (
      <div>
        <p className="mono-label text-muted">Loading…</p>
        <p className="caption measure mt-2 text-muted">
          The server sleeps when idle and takes a moment to wake.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-8">
      {/* Hidden on mobile once a thread is open, so the screen is not split. */}
      <div className={cn(openId !== null && "hidden lg:block")}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="h-card">Messages</h2>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setComposing(true);
              setOpenId(null);
            }}
          >
            New
          </Button>
        </div>

        {threads.length === 0 ? (
          <p className="caption mt-5 text-muted">
            No messages yet. Start one and it lands in our inbox straight away.
          </p>
        ) : (
          <ul className="mt-5 border-t border-rule">
            {threads.map((thread) => (
              <li key={thread.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(thread.id);
                    setComposing(false);
                    /* Opening it is what marks it read on the server, so the
                       badge should follow within a beat rather than waiting
                       for the next poll. */
                    setTimeout(refreshUnread, 500);
                  }}
                  className={cn(
                    "w-full border-b border-rule py-4 text-left transition-colors duration-150",
                    openId === thread.id ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[0.9375rem] font-medium">
                      {thread.subject}
                    </span>
                    {thread.unreadForCustomer && (
                      <span className="tag shrink-0">New</span>
                    )}
                  </span>
                  <span className="mono-label mt-1.5 block text-muted">
                    {thread.lastMessageAt.slice(0, 10)} · {thread.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cn(openId === null && !composing && "hidden lg:block")}>
        {composing ? (
          <NewThread
            onCancel={() => setComposing(false)}
            onCreated={(thread) => {
              setComposing(false);
              setThreads((previous) => [thread, ...(previous ?? [])]);
              setOpenId(thread.id);
            }}
          />
        ) : openId !== null ? (
          <Thread id={openId} onBack={() => setOpenId(null)} />
        ) : (
          <p className="caption text-muted">
            Choose a message, or start a new one.
          </p>
        )}
      </div>
    </div>
  );
}

function NewThread({
  onCancel,
  onCreated,
}: {
  onCancel: () => void;
  onCreated: (thread: Thread) => void;
}) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const { conversation } = await portal.startThread(
        String(form.get("subject") ?? ""),
        String(form.get("body") ?? ""),
      );
      toast("Sent — we will reply within one working day.");
      onCreated(conversation);
    } catch {
      setError("Could not send that. Try again in a moment.");
      setBusy(false);
    }
  }

  return (
    <form className="card p-6" onSubmit={onSubmit}>
      <p className="mono-label text-muted">New message</p>

      {error && (
        <p className="mono mt-4 border-l-2 border-ink bg-paper px-3 py-2">
          {error}
        </p>
      )}

      <label className="mt-5 block">
        <span className="mono-label text-muted">Subject</span>
        <input
          name="subject"
          required
          maxLength={200}
          className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
        />
      </label>

      <label className="mt-5 block">
        <span className="mono-label text-muted">Message</span>
        <textarea
          name="body"
          required
          rows={6}
          className="mt-2 w-full rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? "Sending…" : "Send"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Thread({ id, onBack }: { id: number; onBack: () => void }) {
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [busy, setBusy] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const lastId = useRef(0);
  /* False until the first poll has landed, so opening a thread does not
     announce every message already in it. */
  const started = useRef(false);

  const poll = useCallback(async () => {
    try {
      const result = await portal.messages(id, lastId.current);

      if (result.conversation) setSubject(result.conversation.subject);

      if (result.messages.length > 0) {
        lastId.current = result.messages[result.messages.length - 1].id;

        /* Only announce replies that arrive while the thread is open, and
           only from us — echoing the customer's own message back at them
           would be noise. The first load is not an arrival either. */
        const fromUs = result.messages.filter((m) => m.senderType === "admin");
        if (started.current && fromUs.length > 0) {
          toast(
            fromUs.length === 1
              ? "New reply from Riyad Tech"
              : `${fromUs.length} new replies`,
          );
        }

        setMessages((previous) => [...previous, ...result.messages]);
        started.current = true;
      } else {
        started.current = true;
      }
    } catch {
      /* A failed poll is not worth showing. The next one is ten seconds away. */
    }
  }, [id, toast]);

  useEffect(() => {
    setMessages([]);
    lastId.current = 0;
    started.current = false;
    poll();

    const timer = setInterval(poll, 10_000);
    return () => clearInterval(timer);
  }, [poll]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") ?? "").trim();
    if (!body) return;

    setBusy(true);

    try {
      const { message } = await portal.send(id, body);
      lastId.current = message.id;
      setMessages((previous) => [...previous, message]);
      form.reset();
    } catch {
      /* Keeping what they typed matters more than an error banner. */
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-rule px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mono-label text-muted lg:hidden"
        >
          ← Back
        </button>
        <p className="text-[0.9375rem] font-medium">{subject}</p>
      </div>

      <div className="max-h-[26rem] flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[36ch] rounded-[4px] border px-4 py-3",
              message.senderType === "customer"
                ? "ml-auto border-rule bg-paper"
                : "border-depth/20 bg-depth/5",
            )}
          >
            <p className="mono-label text-muted">
              {message.senderType === "customer" ? "You" : message.senderName}
            </p>
            <p className="mt-1.5 whitespace-pre-line text-[0.9375rem] text-ink-soft">
              {message.body}
            </p>
          </div>
        ))}
        <div ref={bottom} />
      </div>

      <form
        className="flex items-end gap-3 border-t border-rule px-5 py-4"
        onSubmit={onSubmit}
      >
        <textarea
          name="body"
          rows={2}
          placeholder="Write a reply"
          className="flex-1 resize-none rounded-[2px] border border-rule bg-paper px-3 py-2.5 text-[1rem] focus:border-ink focus:outline-none"
        />
        <Button type="submit" size="sm" disabled={busy}>
          {busy ? "…" : "Send"}
        </Button>
      </form>
    </div>
  );
}