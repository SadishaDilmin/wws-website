"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useInView } from "motion/react";
import { ease } from "./motion";

type Step = { t: string; d: string; img: string; alt: string };

/**
 * Manufacturing steps with a sticky photo that changes as each step reaches the middle of the screen.
 * On small screens each step shows its own photo instead.
 */
export default function ProcessShowcase({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <ol className="space-y-4 lg:space-y-6">
        {steps.map((s, i) => (
          <StepItem key={s.t} step={s} index={i} active={active === i} setActive={setActive} />
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-deep">
            {steps.map((s, i) => (
              <m.div
                key={s.img}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
                transition={{ duration: 0.8, ease }}
                aria-hidden={active !== i}
              >
                <Image src={s.img} alt={s.alt} fill sizes="45vw" className="object-cover" />
              </m.div>
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-6 pt-20">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-light">
                Step {active + 1} of {steps.length}
              </p>
              <m.p key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mt-1 font-display text-2xl font-semibold text-white">
                {steps[active].t}
              </m.p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/20">
                <m.div className="h-full origin-left rounded-full bg-brand" animate={{ scaleX: (active + 1) / steps.length }} transition={{ duration: 0.6, ease }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepItem({ step, index, active, setActive }: { step: Step; index: number; active: boolean; setActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // "In view" only while the step crosses the middle band of the screen.
  const centred = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (centred) setActive(index); }, [centred, index, setActive]);

  return (
    <m.li
      ref={ref}
      data-reveal
      onMouseEnter={() => setActive(index)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease }}
      className={`rounded-2xl border p-6 transition-colors duration-500 lg:p-7 ${active ? "border-brand/40 bg-white shadow-[0_18px_40px_-24px_rgba(20,22,63,0.45)]" : "border-line bg-white/60"}`}
    >
      <div className="flex gap-5">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-lg font-bold text-white transition-colors duration-500 ${active ? "bg-brand" : "bg-navy"}`}>
          {index + 1}
        </span>
        <div>
          <h3 className="text-lg font-semibold">{step.t}</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.d}</p>
        </div>
      </div>
      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
        <Image src={step.img} alt={step.alt} fill sizes="100vw" className="object-cover" />
      </div>
    </m.li>
  );
}
