"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * A short confirmation, bottom of the screen, gone in four seconds.
 *
 * It exists because a form that empties itself and does nothing else leaves a
 * real doubt: did that send? The doubt is worse than the wait — people send
 * the same message twice to be sure.
 *
 * Announced politely to screen readers, and it never blocks anything: no
 * overlay, no dismiss button to hunt for, no shifting layout.
 */
type Toast = { id: number; text: string };

const ToastContext = createContext<((text: string) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((previous) => [...previous, { id, text }]);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDone={() =>
              setToasts((previous) =>
                previous.filter((item) => item.id !== toast.id),
              )
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDone }: { toast: Toast; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <p className="load-in load-in-1 rounded-[var(--radius-card)] border border-ink bg-ink px-4 py-2.5 text-[0.9375rem] text-paper shadow-[var(--shadow-lift)]">
      {toast.text}
    </p>
  );
}

/** Returns a no-op outside a provider, so a component can call it freely. */
export function useToast() {
  return useContext(ToastContext) ?? (() => undefined);
}