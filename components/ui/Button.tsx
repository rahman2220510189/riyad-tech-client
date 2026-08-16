import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onDepth";
type Size = "md" | "sm";

const base = [
  "inline-flex items-center justify-center gap-2",
  "font-sans text-[0.9375rem] font-medium leading-none",
  "rounded-[var(--radius-btn)] border",
  "whitespace-nowrap select-none",
  // §3.5 — colour and border only. No scaling, no lifting.
  "transition-[color,background-color,border-color] duration-150 ease-out",
].join(" ");

const sizes: Record<Size, string> = {
  md: "h-12 px-6",
  sm: "h-9 px-4 text-[0.875rem]",
};

const variants: Record<Variant, string> = {
  // Solid --depth with --paper text (§3.2)
  primary: "bg-depth text-paper border-depth hover:bg-ink hover:border-ink",
  // Quiet counterpart: hairline rule that firms up on hover
  secondary: "bg-transparent text-ink border-rule hover:border-ink",
  // For use inside the one dark band
  onDepth: "bg-paper text-depth border-paper hover:bg-marker hover:border-marker",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type ?? "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}