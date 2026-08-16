/** Minimal class joiner. No clsx dependency — the bundle stays small. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}