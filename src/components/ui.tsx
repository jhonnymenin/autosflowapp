import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ArrowRight } from "@/components/icons";

/* -------------------------------------------------------------------------
   Eyebrow

   Letterspaced caps only. The rule-and-label combination reads as a template
   tic when it repeats on every section, so the label carries it alone.
   ---------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`text-eyebrow font-medium uppercase ${
        tone === "dark" ? "text-brand-bright" : "text-brand"
      } ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
   Buttons

   Square. Automotive brands set their calls to action as precise rectangles;
   the pill shape is what makes an interface read as a SaaS product.
   ---------------------------------------------------------------------- */

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-3 text-sm font-medium tracking-tight transition-colors duration-300 disabled:opacity-50";

const sizes = {
  md: "h-11 px-6",
  lg: "h-12 px-7 sm:h-14 sm:px-9 sm:text-[0.95rem]",
} as const;

const variants = {
  primary: "bg-brand text-white hover:bg-brand-bright",
  invert: "bg-foreground text-ink-950 hover:bg-white",
  outline:
    "border border-border-strong text-foreground hover:border-foreground hover:bg-foreground hover:text-ink-950",
  outlineLight:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-bone-50",
} as const;

type ButtonLinkProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  withArrow?: boolean;
} & ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonBase} ${sizes[size]} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      ) : null}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & ComponentProps<"a">) {
  return (
    <a
      className={`${buttonBase} ${sizes[size]} ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------
   Section heading
   ---------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "start",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "start" | "between";
  className?: string;
}) {
  return (
    <div
      className={`${
        align === "between"
          ? "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          : "max-w-3xl"
      } ${className ?? ""}`}
    >
      <div className={align === "between" ? "max-w-2xl" : undefined}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={`mt-6 text-display-md font-semibold ${
            tone === "dark" ? "text-foreground" : "text-navy"
          }`}
        >
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className={`text-lead max-w-xl ${
            align === "between" ? "lg:pb-2" : "mt-6"
          } ${tone === "dark" ? "text-foreground-muted" : "text-navy/70"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
