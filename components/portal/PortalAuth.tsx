"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { portal, type Customer } from "@/lib/portal";

/**
 * Who is signed in, for the whole portal.
 *
 * The session lives in an httpOnly cookie that JavaScript cannot read, so the
 * only way to know is to ask the server once on load.
 */
type State = {
  customer: Customer | null;
  checking: boolean;
  /** Threads with something the customer has not read */
  unread: number;
  refreshUnread: () => void;
  setCustomer: (customer: Customer | null) => void;
  signOut: () => Promise<void>;
};

const PortalAuthContext = createContext<State | null>(null);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [checking, setChecking] = useState(true);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    portal
      .me()
      .then(({ customer }) => setCustomer(customer))
      .catch(() => setCustomer(null))
      .finally(() => setChecking(false));
  }, []);

  const refreshUnread = useCallback(() => {
    portal
      .unread()
      .then(({ unread }) => setUnread(unread))
      .catch(() => undefined);
  }, []);

  /* Polled while signed in, so a reply is noticed even from another tab of
     the portal. Fifteen seconds is slow enough to be free and fast enough
     that nobody notices the delay. */
  useEffect(() => {
    if (!customer) {
      setUnread(0);
      return;
    }

    refreshUnread();
    const timer = setInterval(refreshUnread, 15_000);
    return () => clearInterval(timer);
  }, [customer, refreshUnread]);

  /* The tab title carries the count too, so it is visible from another tab
     entirely — the one place a badge inside the page cannot reach. */
  useEffect(() => {
    const base = "Your account — Riyad Tech";
    document.title = unread > 0 ? `(${unread}) ${base}` : base;
    return () => {
      document.title = base;
    };
  }, [unread]);

  const signOut = useCallback(async () => {
    await portal.logout().catch(() => undefined);
    setCustomer(null);
  }, []);

  const value = useMemo(
    () => ({ customer, checking, unread, refreshUnread, setCustomer, signOut }),
    [customer, checking, unread, refreshUnread, signOut],
  );

  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth() {
  const context = useContext(PortalAuthContext);
  if (!context) {
    throw new Error("usePortalAuth must be used inside PortalAuthProvider");
  }
  return context;
}