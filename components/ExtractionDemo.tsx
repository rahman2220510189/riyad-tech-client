"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  demoDocs,
  demoTiming,
  type Block,
  type DemoDoc,
  type Line,
} from "@/lib/demoData";
import { cn } from "@/lib/cn";

/**
 * The signature component (spec §4.2).
 *
 * A scan line sweeps the document, six fields light up under a marker stroke,
 * and each one types itself into the pane on the right as structured data.
 * Self-contained, hardcoded, no network. The loop restarts every 12 seconds,
 * and the three buttons switch documents and re-run it.
 *
 * Under prefers-reduced-motion the finished state is shown immediately.
 */

const FIELD_LEAD = 0.45; // fraction of a field's typing spent on the key

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function ExtractionDemo({ className }: { className?: string }) {
  const [docIndex, setDocIndex] = useState(0);
  const [typed, setTyped] = useState<number[]>([]);
  const [scanning, setScanning] = useState(false);
  const [settled, setSettled] = useState(false);
  const [runId, setRunId] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);
  const reduced = useReducedMotion();

  const doc = demoDocs[docIndex];

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  }, []);

  useEffect(() => {
    clearAll();

    if (reduced) {
      setScanning(false);
      setTyped(doc.fields.map((f) => f.key.length + f.value.length));
      setSettled(true);
      return clearAll;
    }

    setTyped(doc.fields.map(() => 0));
    setSettled(false);
    setScanning(true);

    const after = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    };

    after(demoTiming.scan, () => setScanning(false));

    let last: number = demoTiming.scan;

    doc.fields.forEach((field, i) => {
      const startAt = demoTiming.scan + i * demoTiming.fieldGap;
      const total = field.key.length + field.value.length;
      last = Math.max(last, startAt + total * demoTiming.typeTick);

      after(startAt, () => {
        const id = setInterval(() => {
          setTyped((prev) => {
            const next = [...prev];
            const n = (next[i] ?? 0) + demoTiming.typeChars;
            next[i] = Math.min(n, total);
            if (next[i] >= total) clearInterval(id);
            return next;
          });
        }, demoTiming.typeTick);
        intervals.current.push(id);
      });
    });

    after(last + 150, () => setSettled(true));
    after(Math.max(demoTiming.loop, last + demoTiming.rest), () =>
      setRunId((n) => n + 1),
    );

    return clearAll;
  }, [docIndex, runId, reduced, doc.fields, clearAll]);

  const selectDoc = (i: number) => {
    if (i === docIndex) return;
    setDocIndex(i);
    setRunId((n) => n + 1);
  };

  const revealed = (i: number) => (typed[i] ?? 0) > 0;

  return (
    <div className={cn("@container w-full", className)}>
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-rule px-3 py-2.5">
          <span
            className={cn(
              "size-[7px] shrink-0 rounded-full bg-marker",
              !reduced && "animate-[demo-pulse_2s_ease-in-out_infinite]",
            )}
            aria-hidden="true"
          />
          <span className="mono-label">Live — document extraction</span>
          <span className="mono-label ml-auto text-muted">{doc.name}</span>
        </div>

        {/* Panes sit side by side once the panel itself is wide enough —
            it is narrow in the hero column and wide on a phone, so this
            has to key off the container, not the viewport. */}
        <div className="grid grid-cols-1 @sm:grid-cols-2">
          <div className="relative min-h-[250px] overflow-hidden border-b border-rule p-3 @sm:min-h-[300px] @sm:border-b-0 @sm:border-r">
            {scanning && (
              <span
                className="absolute inset-x-0 top-0 z-10 h-0.5 bg-marker animate-[demo-scan_1200ms_linear_forwards]"
                aria-hidden="true"
              />
            )}
            <div
              className="text-[11px] leading-[1.55] text-ink-soft"
              aria-hidden="true"
            >
              {doc.body.map((block, i) => (
                <DocBlock key={i} block={block} doc={doc} revealed={revealed} />
              ))}
            </div>
          </div>

          <div className="flex min-h-[190px] flex-col p-3 @sm:min-h-[300px]">
            <pre
              className="mono flex-1 text-[11px] leading-[1.75] whitespace-pre-wrap break-words"
              aria-hidden="true"
            >
              <span className="text-muted">{"{"}</span>
              {"\n"}
              {doc.fields.map((field, i) => {
                const n = typed[i] ?? 0;
                if (n === 0) return null;
                const keyChars = Math.min(
                  field.key.length,
                  Math.ceil(n / FIELD_LEAD / 2),
                );
                const keyDone = n >= field.key.length;
                const valChars = keyDone ? n - field.key.length : 0;
                const complete = n >= field.key.length + field.value.length;
                const isLast = i === doc.fields.length - 1;

                return (
                  <span key={field.key}>
                    <span className="text-muted">
                      {"  \""}
                      {field.key.slice(0, keyDone ? undefined : keyChars)}
                      {keyDone ? "\"" : ""}
                    </span>
                    {keyDone && (
                      <>
                        <span className="text-muted">: </span>
                        <span className="text-ink">
                          {field.value.slice(0, valChars)}
                        </span>
                      </>
                    )}
                    {complete ? (
                      <span className="text-muted">{isLast ? "" : ","}</span>
                    ) : (
                      <span className="inline-block h-[11px] w-[6px] translate-y-px bg-depth align-baseline" />
                    )}
                    {"\n"}
                  </span>
                );
              })}
              {settled && <span className="text-muted">{"}"}</span>}
            </pre>

            <p
              className={cn(
                "mono-label mt-2.5 border-t border-rule pt-2 text-muted transition-opacity duration-300",
                settled ? "opacity-100" : "opacity-0",
              )}
            >
              {doc.fields.length} fields · 0.8s · sample data
            </p>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {doc.description}
      </p>

      <div
        className="mt-3.5 flex flex-wrap gap-2"
        role="group"
        aria-label="Choose a sample document"
      >
        {demoDocs.map((d, i) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={i === docIndex}
            onClick={() => selectDoc(i)}
            className={cn(
              "rounded-[var(--radius-btn)] px-3.5 py-1.5 text-[0.875rem]",
              "border transition-[color,border-color] duration-150",
              i === docIndex
                ? "border-ink text-ink"
                : "border-rule text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {d.name}
          </button>
        ))}
      </div>

      <p className="mono-label mt-3 text-muted">
        Demo runs on sample data. Want it on yours? Book a call.
      </p>
    </div>
  );
}

/* ---------- document rendering ---------- */

type Rendered = {
  doc: DemoDoc;
  revealed: (i: number) => boolean;
};

function DocLine({ line, doc, revealed }: Rendered & { line: Line }) {
  return (
    <span
      className={cn(
        line.label && "mono-label text-muted",
        line.strong && "font-medium text-ink",
        line.lead && "text-[13px] font-medium text-ink",
      )}
    >
      {line.segs.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <span
            key={i}
            className="marker marker-field font-medium text-ink"
            data-on={revealed(seg) ? "true" : "false"}
          >
            {stripQuotes(doc.fields[seg].value, seg, doc)}
          </span>
        ),
      )}
    </span>
  );
}

function DocBlock({ block, doc, revealed }: Rendered & { block: Block }) {
  if (block.t === "rule") {
    return <div className="my-2 border-t border-rule" />;
  }

  if (block.t === "line") {
    return (
      <div>
        <DocLine line={block.line} doc={doc} revealed={revealed} />
      </div>
    );
  }

  if (block.t === "row") {
    return (
      <div className="flex justify-between gap-3">
        <DocLine line={block.left} doc={doc} revealed={revealed} />
        <DocLine line={block.right} doc={doc} revealed={revealed} />
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-3">
      <div>
        {block.left.map((l, i) => (
          <div key={i}>
            <DocLine line={l} doc={doc} revealed={revealed} />
          </div>
        ))}
      </div>
      <div className="text-right">
        {block.right.map((l, i) => (
          <div key={i}>
            <DocLine line={l} doc={doc} revealed={revealed} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The JSON pane shows `"Kessler Verpakkingen BV"` with quotes; the document
 * itself should show the same value as it is printed on paper. This keeps one
 * source of truth for the value and formats it per pane.
 */
const printed: Record<string, Record<string, string>> = {
  invoice: {
    vat_number: "NL8412 96 573B01",
    invoice_date: "14-03-2026",
    due_date: "13-04-2026",
    total_eur: "€4.157,56",
  },
  cv: {
    location: "Kraków, Poland",
    years_experience: "2018 — 2026",
    skills: "Python · Go · PostgreSQL · Kubernetes",
  },
  shipping: {
    awb_number: "176-4482 9931",
    gross_weight_kg: "412,5 kg",
  },
};

function stripQuotes(value: string, index: number, doc: DemoDoc) {
  const key = doc.fields[index].key;
  const override = printed[doc.id]?.[key];
  if (override) return override;
  return value.replace(/^"|"$/g, "");
}