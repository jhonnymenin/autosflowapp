import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ArrowRight } from "@/components/icons";

/* -------------------------------------------------------------------------
   Eyebrow — rótulo curto acima do título, no azul de acento.
   ---------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-eyebrow font-semibold uppercase text-accent ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------
   Botões

   Altura mínima de 48 px no celular (área de toque), cantos levemente
   arredondados e um único azul para a ação principal — o azul orienta a
   ação, não pinta a interface inteira.
   ---------------------------------------------------------------------- */

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-control text-sm font-semibold tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.98] disabled:opacity-50";

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6 sm:h-13 sm:px-7",
} as const;

const variants = {
  primary:
    "bg-brand text-white shadow-[0_8px_20px_-8px_rgb(20_96_242/0.6)] hover:bg-brand-deep",
  solid: "bg-foreground text-background hover:bg-foreground/85",
  outline:
    "border border-border-strong bg-surface text-foreground hover:border-foreground",
  ghost: "text-foreground hover:bg-foreground/5",
  onDark:
    "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink-900",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: keyof typeof sizes = "md",
  className = "",
) {
  return `${buttonBase} ${sizes[size]} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = {
  variant?: ButtonVariant;
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
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      {withArrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
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
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
} & ComponentProps<"a">) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

/** Link de texto com seta — “ver todos”, “conhecer”. */
export function ArrowLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group/link inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-accent ${className ?? ""}`}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </Link>
  );
}

/* -------------------------------------------------------------------------
   Cabeçalho de seção
   ---------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Link à direita do título (desktop) ou abaixo dele (celular). */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 ${className ?? ""}`}
    >
      <div className="max-w-3xl">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2
          id={id}
          className={`text-display-md font-semibold text-foreground ${eyebrow ? "mt-3" : ""}`}
        >
          {title}
        </h2>
        {lead ? (
          <p className="text-lead mt-4 text-foreground-muted">{lead}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 sm:pb-1.5">{action}</div> : null}
    </div>
  );
}

/** Pílula de informação — selo real e verificável, nunca decorativo. */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "dark";
  className?: string;
}) {
  const tones = {
    neutral: "bg-surface-raised text-foreground-muted",
    brand: "bg-brand/10 text-accent",
    dark: "bg-ink-900/80 text-white backdrop-blur-md",
  } as const;
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[0.6875rem] font-semibold tracking-tight ${tones[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
