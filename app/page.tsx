import Image from "next/image";
import Link from "next/link";
import { SectionHeading, CtaBanner } from "@/components/Section";
import { ArrowIcon, HomeIcon, BoltIcon, BedIcon, ShieldIcon, ToolIcon, FactoryIcon } from "@/components/Icons";
import { companies, site } from "@/lib/site";
import { Stagger, StaggerItem, SplitWords, ParallaxBg, Typewriter, CountUp } from "@/components/motion";

const icons = { roofing: HomeIcon, construction: BoltIcon, hotel: BedIcon } as const;

const strengths = [
  { icon: ShieldIcon, t: "Quality you can trust", d: "Every WWS company is built on careful work and honest advice." },
  { icon: ToolIcon, t: "Our own skilled teams", d: "Trained technical staff deliver the work, not outside crews." },
  { icon: FactoryIcon, t: "Made and managed in Sri Lanka", d: "From our Siyambalape factory to sites across the island." },
];

export default function GroupHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <ParallaxBg>
          <Image src="/images/factory-team.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        </ParallaxBg>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
        <Stagger trigger="mount" delay={0.15} stagger={0.12} className="container-site py-28 sm:py-36 lg:py-44">
          <StaggerItem as="p" variant="fade" className="eyebrow text-brand-light">{site.group}</StaggerItem>
          <h1 className="mt-5 max-w-4xl text-[42px] font-bold leading-[1.04] text-white sm:text-6xl lg:text-[80px]">
            <SplitWords text="Building Sri Lanka since 2006" accent={["2006"]} />
          </h1>
          <StaggerItem as="p" className="mt-7 min-h-[2.8em] font-display text-xl font-semibold leading-snug text-white sm:min-h-[1.4em] sm:text-2xl">
            <span className="text-white/55">We deliver </span>
            <Typewriter className="block sm:inline" words={["roofing that lasts.", "construction you can trust.", "electrical works done right.", "a new hotel, coming soon."]} />
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            One group, three businesses, all backed by the WWS name.
          </StaggerItem>
          <StaggerItem className="mt-10 flex flex-wrap gap-3">
            <a href="#companies" className="btn-primary">Explore our companies <ArrowIcon /></a>
            <Link href="/contact" className="btn-light">Contact us</Link>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Companies */}
      <section id="companies" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our companies" title="Choose a WWS company" intro="Each company has its own team and expertise, backed by the strength of the WWS Group." />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
            {companies.map((c) => {
              const I = icons[c.key];
              const soon = c.status === "soon";
              return (
                <StaggerItem as="div" key={c.key}>
                <Link href={c.href} className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    {c.image ? (
                      <Image src={c.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="card-img object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center bg-gradient-to-br from-navy to-navy-deep text-white/30"><I className="h-16 w-16 transition-[scale,color] duration-700 group-hover:scale-110 group-hover:text-white/60" /></div>
                    )}
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${soon ? "bg-white text-navy" : "bg-brand text-white"}`}>{c.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand"><I /></span>
                      <h3 className="text-xl font-semibold leading-snug">{c.name}</h3>
                    </div>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{c.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-[15px] font-semibold text-brand">
                      {soon ? "Find out more" : `Visit ${c.name.replace("WWS ", "")}`} <ArrowIcon />
                    </span>
                  </div>
                </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* About the group */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <SectionHeading eyebrow="About the group" title="From one team to a group of companies" />
            <Stagger delay={0.2} className="space-y-6">
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                WWS began in 2006 as WWS Construction &amp; Electricals, a subcontractor known for completing large and complex projects with care. In 2013 we brought our businesses together as the WWS Group of Companies.
              </StaggerItem>
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                Today the group includes WWS Roofing Products, which manufactures zinc-aluminium roofing at our Siyambalape factory, and a new hotel that is on the way.
              </StaggerItem>
              <StaggerItem><Link href="/about" className="inline-flex items-center gap-2 font-semibold text-brand">Our story <ArrowIcon /></Link></StaggerItem>
            </Stagger>
          </div>
          <Stagger as="dl" className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line" stagger={0.1}>
            {([[2006, "", "Our journey began"], [2013, "", "WWS Group founded"], [3, "", "Businesses in the group"], [20, "+", "Years of experience"]] as const).map(([n, suffix, l]) => (
              <StaggerItem key={l} variant="fade" className="bg-white p-7 sm:p-9">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-4xl font-bold text-navy sm:text-5xl"><CountUp value={n} suffix={suffix} /></dd>
                <dd className="mt-2 text-[15px] text-muted">{l}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Why WWS" title="What every WWS company stands for" />
          <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {strengths.map(({ icon: I, t, d }) => (
              <StaggerItem as="li" key={t} className="card-lift group rounded-2xl border border-line p-8">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white"><I /></span>
                <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner eyebrow="Work with WWS" title="Let's talk about your project" text="Roofing, construction or electrical work, our team is ready to help. Send us your enquiry and we'll get back to you." />
    </>
  );
}
