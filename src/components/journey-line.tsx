import { journeySteps } from "@/data/brand";

/**
 * The six stages drawn as one continuous line.
 *
 * A progression, not another grid of numbered boxes — the section reads as
 * movement, which is the point the brand is making. Horizontal from `lg`,
 * vertical below it, using the same rule either way.
 */
export function JourneyLine() {
  return (
    <ol className="relative mt-14 sm:mt-20 lg:mt-24 lg:flex lg:items-start">
      {/* The line itself: down the left edge on small screens, across on wide */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[3px] top-2 w-px bg-border lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[3px] lg:h-px lg:w-full"
      />

      {journeySteps.map((step, index) => (
        <li
          key={step}
          className="group/step relative flex-1 pb-10 pl-8 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-8"
        >
          {/* Station mark on the line */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 block h-1.5 w-1.5 bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/step:scale-150 lg:left-0 lg:top-0"
          />
          <p className="tnum text-eyebrow font-medium tracking-[0.18em] text-foreground-subtle">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="mt-3 max-w-[14ch] font-display text-lg font-medium leading-snug tracking-tight text-foreground sm:text-xl lg:text-[1.35rem]">
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}
