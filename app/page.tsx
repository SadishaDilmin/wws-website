import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/Section";
import { ArrowIcon, CheckIcon, PhoneIcon, ShieldIcon, SunRainIcon, FactoryIcon, ToolIcon } from "@/components/Icons";
import { site, products, sheetColours } from "@/lib/site";

const stats = [
  { n: "2006", l: "The year our journey in construction began" },
  { n: "2013", l: "WWS Group established, bringing our companies together" },
  { n: "10", l: "Standard sheet colours to match any building" },
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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <Image src="/images/hero-curved-sheet.jpg" alt="Curved WWS zinc-aluminium roofing sheet" fill priority sizes="100vw" className="-z-10 object-cover opacity-80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/75 to-navy-deep/10" />
        <div className="container-site py-24 sm:py-32 lg:py-40">
          <p className="eyebrow text-[#FF8A8F]">{site.legalName}</p>
          <h1 className="mt-4 max-w-3xl text-[40px] font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Quality roofing sheets built to last
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            We manufacture zinc-aluminium coated, hi-tensile roofing and cladding sheets for homes, factories and commercial buildings across Sri Lanka, and install them with our own trained team.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Get a free quote <ArrowIcon /></Link>
            <Link href="/products/roofing-sheets" className="btn-light">See colours</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[605/628] overflow-hidden rounded-2xl">
            <Image src="/images/factory-team.jpg" alt="WWS team crimping a roofing sheet at the Siyambalape factory" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6">
            <SectionHeading eyebrow="Who we are" title="About WWS Roofing Products" />
            <p className="text-[17px] leading-relaxed text-muted">
              WWS Roofing Products (Pvt) Ltd is part of the WWS Group of Companies. Our journey began in 2006 as WWS Construction &amp; Electricals, and today we are one of the pioneers of zinc-aluminium coated hi-tensile roofing and cladding sheets in Sri Lanka.
            </p>
            <p className="text-[17px] leading-relaxed text-muted">
              From our factory in Siyambalape, we make, cut and curve the full product range, and install it with our own skilled team.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 font-semibold text-brand hover:gap-3">Learn more about us <ArrowIcon /></Link>
          </div>
        </div>
        <div className="container-site mt-16 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.n} className="rounded-2xl bg-mist p-7">
              <p className="font-display text-5xl font-bold text-navy">{s.n}</p>
              <p className="mt-2 text-[15px] leading-snug text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading dark eyebrow="What we do best" title="Complete roofing solutions" intro="From manufacturing to installation, WWS delivers roofing and building products designed for Sri Lanka's sun and monsoon rains." />
            <Link href="/what-we-do" className="btn-light shrink-0">View all products <ArrowIcon /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.filter((p) => p.image).map((p) => (
              <article key={p.title} className="flex flex-col overflow-hidden rounded-2xl bg-white">
                {p.image ? (
                  <div className="relative aspect-[638/349]"><Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /></div>
                ) : (
                  <div className="grid aspect-[638/349] place-items-center bg-navy-soft text-sm font-medium text-navy/60">Photo coming soon</div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
                  <Link href={p.slug ? `/products/${p.slug}` : "/contact"} className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                    {p.slug ? "See colours" : "Ask for details"} <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Colours teaser */}
      <section className="py-20 sm:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Colour range" title="10 colours to match your building" intro="Pick a colour and see it on a real WWS sheet before you order." />
          <div>
            <ul className="grid grid-cols-5 gap-3">
              {sheetColours.map((c) => (
                <li key={c.name} className="flex flex-col items-center gap-2 text-center">
                  <span className="block aspect-square w-full max-w-[64px] rounded-xl ring-1 ring-black/10" style={{ background: c.hex }} />
                  <span className="text-[11px] leading-tight text-muted">{c.name}</span>
                </li>
              ))}
            </ul>
            <Link href="/products/roofing-sheets" className="btn-primary mt-8">Try the colour preview <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative aspect-[534/628] overflow-hidden rounded-2xl">
            <Image src="/images/why-curved-sheet.jpg" alt="WWS curved and crimped roofing sheet" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Why WWS" title="Why choose WWS roofing?" intro="A roof is a long-term investment. Here's why builders and homeowners trust WWS." />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {reasons.map(({ icon: I, t, d }) => (
                <li key={t} className="rounded-2xl bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand"><I className="h-6 w-6" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ul>
            <a href={`tel:${site.phoneHref}`} className="btn-primary mt-10"><PhoneIcon /> Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="How we work" title="The WWS 3-step process" intro="From your first enquiry to the finished roof, our team supports you at every step." />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-line p-8">
                <span className="font-display text-5xl font-bold text-brand">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Answers to your roofing questions" />
          <div className="divide-y divide-line rounded-2xl bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Get started" title="Talk to Sri Lanka's roofing specialists" intro="Planning a new home, factory or roof replacement? Send us your details and we'll get back to you with expert advice and a free estimate." />
            <ul className="mt-8 space-y-3">
              {["Quality zinc-aluminium roofing products", "Own trained installation team", "Residential, commercial and industrial projects"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px]"><span className="text-brand"><CheckIcon /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-8 text-white sm:p-10">
            <h3 className="text-2xl font-semibold">Request a free quote</h3>
            <p className="mt-2 text-white/75">Tell us about your project and our team will get back to you.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Open the quote form <ArrowIcon /></Link>
              <a href={`tel:${site.phoneHref}`} className="btn-light"><PhoneIcon /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
