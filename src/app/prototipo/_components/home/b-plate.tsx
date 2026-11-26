"use client";

/**
 * FE-07 — A placa Mercosul em 3D: inclina na direção do mouse, tem brilho
 * que acompanha o cursor e letras em relevo. A pessoa digita direto nela
 * (um campo invisível cobre a placa).
 */
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, useState } from "react";

import { Check } from "../icons";

export const PLATE = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

const MAX_TILT = 12;

function Flag() {
  return (
    <svg viewBox="0 0 20 14" className="h-[1.1em] w-auto" aria-hidden="true">
      <rect width="20" height="14" rx="1" fill="#009c3b" />
      <path d="M10 1.5 18.5 7 10 12.5 1.5 7Z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
    </svg>
  );
}

function MercosurMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.25em] w-auto" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {[
        [12, 6.5],
        [17.2, 11],
        [12, 17.5],
        [7.2, 12.5],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Um QR decorativo, como o das placas reais. */
function MiniQr() {
  const cells = [
    1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0,
  ];
  return (
    <svg viewBox="0 0 6 6" className="h-full w-full" aria-hidden="true">
      {cells.map((on, i) =>
        on ? <rect key={i} x={i % 6} y={Math.floor(i / 6)} width="1" height="1" fill="#0b1424" /> : null,
      )}
    </svg>
  );
}

export function MercosulPlate({
  id,
  value,
  onChange,
  loading,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  invalid: boolean;
  describedBy?: string;
}) {
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const rx = useSpring(0, { stiffness: 160, damping: 16 });
  const ry = useSpring(0, { stiffness: 160, damping: 16 });
  const gx = useMotionValue(28);
  const gy = useMotionValue(18);
  const sheen = useMotionTemplate`radial-gradient(90% 140% at ${gx}% ${gy}%, rgb(255 255 255 / 0.65), transparent 55%)`;
  const shade = useMotionTemplate`radial-gradient(120% 160% at calc(100% - ${gx}%) calc(100% - ${gy}%), rgb(11 20 36 / 0.16), transparent 60%)`;

  const valid = PLATE.test(value);
  const chars = value.padEnd(7, " ").split("");

  return (
    <div
      className="[perspective:1400px]"
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !plateRef.current) return;
        const rect = plateRef.current.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        ry.set((px - 0.5) * MAX_TILT * 2);
        rx.set(-(py - 0.5) * MAX_TILT * 2);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        gx.set(28);
        gy.set(18);
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        {/* Luz azul no chão, embaixo da placa. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] -bottom-12 left-[10%] h-16 rounded-[50%] bg-[rgb(77_141_255/0.4)] blur-3xl"
        />
        <div
          ref={plateRef}
          onClick={() => inputRef.current?.focus()}
          className={`plate @container relative cursor-text select-none shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)] transition-[outline-color] duration-300 ${
            focused ? "outline-4 outline-offset-4 outline-[rgb(77_141_255/0.8)]" : "outline-4 outline-offset-4 outline-transparent"
          }`}
          style={{ aspectRatio: "3.08 / 1", background: "linear-gradient(180deg, #ffffff 0%, #eef1f6 100%)" }}
        >
          <div className="plate-band flex h-[21%] items-center justify-between px-[3.2cqw] text-[3.1cqw] leading-none font-bold tracking-[0.24em]">
            <span className="flex items-center gap-[0.6em]">
              <MercosurMark />
              <span className="tracking-[0.1em]">BR</span>
            </span>
            <span className="pl-[0.24em]">BRASIL</span>
            <Flag />
          </div>

          <div
            className="plate-chars relative flex h-[79%] items-center justify-center gap-[0.08em] text-[13.2cqw] leading-none font-extrabold text-[#0b1424]"
            style={{ textShadow: "0 1px 0 #fff, 0 -1px 0 rgb(0 0 0 / 0.3), 0 0.035em 0.05em rgb(0 0 0 / 0.25)" }}
          >
            <span aria-hidden="true" className="absolute top-[14%] left-[2.8cqw] h-[5cqw] w-[5cqw] opacity-80">
              <MiniQr />
            </span>
            {chars.map((char, i) => (
              <span key={i} aria-hidden="true" className="relative inline-grid w-[0.74em] place-items-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${i}-${char}`}
                    initial={{ y: "40%", opacity: 0, scale: 0.5 }}
                    animate={{ y: "0%", opacity: char === " " ? 0.14 : 1, scale: 1 }}
                    exit={{ y: "-40%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 560, damping: 26 }}
                  >
                    {char === " " ? "·" : char}
                  </motion.span>
                </AnimatePresence>
                {focused && !loading && i === Math.min(value.length, 6) && value.length < 7 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute bottom-[0.02em] h-[0.06em] w-[0.62em] rounded-full bg-[var(--blue)]"
                  />
                )}
              </span>
            ))}
            {loading && (
              <span className="scan pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgb(77_141_255/0.45),transparent)]" />
            )}
          </div>

          {/* Brilho e sombra que seguem o mouse. */}
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: sheen }} />
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: shade }} />

          <input
            ref={inputRef}
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={8}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="absolute inset-0 h-full w-full cursor-text opacity-0"
          />
        </div>

        <AnimatePresence>
          {valid && (
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 480, damping: 16 }}
              style={{ z: 40 }}
              className="absolute -top-4 -right-4 grid h-12 w-12 place-items-center rounded-full bg-[#0f9d63] text-white shadow-[0_10px_24px_-8px_rgb(0_0_0/0.6)]"
            >
              <Check className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
