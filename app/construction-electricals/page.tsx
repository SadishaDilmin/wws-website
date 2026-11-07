import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading, CtaBanner } from "@/components/Section";
import { ArrowIcon, BoltIcon, HomeIcon, FactoryIcon, ToolIcon, CheckIcon } from "@/components/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Construction & Electricals",
  description: "WWS Construction & Electricals has delivered construction and electrical works across Sri Lanka since 2006.",
};

// CONFIRM: service list and wording with WWS
const services = [
  { icon: HomeIcon, t: "Building construction", d: "Residential, commercial and industrial buildings, from foundations to finishing." },
  { icon: BoltIcon, t: "Electrical installations", d: "Wiring, power distribution and lighting for new and existing buildings." },
  { icon: FactoryIcon, t: "Industrial projects", d: "Construction and electrical works for factories, warehouses and plants." },
  { icon: ToolIcon, t: "Renovation and extensions", d: "Upgrades, extensions and repairs carried out with minimal disruption." },
];

const why = [
  "Over 20 years of experience since 2006",
  "Our own professional and technical team",
  "Projects of any size, from small works to large, complex builds",
  "One point of responsibility from start to finish",
];

export default function ConstructionElectricals() {
  return (
    <>
      <PageHero
        crumb="Construction & Electricals"
        title="Construction and electrical works you can rely on"
        accent={["rely"]}
        intro="WWS Construction & Electricals has delivered building and electrical projects across Sri Lanka since 2006."
        image={null}
      />

      {/* About */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow="Who we are" title="Where the WWS story started" />
          <Stagger delay={0.15} className="space-y-5 text-[17px] leading-relaxed text-muted">
            <StaggerItem as="p">
              WWS Construction &amp; Electricals began in 2006 as a subcontractor. Through the experience of our founder and a well-trained technical workforce, we grew to take on construction projects of any size.
            </StaggerItem>
            <StaggerItem as="p">
              We believe in taking full responsibility for every project we accept, which is why clients trust us with large and complex work. This company is where the WWS Group began.
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="What we do" title="Our services" intro="From the first foundation to the final electrical connection." />
          <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {services.map(({ icon: I, t, d }, i) => (
              <StaggerItem as="li" key={t} className="card-lift group rounded-2xl bg-white p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white"><I /></span>
                  <span className="font-display text-sm font-semibold text-navy/30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why + testimonial */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading eyebrow="Why choose us" title="Experience that gets the job done" />
            <Stagger as="ul" className="mt-8 divide-y divide-line border-y border-line" delay={0.15}>
              {why.map((w) => (
                <StaggerItem as="li" variant="left" key={w} className="flex gap-3 py-4 text-[16px]"><span className="mt-0.5 text-brand"><CheckIcon /></span>{w}</StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}><Link href="/contact?company=construction" className="btn-primary mt-10">Discuss your project <ArrowIcon /></Link></Reveal>
          </div>
          {/* Client comment from the previous WWS website. CONFIRM permission to show it. */}
          <Reveal as="figure" variant="right" className="relative overflow-hidden rounded-2xl bg-navy p-10 text-white sm:p-12">
            <span aria-hidden="true" className="absolute -right-2 -top-10 font-display text-[180px] leading-none text-white/[0.06]">&rdquo;</span>
            <span aria-hidden="true" className="block h-0.5 w-12 bg-brand" />
            <blockquote className="relative mt-6 font-display text-xl leading-snug sm:text-2xl">
              &ldquo;We would like to comment the management and the staff of WWS Construction &amp; Electricals for carrying out the preliminary works, implementation and completion of the tasks assigned to them by LTL, successfully to the entire satisfaction to the employer and ourselves.&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">LTL, client</figcaption>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        company="construction"
        eyebrow="Planning a project?"
        title="Talk to our construction team"
        text="Tell us about your building or electrical work and we'll get back to you with advice and an estimate."
      />
    </>
  );
}
