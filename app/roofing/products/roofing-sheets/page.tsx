import type { Metadata } from "next";
import Link from "next/link";
import ColourSelector from "@/components/ColourSelector";
import { CtaBanner } from "@/components/Section";
import { Stagger, StaggerItem, SplitWords, Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Roofing Sheets",
  description: "Zinc-aluminium coated hi-tensile roofing sheets in 10 colours. Preview every colour on a real WWS sheet.",
};

export default function RoofingSheets() {
  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="container-site">
          <Stagger trigger="mount" delay={0.1}>
            <StaggerItem as="div" variant="fade">
              <nav aria-label="Breadcrumb" className="mb-6 text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
                <Link href="/" className="hover:text-ink">WWS Group</Link> / <Link href="/roofing" className="hover:text-ink">Roofing</Link> / <span className="text-navy">Roofing Sheets</span>
              </nav>
            </StaggerItem>
            <StaggerItem as="p" className="eyebrow">REEGO by WWS Roofing Products</StaggerItem>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl"><SplitWords text="Zinc-aluminium roofing sheets" /></h1>
            <StaggerItem as="p" className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
              Hi-tensile steel roofing sheets with a zinc-aluminium coating, made at our Siyambalape factory. Pick a colour to see how your roof will look.
            </StaggerItem>
          </Stagger>
          <Reveal delay={0.35} className="mt-10"><ColourSelector /></Reveal>
        </div>
      </section>
      <CtaBanner company="roofing" />
    </>
  );
}
