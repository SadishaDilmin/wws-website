import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/Section";
import { Reveal, Stagger, StaggerItem, SplitWords, ParallaxBg, ImageReveal, CountUp } from "@/components/motion";
import Faq from "@/components/Faq";
import { ArrowIcon, CheckIcon, PhoneIcon, ShieldIcon, SunRainIcon, FactoryIcon, ToolIcon } from "@/components/Icons";
import { site, products, sheetColours } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing Sheets in Sri Lanka",
  description: "WWS Roofing Products manufactures zinc-aluminium coated hi-tensile roofing and cladding sheets in Sri Lanka, with professional installation.",
};

const stats = [
  { n: 2006, l: "The year our journey in construction began" },
  { n: 2013, l: "WWS Group established, bringing our companies together" },
  { n: 10, l: "Standard sheet colours to match any building" },
];

const reasons = [
  { icon: ShieldIcon, t: "Rust resistant", d: "Zinc-aluminium coating protects the steel for years." },
  { icon: SunRainIcon, t: "Built for our climate", d: "Handles strong sun and heavy monsoon rain." },
  { icon: FactoryIcon, t: "Factory direct", d: "Made, cut and curved at our own Siyambalape factory." },
  { icon: ToolIcon, t: "Installed right", d: "Our trained team fits every sheet to the correct standard." },
];

const steps = [
  { t: "Advice and estimate", d: "We understand your building, recommend the right products and give you a clear written estimate." },
  { t: "Supply and install", d: "Once approved, we make and deliver your sheets, and our trained team installs them correctly." },
  { t: "Final check and support", d: "We inspect the finished work, clean up the site and stay available for any support you need." },
];

const faqs = [
  { q: "What are zinc-aluminium roofing sheets?", a: "They are hi-tensile steel sheets coated with a zinc-aluminium alloy. The coating protects the steel from rust and corrosion much longer than ordinary galvanised sheets, which suits Sri Lanka's humid climate." },
  { q: "Do you install the roofing sheets as well?", a: "Yes. Our own trained installation team can fit WWS sheets and accessories for homes, factories and commercial buildings. Contact us for a site visit and estimate." },
  { q: "Can I see the colours before I order?", a: "Yes. You can preview all 10 colours on our roofing sheets page, and we recommend checking the physical colour card before ordering, as screens can show colours slightly differently." },
  { q: "Can sheets be cut or curved to my size?", a: "Yes. Sheets are cut to the length you need, and we can curve and crimp sheets at our factory for arched roofs and canopies." },
];

export default function RoofingHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <ParallaxBg>
          <Image src="/images/hero-curved-sheet.jpg" alt="Curved WWS zinc-aluminium roofing sheet" fill priority sizes="100vw" className="object-cover" />
          <div className="hero-scrim" />
        </ParallaxBg>
        <Stagger trigger="mount" delay={0.15} stagger={0.12} className="container-site py-24 sm:py-32 lg:py-40">
          <StaggerItem as="p" variant="fade" className="eyebrow text-brand-light">{site.legalName}</StaggerItem>
          <h1 className="mt-4 max-w-3xl text-[40px] font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <SplitWords text="Quality roofing sheets built to last" accent={["last"]} />
          </h1>
          <StaggerItem as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            We manufacture zinc-aluminium coated, hi-tensile roofing and cladding sheets for homes, factories and commercial buildings across Sri Lanka, and install them with our own trained team.
          </StaggerItem>
          <StaggerItem className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact?company=roofing" className="btn-primary">Get a free quote <ArrowIcon /></Link>
            <Link href="/roofing/products/roofing-sheets" className="btn-light">See colours</Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageReveal className="relative aspect-[605/628] overflow-hidden rounded-2xl">
            <Image src="/images/factory-team.jpg" alt="WWS team crimping a roofing sheet at the Siyambalape factory" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </ImageReveal>
          <div className="space-y-6">
            <SectionHeading eyebrow="Who we are" title="About WWS Roofing Products" />
            <Stagger delay={0.2} className="space-y-6">
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                WWS Roofing Products (Pvt) Ltd is part of the WWS Group of Companies. Our journey began in 2006 as WWS Construction &amp; Electricals, and today we are one of the pioneers of zinc-aluminium coated hi-tensile roofing and cladding sheets in Sri Lanka.
              </StaggerItem>
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                From our factory in Siyambalape, we make, cut and curve the full product range, and install it with our own skilled team.
              </StaggerItem>
              <StaggerItem>
                <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-brand">Learn more about us <ArrowIcon /></Link>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
        <Stagger className="container-site mt-16 grid gap-4 sm:grid-cols-3" stagger={0.12}>
          {stats.map((s) => (
            <StaggerItem key={s.n} className="rounded-2xl bg-mist p-7">
              <p className="font-display text-5xl font-bold text-navy"><CountUp value={s.n} /></p>
              <p className="mt-2 text-[15px] leading-snug text-muted">{s.l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Products */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading dark eyebrow="What we do best" title="Complete roofing solutions" intro="From manufacturing to installation, WWS delivers roofing and building products designed for Sri Lanka's sun and monsoon rains." />
            <Link href="/roofing/what-we-do" className="btn-light shrink-0">View all products <ArrowIcon /></Link>
          </div>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {products.filter((p) => p.image).map((p) => (
              <StaggerItem key={p.title} className="flex">
              <article className="card-lift group flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
                {p.image && (
                  <div className="relative aspect-[638/420] overflow-hidden"><Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="card-img object-cover" /></div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <Link href={p.slug ? `/roofing/products/${p.slug}` : "/contact?company=roofing"} className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                    {p.slug ? "See colours" : "Ask for details"} <ArrowIcon />
                  </Link>
                </div>
              </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Colours teaser */}
      <section className="py-20 sm:py-24">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Colour range" title="10 colours to match your building" intro="Every colour shown on a real WWS curved sheet from our factory. Tap one to try it in the live preview." />
            <Reveal delay={0.2} className="shrink-0"><Link href="/roofing/products/roofing-sheets" className="btn-primary">Try the colour preview <ArrowIcon /></Link></Reveal>
          </div>
          <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5" stagger={0.05}>
            {sheetColours.map((c) => (
              <StaggerItem as="li" variant="fade" key={c.name}>
                <Link href="/roofing/products/roofing-sheets" className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-mist ring-1 ring-line">
                    <Image src={`/images/colours/${c.name.toLowerCase().replace(/ /g, "-")}.jpg`} alt={`WWS sheet in ${c.name}`} fill sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw" className="card-img object-cover" />
                  </span>
                  <span className="mt-3 flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
                    <span className="text-sm font-medium text-ink transition-colors group-hover:text-brand">{c.name}</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-sm text-muted">Shown on screen. Please check our physical colour card before ordering.</p>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ImageReveal className="relative aspect-[534/628] overflow-hidden rounded-2xl">
            <Image src="/images/why-curved-sheet.jpg" alt="WWS curved and crimped roofing sheet" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </ImageReveal>
          <div>
            <SectionHeading eyebrow="Why WWS" title="Why choose WWS roofing?" intro="A roof is a long-term investment. Here's why builders and homeowners trust WWS." />
            <Stagger as="ul" className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.1}>
              {reasons.map(({ icon: I, t, d }) => (
                <StaggerItem as="li" key={t} className="group card-lift rounded-2xl bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white"><I className="h-6 w-6" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{d}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}><a href={`tel:${site.phoneHref}`} className="btn-primary mt-10"><PhoneIcon /> Call {site.phone}</a></Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="How we work" title="The WWS 3-step process" intro="From your first enquiry to the finished roof, our team supports you at every step." />
          <Stagger as="ol" className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.15}>
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.t} className="card-lift rounded-2xl border border-line p-8">
                <span className="font-display text-5xl font-bold text-brand">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Answers to your roofing questions" />
          <Reveal delay={0.1}><Faq items={faqs} /></Reveal>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Get started" title="Talk to Sri Lanka's roofing specialists" intro="Planning a new home, factory or roof replacement? Send us your details and we'll get back to you with expert advice and a free estimate." />
            <Stagger as="ul" className="mt-8 space-y-3" delay={0.2}>
              {["Quality zinc-aluminium roofing products", "Own trained installation team", "Residential, commercial and industrial projects"].map((t) => (
                <StaggerItem as="li" variant="left" key={t} className="flex items-center gap-3 text-[15px]"><span className="text-brand"><CheckIcon /></span>{t}</StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal variant="right" className="rounded-2xl bg-navy p-8 text-white sm:p-10">
            <h3 className="text-2xl font-semibold">Request a free quote</h3>
            <p className="mt-2 text-white/75">Tell us about your project and our team will get back to you.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact?company=roofing" className="btn-primary">Open the quote form <ArrowIcon /></Link>
              <a href={`tel:${site.phoneHref}`} className="btn-light"><PhoneIcon /> {site.phone}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
