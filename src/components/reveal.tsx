import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Fades content in as it scrolls into view.
 *
 * Implemented with a scroll-driven CSS animation rather than an observer, so
 * this stays a server component and ships no JavaScript. Browsers without
 * `animation-timeline` simply render the content in place, as does anyone who
 * asked for reduced motion.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  /** Nudges the reveal later in the scroll range, for staggered groups. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      style={
        delay
          ? ({ "--reveal-offset": `${Math.min(delay, 240) / 20}%` } as CSSProperties)
          : undefined
      }
      className={["reveal", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}
