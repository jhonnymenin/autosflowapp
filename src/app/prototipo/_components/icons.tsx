/**
 * Ícones do protótipo (traço 1.6, cantos redondos), no mesmo desenho dos
 * ícones do site. Reexporta os que o site já tem.
 */
import type { ServiceIcon } from "../_data/services";

export {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Close,
  MapPin,
  Phone,
  Search,
  Shield,
  WhatsApp,
} from "@/components/icons";

type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export function Sparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
      <path d="M19 15.5c.25 1.5 1 2.25 2.5 2.5-1.5.25-2.25 1-2.5 2.5-.25-1.5-1-2.25-2.5-2.5 1.5-.25 2.25-1 2.5-2.5Z" />
    </svg>
  );
}

export function Heart({ className, filled }: P & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

export function ArrowDownRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 7l10 10M17 8v9H8" />
    </svg>
  );
}

export function Clock({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Menu({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function Pause({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 6v12M15 6v12" />
    </svg>
  );
}

export function Play({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

export function ChevronLeft({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function Store({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 10v9h16v-9M3 6l1.5-3h15L21 6v1.5a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 7.5V6Z" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function Users({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 19.5c.8-3.3 3.3-5 6.5-5s5.7 1.7 6.5 5" />
      <path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.8.6 3 2.2 3.5 4.7" />
    </svg>
  );
}

export function Car({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 15.5V12l2-5h12l2 5v3.5" />
      <path d="M3 15.5h18v2.5h-3v-2.5M3 15.5V18h3v-2.5" />
      <path d="M4 12h16" />
      <circle cx="7.5" cy="14" r=".5" />
      <circle cx="16.5" cy="14" r=".5" />
    </svg>
  );
}

/* ---- Categorias de serviço (FE-03) ------------------------------------ */

function Wrench({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M14.5 6.5a4 4 0 0 1 5.2-1.7l-2.7 2.7.5 2 2 .5 2.7-2.7a4 4 0 0 1-5.6 4.9L9.4 19.4a2 2 0 0 1-2.8-2.8l7.1-7.2a4 4 0 0 1 .8-2.9Z" />
    </svg>
  );
}

function Doc({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5" />
    </svg>
  );
}

function Drop({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" />
      <path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5" />
    </svg>
  );
}

function CheckList({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6v3H9zM8.5 12.5l2 2 4-4.5" />
    </svg>
  );
}

function Oil({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 10h9l3-2 4 1-4 6H6a2 2 0 0 1-2-2v-3Z" />
      <path d="M7 10V7.5h3V10M20 13.5s1 1.4 1 2.2a1 1 0 0 1-2 0c0-.8 1-2.2 1-2.2Z" />
    </svg>
  );
}

function ShieldCar({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

export function PartnerPlus({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const serviceIcons: Record<ServiceIcon, (props: P) => React.ReactElement> = {
  wrench: Wrench,
  doc: Doc,
  drop: Drop,
  check: CheckList,
  oil: Oil,
  shield: ShieldCar,
};

export function ServiceGlyph({ icon, className }: { icon: ServiceIcon; className?: string }) {
  const Icon = serviceIcons[icon];
  return <Icon className={className} />;
}
