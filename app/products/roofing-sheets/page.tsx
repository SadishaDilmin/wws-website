import type { Metadata } from "next";
import Link from "next/link";
import ColourSelector from "@/components/ColourSelector";
import { CtaBanner } from "@/components/Section";

export const metadata: Metadata = {
  title: "Roofing Sheets",
  description: "Zinc-aluminium coated hi-tensile roofing sheets in 10 colours. Preview every colour on a real WWS sheet.",
};

export default function RoofingSheets() {
  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/what-we-do#products" className="hover:text-ink">Products</Link> / <span className="text-navy">Roofing Sheets</span>
          </nav>
          <p className="eyebrow">REEGO by WWS Roofing Products</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Zinc-aluminium roofing sheets</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Hi-tensile steel roofing sheets with a zinc-aluminium coating, made at our Siyambalape factory. Pick a colour to see how your roof will look.
          </p>
          <div className="mt-10"><ColourSelector /></div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
