"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { sheetColours } from "@/lib/site";
import { ArrowIcon } from "./Icons";

const W = 720, H = 960, MID_LUMINANCE = 128.7;

/**
 * Recolours the real WWS sheet photo in the browser.
 * colour-mask.png marks which pixels belong to the sheet; only those are repainted,
 * keeping the photo's original light and shade.
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
        const v = r <= 1 ? c[k] * r : c[k] + (255 - c[k]) * Math.min(1, (r - 1) / 0.9);
        o[j + k] = d.src[j + k] * (1 - m) + v * m;
      }
      o[j + 3] = 255;
    }
    ctx.putImageData(d.out, 0, 0);
  }, []);

  useEffect(() => {
    const load = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    let cancelled = false;
    Promise.all([load("/images/colour-base.jpg"), load("/images/colour-mask.png")]).then(([base, mask]) => {
      if (cancelled || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(base, 0, 0, W, H);
      const src = ctx.getImageData(0, 0, W, H).data;
      const t = document.createElement("canvas"); t.width = W; t.height = H;
      const tc = t.getContext("2d")!; tc.drawImage(mask, 0, 0, W, H);
      const md = tc.getImageData(0, 0, W, H).data;
      const n = W * H, ratio = new Float32Array(n), m = new Float32Array(n);
      for (let i = 0; i < n; i++) { const j = i * 4; ratio[i] = (0.299 * src[j] + 0.587 * src[j + 1] + 0.114 * src[j + 2]) / MID_LUMINANCE; m[i] = md[j] / 255; }
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
        <div className="relative overflow-hidden rounded-2xl bg-mist">
          <canvas ref={canvasRef} width={W} height={H} role="img" aria-label={`WWS roofing sheet in ${colour.name}`} className="block aspect-[3/4] h-auto w-full" />
          {!ready && <div className="absolute inset-0 grid place-items-center text-sm text-muted">Loading preview…</div>}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold shadow" aria-live="polite">
            <span className="h-6 w-6 rounded-full ring-1 ring-black/10" style={{ background: colour.hex }} />
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
          <span className="font-display text-2xl font-bold">{colour.name}</span>
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
                <span
                  className={`block aspect-square w-full max-w-[64px] rounded-xl ring-1 ring-black/10 transition-transform group-hover:-translate-y-0.5 ${selected ? "outline outline-[3px] outline-offset-[3px] outline-brand" : ""}`}
                  style={{ background: bg }}
                />
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
          <Link href={`/contact?product=${encodeURIComponent("Roofing Sheets")}&colour=${encodeURIComponent(colour.name)}`} className="btn-primary">
            Get a quote in {colour.name} <ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
