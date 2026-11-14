"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

export type HeroSlide = { src: string; label: string; position?: string };

const INTERVAL = 6500; // ms each photo stays up

/**
 * Homepage hero background: full-strength photos that cross-fade, each drifting in very slowly.
 * Renders the photos, the text scrim (.hero-scrim) and the small slide controls at the foot of the hero.
 * - The first photo is in the server HTML, so the hero paints without JavaScript; the rest load after mount.
 * - Auto-advance stops for "reduce motion" and while the tab is hidden; the controls always work.
 */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const auto = mounted && !reduce && !paused && slides.length > 1;
  useEffect(() => {
    if (!auto) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [auto, index, slides.length]);

  return (
    <>
      <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <m.div style={{ y }} className="absolute inset-0">
          {slides.map((s, i) =>
            i === 0 || mounted ? (
              <div key={s.src} className={`hero-slide ${i === index ? "is-active" : ""} ${mounted && !reduce ? "is-moving" : ""}`}>
                <Image src={s.src} alt="" fill priority={i === 0} sizes="100vw" quality={90} className={`object-cover ${s.position ?? "object-center"}`} />
              </div>
            ) : null,
          )}
        </m.div>
        <div className="hero-scrim" />
      </div>

      {slides.length > 1 && (
        <div className="container-site pointer-events-none absolute inset-x-0 bottom-7 flex items-center gap-5 sm:bottom-9">
          <p className="min-w-0 truncate text-[13px] font-medium tracking-wide text-white/80" aria-live="off">
            <span className="tabular-nums text-white">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-white/45"> / {String(slides.length).padStart(2, "0")}</span>
            <span className="mx-3 hidden text-white/35 sm:inline" aria-hidden="true">|</span>
            <span key={index} className="hero-caption max-sm:!hidden">{slides[index].label}</span>
          </p>
          <div className="pointer-events-auto ml-auto flex shrink-0 items-center" role="group" aria-label="Hero photos">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${slides.length}: ${s.label}`}
                aria-current={i === index ? "true" : undefined}
                className="group px-1 py-3 focus-visible:outline-white"
              >
                <span className="relative block h-[2px] w-7 overflow-hidden bg-white/30 transition-colors duration-300 group-hover:bg-white/60 sm:w-10">
                  {i === index && (
                    <span
                      key={`${index}-${auto}`}
                      className={`absolute inset-0 origin-left bg-white ${auto ? "hero-progress" : ""}`}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
