"use client";
import { useId, useState } from "react";
import { m } from "motion/react";
import { ease } from "./motion";

/** Accordion with smooth open/close. Answers stay in the HTML for search engines. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="divide-y divide-line rounded-2xl bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panel = `${base}-panel-${i}`;
        const button = `${base}-button-${i}`;
        return (
          <div key={f.q} className="p-6">
            <h3 className="font-sans">
              <button
                id={button}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left text-lg font-semibold transition-colors hover:text-brand"
              >
                {f.q}
                <m.span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-xl leading-none text-brand"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  +
                </m.span>
              </button>
            </h3>
            <m.div
              id={panel}
              role="region"
              aria-labelledby={button}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden"
            >
              <p className="pt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
