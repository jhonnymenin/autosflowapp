"use client";

/**
 * Peças de movimento do protótipo, todas com Motion (motion.dev).
 * O `MotionConfig reducedMotion="user"` do shell tira o deslocamento de quem
 * pediu menos movimento; o conteúdo continua aparecendo.
 */
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Um bloco que sobe e aparece quando entra na tela. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "h2" | "h3";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Contêiner que escalona a entrada dos filhos `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function RevealItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}

/** Título que entra palavra por palavra, de baixo para cima, com máscara. */
export function WordReveal({
  text,
  className,
  delay = 0,
  as = "h2",
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  inView?: boolean;
}) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
        : { animate: "show" })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-top"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Número que conta até o valor quando aparece. */
export function CountUp({
  to,
  format = (n) => Math.round(n).toLocaleString("pt-BR"),
  duration = 1.6,
  className,
}: {
  to: number;
  format?: (value: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(format(to));
  // A função de formato muda a cada render; guardada num ref, não reinicia a animação.
  const formatRef = useRef(format);
  useEffect(() => {
    formatRef.current = format;
  });

  useEffect(() => {
    if (!seen || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease,
      onUpdate: (latest) => setValue(formatRef.current(latest)),
    });
    return () => controls.stop();
  }, [seen, reduce, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {value}
    </span>
  );
}

/** Botão/link que é atraído pelo cursor (só com mouse). */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
