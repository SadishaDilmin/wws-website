"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "motion/react";
import { ease } from "./motion";
import { sheetColours } from "@/lib/site";
import { ArrowIcon } from "./Icons";

// Canvas size matches the 4:3 studio photo (public/images/colour-base.jpg, 1200x900).
const W = 960, H = 720;

/**
 * Recolours the real WWS sheet photo in the browser.
 * The sheet was cut out of the factory photo and placed on a clean studio background.
 * colour-mask.png marks exactly which pixels belong to the sheet; only those are repainted,
 * keeping the photo's own light and shade. The same maths makes the static tiles in /images/colours.
 */
export default function ColourSelector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<{ src: Uint8ClampedArray; ratio: Float32Array; mask: Float32Array; out: ImageData } | null>(null);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const colour = sheetColours[index];

  const paint = useCallback((hex: string) => {
    const ctx = canvasRef.current?.getContext("2d");
    const d = data.current;
    if (!ctx || !d) return;
    const c = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16));
    const o = d.out.data;
    for (let i = 0; i < d.ratio.length; i++) {
      const j = i * 4, r = d.ratio[i], m = d.mask[i];
      for (let k = 0; k < 3; k++) {
        // Shadows darken the colour; highlights lift it towards white as a soft sheen, never a white patch.
        const v = r <= 1 ? c[k] * r : c[k] + (255 - c[k]) * Math.min(1, (r - 1) / 1.4) * 0.8;
        o[j + k] = d.src[j + k] * (1 - m) + v * m;
      }
      o[j + 3] = 255;
    }
    ctx.putImageData(d.out, 0, 0);
  }, []);

  useEffect(() => {
    const load = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    let cancelled = false;
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    Promise.all([load(`${prefix}/images/colour-base.jpg`), load(`${prefix}/images/colour-mask.png`)]).then(([base, mask]) => {
      if (cancelled || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(base, 0, 0, W, H);
      const src = ctx.getImageData(0, 0, W, H).data;
      const t = document.createElement("canvas"); t.width = W; t.height = H;
      const tc = t.getContext("2d")!; tc.drawImage(mask, 0, 0, W, H);
      const md = tc.getImageData(0, 0, W, H).data;
      const n = W * H, ratio = new Float32Array(n), m = new Float32Array(n);
      // Reference brightness = the sheet's own average, so each colour lands on its mid-tone.
      let sum = 0, weight = 0;
      for (let i = 0; i < n; i++) {
        const j = i * 4;
        ratio[i] = 0.299 * src[j] + 0.587 * src[j + 1] + 0.114 * src[j + 2];
        m[i] = md[j] / 255;
        sum += ratio[i] * m[i]; weight += m[i];
      }
      const mid = sum / Math.max(1, weight);
      for (let i = 0; i < n; i++) ratio[i] /= mid;
      data.current = { src, ratio, mask: m, out: ctx.createImageData(W, H) };
      setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { if (ready) paint(colour.hex); }, [ready, colour.hex, paint]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = sheetColours.length;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next !== null) { e.preventDefault(); setIndex(next); document.getElementById(`colour-${next}`)?.focus(); }
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        <div className="relative overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
          <canvas ref={canvasRef} width={W} height={H} role="img" aria-label={`WWS roofing sheet in ${colour.name}`} className="block aspect-[4/3] h-auto w-full" />
          {!ready && <div className="absolute inset-0 grid place-items-center text-sm text-muted">Loading preview…</div>}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold shadow" aria-live="polite">
            <m.span key={colour.hex} initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 22 }} className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: colour.hex }} />
            {colour.name}
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">
          Photo of a WWS sheet from our factory, recoloured on screen. Colours on screen can differ slightly from the real sheet, so please check our physical colour card before ordering.
        </p>
      </div>

      <div>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="colour-label" className="font-sans text-base font-semibold">Choose a colour</h2>
          <span className="relative block overflow-hidden font-display text-2xl font-bold">
            <AnimatePresence mode="wait" initial={false}>
              <m.span key={colour.name} className="block" initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.25, ease }}>
                {colour.name}
              </m.span>
            </AnimatePresence>
          </span>
        </div>
        <div role="radiogroup" aria-labelledby="colour-label" className="grid grid-cols-5 gap-x-2 gap-y-5 sm:gap-x-3">
          {sheetColours.map((c, i) => {
            const selected = i === index;
            const bg = "metallic" in c && c.metallic
              ? `linear-gradient(135deg, ${c.hex}, color-mix(in srgb, ${c.hex} 65%, #fff) 50%, ${c.hex})`
              : c.hex;
            return (
              <button
                key={c.name}
                id={`colour-${i}`}
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="relative block aspect-square w-full max-w-[64px]">
                  {selected && (
                    <m.span layoutId="swatch-ring" aria-hidden="true" className="absolute -inset-[6px] rounded-[16px] border-[3px] border-brand" transition={{ type: "spring", stiffness: 420, damping: 32 }} />
                  )}
                  <m.span
                    className="absolute inset-0 rounded-xl ring-1 ring-black/10"
                    style={{ background: bg }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: selected ? 1.04 : 1 }}
                    transition={{ duration: 0.25, ease }}
                  />
                </span>
                <span className={`text-xs leading-tight ${selected ? "font-semibold text-ink" : "text-muted"}`}>{c.name}</span>
              </button>
            );
          })}
        </div>

        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-6 text-[15px]">
          <dt className="text-muted">Material</dt><dd className="font-medium">Hi-tensile steel</dd>
          <dt className="text-muted">Coating</dt><dd className="font-medium">Zinc-aluminium</dd>
          <dt className="text-muted">Profiles</dt><dd className="font-medium">Straight and curved / crimped</dd>
          <dt className="text-muted">Colours</dt><dd className="font-medium">{sheetColours.length} standard colours</dd>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact?company=roofing&product=${encodeURIComponent("Roofing Sheets")}&colour=${encodeURIComponent(colour.name)}`} className="btn-primary">
            Get a quote in {colour.name} <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
