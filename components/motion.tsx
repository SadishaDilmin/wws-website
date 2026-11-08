"use client";
import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  LazyMotion, domMax, MotionConfig, m, animate, useInView, useReducedMotion, useScroll, useTransform, useSpring,
  type Variants,
} from "motion/react";

/*
 * Shared motion building blocks. Pages stay server components and wrap content in these.
 * - Respects "reduce motion": MotionConfig drops transform animations, and the hooks below skip parallax/count-up.
 * - Every animated element carries data-reveal so a <noscript> rule in the layout can show it without JavaScript.
 */

export const ease = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

type Tag = "div" | "section" | "article" | "aside" | "ul" | "ol" | "li" | "p" | "span" | "h1" | "h2" | "h3" | "dl" | "figure";

const variants: Record<"up" | "left" | "right" | "scale" | "fade", Variants> = {
  up: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } },
  left: { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } },
  right: { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.9, ease } } },
};
type VariantName = keyof typeof variants;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Fades/slides a single block in when it scrolls into view. */
export function Reveal({
  as = "div", variant = "up", delay = 0, className, children,
}: { as?: Tag; variant?: VariantName; delay?: number; className?: string; children: ReactNode }) {
  const Comp = m[as] as typeof m.div;
  const v = variants[variant];
  return (
    <Comp
      data-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: v.hidden, show: { ...(v.show as object), transition: { ...((v.show as { transition?: object }).transition), delay } } }}
    >
      {children}
    </Comp>
  );
}

/**
 * Parent that reveals its <StaggerItem> children one after another as it scrolls into view.
 * trigger="mount" is for heroes: it plays in pure CSS (.intro in globals.css) the moment the HTML paints,
 * so above-the-fold content never waits for JavaScript to download on a slow connection.
 */
export function Stagger({
  as = "div", className, children, stagger = 0.09, delay = 0, trigger = "view",
}: { as?: Tag; className?: string; children: ReactNode; stagger?: number; delay?: number; trigger?: "view" | "mount" }) {
  if (trigger === "mount") {
    return createElement(as, { className: `intro ${className ?? ""}`, style: { "--intro-delay": `${delay}s` } as CSSProperties }, children);
  }
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  as = "div", variant = "up", className, children,
}: { as?: Tag; variant?: VariantName; className?: string; children: ReactNode }) {
  const Comp = m[as] as typeof m.div;
  return <Comp data-reveal className={className} variants={variants[variant]}>{children}</Comp>;
}

/**
 * Headline whose words rise into place one by one (CSS: .split-word), for use inside a hero <Stagger trigger="mount">.
 * Words listed in `accent` take the brand colour and get a hand-drawn roofline stroke underneath (.accent-stroke).
 */
export function SplitWords({
  text, className, accent = [], accentClass = "text-brand-light",
}: { text: string; className?: string; accent?: string[]; accentClass?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        // A normal space between word boxes keeps the headline free to wrap on small screens.
        <span key={i}>
          <span className={`relative inline-block overflow-hidden align-bottom ${accent.includes(w) ? `pb-[0.22em] ${accentClass}` : "pb-[0.08em]"}`}>
            <span className="split-word" style={{ "--i": i } as CSSProperties}>{w}</span>
            {accent.includes(w) && (
              <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[0.2em] w-full overflow-visible">
                <path
                  d="M2 9 C 50 3, 120 2, 198 7" pathLength={1} className="accent-stroke"
                  fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** Photo frame that opens from the centre while the photo settles from a slight zoom. Parent must size it. */
export function ImageReveal({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  const t = { duration: 1.1, ease, delay };
  return (
    <m.div
      data-reveal
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: { clipPath: "inset(6% 6% 6% 6% round 12px)", opacity: 0 },
        show: { clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1, transition: t },
      }}
    >
      <m.div data-reveal className="absolute inset-0" variants={{ hidden: { scale: 1.1 }, show: { scale: 1, transition: { ...t, duration: 1.6 } } }}>
        {children}
      </m.div>
    </m.div>
  );
}

/** Full-bleed hero background: settles from a zoom on load, then drifts slower than the page while scrolling. */
export function ParallaxBg({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <m.div style={{ y }} className="absolute inset-0">
        <m.div
          data-reveal
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}

/** Number that counts up when it scrolls into view. Server HTML shows the final value. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const from = value >= 1000 ? value - 25 : 0; // years roll forward a little; small counts start from zero

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!inView) { el.textContent = `${from}${suffix}`; return; }
    const controls = animate(from, value, {
      duration: 1.6, ease,
      onUpdate: (v) => { el.textContent = `${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, reduce, from, value, suffix]);

  return <span ref={ref} className={`tabular-nums ${className ?? ""}`}>{value}{suffix}</span>;
}

/** Horizontal rule that draws itself from the left. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      data-reveal
      aria-hidden="true"
      className={`origin-left ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease, delay }}
    />
  );
}

/**
 * Types each phrase, holds, erases, and moves to the next, with a thin caret.
 * Server HTML (and reduced motion) shows the first phrase; screen readers get every phrase once.
 */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    let word = 0, chars = words[0].length, deleting = true, timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      let pause = deleting ? 32 : 70; // erase quickly, type at a calm pace
      if (deleting) {
        chars--;
        if (chars === 0) { deleting = false; word = (word + 1) % words.length; pause = 350; }
      } else {
        chars++;
        if (chars === words[word].length) { deleting = true; pause = 2400; } // hold the full phrase
      }
      setText(words[word].slice(0, chars));
      timer = setTimeout(tick, pause);
    };
    timer = setTimeout(tick, 2800); // let the first phrase be read before it changes
    return () => clearTimeout(timer);
  }, [reduce, words]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-[0.08em] inline-block h-[0.95em] w-[2px] translate-y-[0.12em] animate-caret bg-current" />
      </span>
    </span>
  );
}

/** Hairline at the very top of the window that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <m.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand" />;
}

/** Large outline roof chevrons, the WWS mark, that draw themselves in a hero. Purely decorative. */
export function RoofLines({ className }: { className?: string }) {
  const draw = (delay: number): Variants => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 2.2, ease, delay }, opacity: { duration: 0.4, delay } } },
  });
  return (
    <m.svg
      aria-hidden="true"
      viewBox="0 0 600 400"
      fill="none"
      className={className}
      initial="hidden"
      animate="show"
    >
      <m.path d="M20 330 300 90l280 240" stroke="#D42430" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" variants={draw(0.3)} />
      <m.path d="M110 380 300 216l190 164" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" variants={draw(0.6)} />
      <m.path d="M-60 300 300 -10l360 310" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" variants={draw(0.9)} />
    </m.svg>
  );
}
