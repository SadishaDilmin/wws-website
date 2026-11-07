"use client";
import { ArrowUpIcon } from "./Icons";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
    >
      Back to top
      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 transition-[border-color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:border-white/60">
        <ArrowUpIcon />
      </span>
    </button>
  );
}
