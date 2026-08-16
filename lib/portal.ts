/**
 * The customer portal's connection to riyad-api.
 *
 * Separate from lib/api.ts on purpose: that file runs on the server at build
 * time and knows nothing about sessions. This one runs in the browser, carries
 * a cookie, and never touches a page that needs to stay static.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class PortalError extends Error {
  status: number;
  fields?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    fields?: Record<string, string[]>,
  ) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(`${BASE}/api/v1${path}`, {
    method: options.method ?? "GET",
    /* Without this the session cookie is never sent and every call comes back
       401 with nothing to explain why. */
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new PortalError(
      response.status,
      (data as { error?: string }).error ?? "Something went wrong",
      (data as { fields?: Record<string, string[]> }).fields,
    );
  }

  return data as T;
}

export type Customer = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  country: string | null;
};

export type Order = {
  id: number;
  status: string;
  createdAt: string;
  productTitle: string | null;
  productSlug: string | null;
  productPrice: string | null;
  deliveryDays: number | null;
};

export type Thread = {
  id: number;
  subject: string;
  status: string;
  lastMessageAt: string;
  unreadForCustomer: boolean;
};

export type Message = {
  id: number;
  senderType: "customer" | "admin";
  senderName: string;
  body: string;
  createdAt: string;
};

export const portal = {
  register: (values: {
    name: string;
    email: string;
    password: string;
    company?: string;
    country?: string;
  }) =>
    request<{ customer: Customer }>("/account/register", {
      method: "POST",
      body: values,
    }),

  login: (email: string, password: string) =>
    request<{ customer: Customer }>("/account/login", {
      method: "POST",
      body: { email, password },
    }),

  logout: () => request<{ ok: true }>("/account/logout", { method: "POST" }),

  me: () => request<{ customer: Customer }>("/account/me"),

  orders: () => request<{ orders: Order[] }>("/account/orders"),

  unread: () => request<{ unread: number }>("/account/unread"),

  threads: () =>
    request<{ conversations: Thread[] }>("/account/conversations"),

  startThread: (subject: string, body: string) =>
    request<{ conversation: Thread }>("/account/conversations", {
      method: "POST",
      body: { subject, body },
    }),

  /* `since` returns only what arrived after a message id, so polling every ten
     seconds almost always comes back empty and costs nothing. */
  messages: (id: number, since = 0) =>
    request<{ conversation: Thread; messages: Message[] }>(
      `/account/conversations/${id}/messages?since=${since}`,
    ),

  send: (id: number, body: string) =>
    request<{ message: Message }>(`/account/conversations/${id}/messages`, {
      method: "POST",
      body: { body },
    }),
};