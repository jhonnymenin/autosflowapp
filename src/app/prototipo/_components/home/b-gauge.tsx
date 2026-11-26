"use client";

/**
 * FE-07 — Velocímetro de valor: o ponteiro varre o mostrador (de R$ 30 mil
 * a R$ 170 mil) até o meio da estimativa, e o trecho [mínimo, máximo] acende
 * em amarelo.
 */
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import { ease } from "../motion";

const G = { cx: 200, cy: 200, r: 158, min: 30000, max: 170000, start: 150, sweep: 240 };

const angleOf = (v: number) =>
  G.start + ((Math.min(Math.max(v, G.min), G.max) - G.min) / (G.max - G.min)) * G.sweep;

function point(deg: number, r: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [G.cx + r * Math.cos(rad), G.cy + r * Math.sin(rad)];
}

function arc(a0: number, a1: number, r: number): string {
  const [x0, y0] = point(a0, r);
  const [x1, y1] = point(a1, r);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)}`;
}

const ticks = Array.from({ length: 15 }, (_, i) => G.min + i * 10000);

export function ValueGauge({ range }: { range: [number, number] }) {
  const reduce = useReducedMotion();
  const mid = (range[0] + range[1]) / 2;
  const angle = useSpring(G.start, { stiffness: 50, damping: 8, mass: 1.1 });

  useEffect(() => {
    const timer = window.setTimeout(() => angle.set(angleOf(mid)), reduce ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [angle, mid, reduce]);

  const rad = useTransform(angle, (a) => (a * Math.PI) / 180);
  const tipX = useTransform(rad, (r) => G.cx + 132 * Math.cos(r));
  const tipY = useTransform(rad, (r) => G.cy + 132 * Math.sin(r));
  const tailX = useTransform(rad, (r) => G.cx - 26 * Math.cos(r));
  const tailY = useTransform(rad, (r) => G.cy - 26 * Math.sin(r));

  return (
    <svg
      viewBox="0 24 400 276"
      role="img"
      aria-label={`Velocímetro de valor: de R$ ${range[0] / 1000} mil a R$ ${range[1] / 1000} mil`}
      className="w-full overflow-visible"
    >
      {/* Mostrador */}
      <path d={arc(G.start, G.start + G.sweep, G.r)} stroke="rgb(255 255 255 / 0.1)" strokeWidth="14" fill="none" strokeLinecap="round" />
      <motion.path
        d={arc(angleOf(range[0]), angleOf(range[1]), G.r)}
        stroke="var(--signal)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease }}
      />

      {ticks.map((v) => {
        const a = angleOf(v);
        const major = (v - G.min) % 20000 === 0;
        const [x0, y0] = point(a, G.r - 18);
        const [x1, y1] = point(a, G.r - (major ? 38 : 28));
        const [lx, ly] = point(a, G.r - 58);
        return (
          <g key={v}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={major ? "rgb(255 255 255 / 0.85)" : "rgb(255 255 255 / 0.35)"} strokeWidth={major ? 3 : 2} strokeLinecap="round" />
            {major && (
              <text x={lx} y={ly} fill="rgb(255 255 255 / 0.7)" fontSize="15" fontWeight="600" textAnchor="middle" dominantBaseline="middle">
                {v / 1000}
              </text>
            )}
          </g>
        );
      })}

      <text x={G.cx} y={G.cy - 54} fill="rgb(255 255 255 / 0.45)" fontSize="12" fontWeight="600" letterSpacing="2" textAnchor="middle">
        R$ MIL
      </text>

      {/* Ponteiro */}
      <motion.line x1={tailX} y1={tailY} x2={tipX} y2={tipY} stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <circle cx={G.cx} cy={G.cy} r="15" fill="#ffffff" />
      <circle cx={G.cx} cy={G.cy} r="6" fill="var(--blue)" />
    </svg>
  );
}
