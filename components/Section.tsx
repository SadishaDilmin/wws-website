import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PhoneIcon } from "./Icons";
import { Stagger, StaggerItem, SplitWords, ParallaxBg, Reveal, RoofLines } from "./motion";
import { site } from "@/lib/site";

export function SectionHeading({
  eyebrow, title, intro, center = false, dark = false,
}: { eyebrow: string; title: string; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <Stagger className={`max-w-2xl space-y-4 ${center ? "mx-auto text-center" : ""}`}>
      <StaggerItem as="p" className={`eyebrow ${dark ? "text-brand-light" : ""}`}>{eyebrow}</StaggerItem>
      <StaggerItem as="h2" className={`text-3xl font-semibold leading-tight sm:text-[44px] ${dark ? "text-white" : "text-ink"}`}>{title}</StaggerItem>
      {intro && <StaggerItem as="p" className={`text-[17px] leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{intro}</StaggerItem>}
    </Stagger>
  );
}

// imagePosition is a Tailwind object-position class, e.g. "object-top" to keep people's faces in frame.
export function PageHero({ crumb, parent, title, intro, accent, image = "/images/hero-curved-sheet.jpg", imagePosition = "object-center" }: { crumb: string; parent?: { href: string; label: string }; title: string; intro: string; accent?: string[]; image?: string | null; imagePosition?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      {image ? (
        <ParallaxBg>
          <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover opacity-30 ${imagePosition}`} />
        </ParallaxBg>
      ) : (
        // No photo yet: the WWS roof mark draws itself instead, so the hero never looks empty.
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(31,34,102,0.9),transparent_60%)]">
          <RoofLines className="absolute -right-24 bottom-0 hidden h-[115%] text-white/15 md:block lg:right-0" />
        </div>
      )}
      <Stagger trigger="mount" delay={0.1} className="container-site py-20 sm:py-28">
        <StaggerItem as="div" variant="fade">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] font-medium uppercase tracking-[0.16em] text-white/60">
            <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span>{" "}
            {parent && (<><Link href={parent.href} className="hover:text-white">{parent.label}</Link> <span aria-hidden="true">/</span>{" "}</>)}
            <span className="text-white">{crumb}</span>
          </nav>
        </StaggerItem>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-white sm:text-6xl"><SplitWords text={title} accent={accent} /></h1>
        <StaggerItem as="p" className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</StaggerItem>
      </Stagger>
    </section>
  );
}

export function CtaBanner({
  company, eyebrow = "Not sure which sheet to choose?", title = "Get free expert advice and a quote",
  text = "Tell us about your building and our team will recommend the right sheets, colours and accessories.",
}: { company?: string; eyebrow?: string; title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <ParallaxBg>
        <Image src="/images/cta-sheet.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" />
      </ParallaxBg>
      <div className="container-site flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between">
        <SectionHeading dark eyebrow={eyebrow} title={title} intro={text} />
        <Reveal variant="right" delay={0.2} className="flex flex-wrap gap-3">
          <Link href={company ? `/contact?company=${company}` : "/contact"} className="btn-primary">Get a free quote <ArrowIcon /></Link>
          <a href={`tel:${site.phoneHref}`} className="btn-light"><PhoneIcon /> {site.phone}</a>
        </Reveal>
      </div>
    </section>
  );
}
