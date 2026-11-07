import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PhoneIcon } from "./Icons";
import { site } from "@/lib/site";

export function SectionHeading({
  eyebrow, title, intro, center = false, dark = false,
}: { eyebrow: string; title: string; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-[#FF8A8F]" : ""}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-semibold leading-tight sm:text-[44px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`text-[17px] leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

export function PageHero({ crumb, title, intro, image = "/images/hero-curved-sheet.jpg" }: { crumb: string; title: string; intro: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
      <div className="container-site py-20 sm:py-28">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] font-medium uppercase tracking-[0.16em] text-white/60">
          <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span> <span className="text-white">{crumb}</span>
        </nav>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-white sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Image src="/images/cta-sheet.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />
      <div className="container-site flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="eyebrow text-[#FF8A8F]">Not sure which sheet to choose?</p>
          <h2 className="text-3xl font-semibold text-white sm:text-[44px] sm:leading-tight">Get free expert advice and a quote</h2>
          <p className="text-[17px] leading-relaxed text-white/75">
            Tell us about your building and our team will recommend the right sheets, colours and accessories.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Get a free quote <ArrowIcon /></Link>
          <a href={`tel:${site.phoneHref}`} className="btn-light"><PhoneIcon /> {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
