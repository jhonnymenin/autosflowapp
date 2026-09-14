import Image from "next/image";

import { brand } from "@/data/brand";

/**
 * The AutosFlow symbol, redrawn as a vector from the brand sheet so it stays
 * sharp at any size and inherits the surrounding colour.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="4 3 224 128"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M75.6 10 A7 7 0 0 1 82.6 3 L149.4 3 A7 7 0 0 1 156.4 10 L173.7 35.4 A5 5 0 0 1 169.6 39.5 L62.4 39.5 A5 5 0 0 1 58.3 35.4 Z" />
      <path d="M36 66 A17.5 17.5 0 1 0 26 92.7 C32 94.6 48 96.4 58.4 102.7 L72.1 126.4 A9 9 0 0 0 80 131 L152 131 A9 9 0 0 0 159.9 126.4 L173.6 102.7 C184 96.4 198 95.6 206 92.7 A17.5 17.5 0 1 0 196 66 C191 76.5 184.5 88 171 94.5 L61 94.5 C47.5 88 41 76.5 36 66 Z" />
    </svg>
  );
}

/**
 * Full lockup: symbol plus the original wordmark artwork.
 * `tone` picks the artwork drawn for light or dark surfaces.
 */
export function Logo({
  tone = "dark",
  className,
  markClassName = "h-6 w-auto sm:h-7",
  wordmarkClassName = "h-[1.05rem] w-auto sm:h-5",
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  priority?: boolean;
}) {
  const onDark = tone === "dark";
  return (
    <span className={`flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}>
      <Mark
        className={`${markClassName} ${onDark ? "text-brand-bright" : "text-brand"}`}
      />
      <Image
        src={
          onDark
            ? "/brand/autosflow-wordmark-inverse.png"
            : "/brand/autosflow-wordmark.png"
        }
        alt={brand.name}
        width={632}
        height={106}
        priority={priority}
        sizes="180px"
        className={wordmarkClassName}
      />
    </span>
  );
}
