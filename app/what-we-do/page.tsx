import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHeading, CtaBanner } from "@/components/Section";
import { ArrowIcon, CheckIcon, HomeIcon, FactoryIcon, BoltIcon } from "@/components/Icons";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "What We Do",
  description: "WWS manufactures zinc-aluminium roofing and cladding sheets, gutters and accessories, and installs them with its own trained team.",
};

const process = [
  { t: "Quality coil", d: "We start with hi-tensile steel coil coated in zinc-aluminium." },
  { t: "Roll forming", d: "The coil is formed into the sheet profile on our machines." },
  { t: "Cut to length", d: "Each sheet is cut to the exact length your roof needs." },
  { t: "Curving and crimping", d: "For arched roofs, sheets are curved and crimped to shape." },
  { t: "Check and deliver", d: "Every order is measured and checked before it leaves the factory." },
];

const quality = [
  "Zinc-aluminium coating for long-lasting rust protection",
  "Hi-tensile steel that is light but strong",
  "Made at our own factory in Siyambalape",
  "Fitted by our own trained installation team",
];

const uses = [
  { icon: HomeIcon, t: "Residential", d: "New homes, extensions and roof replacements." },
  { icon: BoltIcon, t: "Commercial", d: "Shops, offices, schools, canopies and walkways." },
  { icon: FactoryIcon, t: "Industrial", d: "Factories, warehouses and large-span buildings." },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero crumb="What We Do" title="Roofing solutions, from our factory to your finished roof" intro="We manufacture zinc-aluminium roofing and building products and install them with our own trained team." image="/images/process-forming.jpg" />

      {/* Intro */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow="Overview" title="Everything your roof needs, in one place" />
          <div className="space-y-5 text-[17px] leading-relaxed text-muted">
            <p>WWS Roofing Products makes roofing and cladding sheets at our factory in Siyambalape. Because we control the whole process, from forming and cutting to curving and crimping, we can supply exactly what each project needs.</p>
            <p>We also supply the gutters and accessories that complete a roof, and our trained team can install everything for you.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24 bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our products" title="Products and services we offer" intro="A complete range for residential, commercial and industrial projects." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article key={p.title} className="flex flex-col overflow-hidden rounded-2xl bg-white">
                {p.image ? (
                  <div className="relative aspect-[4/3]"><Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /></div>
                ) : (
                  <div className="grid aspect-[4/3] place-items-center bg-navy-soft text-sm font-medium text-navy/60">Photo coming soon</div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <Link href={p.slug ? `/products/${p.slug}` : `/contact?product=${encodeURIComponent(p.title)}`} className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                    {p.slug ? "See colours" : "Ask for a quote"} <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="How we make it" title="Our manufacturing process" intro="Five steps, all done at our own factory." />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <ol className="space-y-4">
              {process.map((s, i) => (
                <li key={s.t} className="flex gap-5 rounded-2xl border border-line p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/process-forming.jpg" alt="Feeding a sheet into the crimping machine" fill sizes="(min-width:1024px) 45vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/process-crimping.jpg" alt="WWS team guiding a sheet through the crimping machine" fill sizes="(min-width:1024px) 45vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-navy-deep py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading dark eyebrow="Quality" title="Made to handle Sri Lanka's weather" intro="Strong sun, heavy monsoon rain and humid air are hard on a roof. Our products are made with that in mind." />
          <ul className="grid gap-4 sm:grid-cols-2">
            {quality.map((q) => (
              <li key={q} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-[15px] leading-relaxed text-white/85">
                <span className="mt-0.5 text-[#FF8A8F]"><CheckIcon /></span>{q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Where it's used" title="Roofing for every kind of building" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {uses.map(({ icon: I, t, d }) => (
              <article key={t} className="rounded-2xl bg-mist p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white"><I /></span>
                <h3 className="mt-5 text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
