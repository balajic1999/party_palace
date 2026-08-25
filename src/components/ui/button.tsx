import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "dark" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-250 ease-out-soft " +
  "disabled:pointer-events-none disabled:opacity-45 active:translate-y-px whitespace-nowrap";

const variants: Record<Variant, string> = {
  // coral-600, not the brighter coral-500: white on 500 is only 3.4:1, which
  // fails AA at button label sizes. Hover darkens rather than lightens for the
  // same reason. The lift is small — the coral is already loud at this size.
  primary:
    "bg-coral-600 text-white shadow-card hover:bg-coral-700 hover:shadow-lift hover:-translate-y-px",
  outline:
    "border border-line bg-white text-text hover:border-coral-500 hover:text-coral-700 hover:shadow-card",
  dark: "bg-plum-900 text-white hover:bg-plum-800 hover:shadow-lift hover:-translate-y-px",
  ghost: "text-text hover:bg-cream",
  // for use on the dark hero / footer
  onDark: "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-[50px] px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
