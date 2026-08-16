import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The link that takes a home page section to its full page.
 *
 * The arrow moves 4px on hover, the same distance as the Work cards. Repeating
 * one gesture across the site is what makes it feel built rather than assembled.
 */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group mono-label inline-flex items-center gap-1.5 border-b border-rule pb-1 text-ink",
        "transition-colors duration-150 hover:border-ink",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-150 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}