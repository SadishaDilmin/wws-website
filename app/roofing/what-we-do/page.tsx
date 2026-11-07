import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHeading, CtaBanner } from "@/components/Section";
import { ArrowIcon, CheckIcon, HomeIcon, FactoryIcon, BoltIcon } from "@/components/Icons";
import { Stagger, StaggerItem } from "@/components/motion";
import ProcessShowcase from "@/components/ProcessShowcase";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "What We Do",
  description: "WWS manufactures zinc-aluminium roofing and cladding sheets, gutters and accessories, and installs them with its own trained team.",
};

const process = [
  { t: "Quality coil", d: "We start with hi-tensile steel coil coated in zinc-aluminium.", img: "/images/process-coil.jpg", alt: "Zinc-aluminium steel coils stored at the WWS factory" },
  { t: "Roll forming", d: "The coil is formed into the sheet profile on our machines.", img: "/images/process-roll-forming.jpg", alt: "Roll forming machine shaping the sheet profile" },
  { t: "Cut to length", d: "Each sheet is cut to the exact length your roof needs.", img: "/images/process-cut-to-length.jpg", alt: "Slit and cut machine at the WWS factory" },
  { t: "Curving and crimping", d: "For arched roofs, sheets are curved and crimped to shape.", img: "/images/process-crimping.jpg", alt: "WWS team guiding a sheet through the crimping machine" },
  { t: "Check and deliver", d: "Every order is measured and checked before it leaves the factory.", img: "/images/process-inspection.jpg", alt: "A WWS team member checking a sheet before delivery" },
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
      <PageHero crumb="What We Do" parent={{ href: "/roofing", label: "Roofing" }} title="Roofing solutions, from our factory to your finished roof" intro="We manufacture zinc-aluminium roofing and building products and install them with our own trained team." image="/images/process-forming.jpg" />

      {/* Intro */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow="Overview" title="Everything your roof needs, in one place" />
          <Stagger delay={0.15} className="space-y-5 text-[17px] leading-relaxed text-muted">
            <StaggerItem as="p">WWS Roofing Products makes roofing and cladding sheets at our factory in Siyambalape. Because we control the whole process, from forming and cutting to curving and crimping, we can supply exactly what each project needs.</StaggerItem>
            <StaggerItem as="p">We also supply the gutters and accessories that complete a roof, and our trained team can install everything for you.</StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24 bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our products" title="Products and services we offer" intro="A complete range for residential, commercial and industrial projects." />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {products.map((p) => (
              <StaggerItem key={p.title} className="flex">
              <article className="card-lift group flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
                {p.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden"><Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="card-img object-cover" /></div>
                ) : (
                  // CONFIRM: no photo of this product yet. Add one to public/images and set `image` in lib/site.ts.
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-navy to-navy-deep">
                    <svg aria-hidden="true" viewBox="0 0 200 120" className="absolute inset-0 h-full w-full text-white/[0.06] transition-transform duration-700 group-hover:scale-110" preserveAspectRatio="xMidYMid slice">
                      {Array.from({ length: 12 }, (_, k) => <path key={k} d={`M${k * 20 - 20} 120 L${k * 20} 0 L${k * 20 + 8} 0 L${k * 20 - 12} 120Z`} fill="currentColor" />)}
                    </svg>
                    <span className="relative font-display text-2xl font-semibold text-white/90">{p.title}</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <Link href={p.slug ? `/roofing/products/${p.slug}` : `/contact?company=roofing&product=${encodeURIComponent(p.title)}`} className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                    {p.slug ? "See colours" : "Ask for a quote"} <ArrowIcon />
                  </Link>
                </div>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="How we make it" title="Our manufacturing process" intro="Five steps, all done at our own factory." />
          <ProcessShowcase steps={process} />
        </div>
      </section>

      {/* Quality */}
      <section className="bg-navy-deep py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading dark eyebrow="Quality" title="Made to handle Sri Lanka's weather" intro="Strong sun, heavy monsoon rain and humid air are hard on a roof. Our products are made with that in mind." />
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
            {quality.map((q) => (
              <StaggerItem as="li" variant="scale" key={q} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-[15px] leading-relaxed text-white/85 transition-colors duration-300 hover:border-white/25 hover:bg-white/10">
                <span className="mt-0.5 text-brand-light"><CheckIcon /></span>{q}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Where it's used" title="Roofing for every kind of building" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {uses.map(({ icon: I, t, d }) => (
              <StaggerItem as="article" key={t} className="group card-lift rounded-2xl bg-mist p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-[360deg]"><I /></span>
                <h3 className="mt-5 text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner company="roofing" />
    </>
  );
}
