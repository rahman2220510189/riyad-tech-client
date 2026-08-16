"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { portal, type Order } from "@/lib/portal";
import { cn } from "@/lib/cn";

/**
 * Where each order has got to.
 *
 * The five steps are the real ones — ask, agree, invoice, pay, deliver — so
 * "invoiced" means an invoice is in your inbox and nothing is expected of us
 * until it is paid. A generic "in progress" would tell nobody anything.
 *
 * Orders are matched on email address, so a request made before signing up
 * still appears once an account exists with the same address.
 */

const steps = ["new", "accepted", "invoiced", "paid", "delivered"];

const explain: Record<string, string> = {
  new: "We have it. Expect a reply within one working day.",
  accepted: "Scope agreed. An invoice is on its way.",
  invoiced: "The invoice is with you. Work starts when the first transfer lands.",
  paid: "Payment received. We are building it now.",
  delivered: "Delivered, with the source code. Anything else, just write.",
  declined: "We decided this was not a good fit. Check your email for why.",
};

export function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    portal
      .orders()
      .then(({ orders }) => setOrders(orders))
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) {
    return <p className="mono-label text-muted">Loading…</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="card p-6 sm:p-8">
        <h2 className="h-card">Nothing here yet.</h2>
        <p className="measure mt-3 text-[0.9375rem] text-ink-soft">
          When you request one of our ready systems, it appears here with its
          status, so you always know what is happening without asking.
        </p>
        <Link
          href="/products"
          className="group mono-label mt-6 inline-flex items-center gap-1.5 border-b border-rule pb-1 text-ink transition-colors duration-150 hover:border-ink"
        >
          See what we sell
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-5">
      {orders.map((order) => {
        const current = steps.indexOf(order.status);
        const declined = order.status === "declined";

        return (
          <li key={order.id} className="card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <h2 className="h-card">{order.productTitle ?? "System"}</h2>
                <p className="mono-label mt-1.5 text-muted">
                  {order.createdAt.slice(0, 10)}
                  {order.productPrice ? ` · ${order.productPrice}` : ""}
                </p>
              </div>
              <span className="tag">{order.status}</span>
            </div>

            {!declined && (
              <ol className="mt-6 grid grid-cols-5 gap-1.5">
                {steps.map((step, i) => (
                  <li key={step}>
                    <span
                      className={cn(
                        "block h-1 rounded-full",
                        i <= current ? "bg-depth" : "bg-rule",
                      )}
                    />
                    <span
                      className={cn(
                        "mono-label mt-2 block text-[0.625rem]",
                        i <= current ? "text-ink" : "text-muted",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <p className="measure mt-6 border-t border-rule pt-4 text-[0.9375rem] text-ink-soft">
              {explain[order.status] ?? ""}
            </p>
          </li>
        );
      })}
    </ul>
  );
}