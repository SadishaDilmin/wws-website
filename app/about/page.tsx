import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHeading, CtaBanner } from "@/components/Section";
import { TargetIcon, FlagIcon, ShieldIcon, UserIcon, HomeIcon, BoltIcon, BedIcon } from "@/components/Icons";
import { Stagger, StaggerItem, ImageReveal, CountUp, DrawLine } from "@/components/motion";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story, values and team behind the WWS Group of Companies.",
};

const journey = [
  { y: "2006", t: "The beginning", d: "WWS Construction & Electricals starts as a subcontractor." },
  { y: "2013", t: "WWS Group formed", d: "Our businesses come together as the WWS Group of Companies." },
  { y: "Today", t: "WWS Roofing Products", d: "Manufacturing and installing zinc-aluminium roofing and cladding.", current: true },
  { y: "Next", t: "Growing further", d: "A new WWS hotel joins the group." },
];

// CONFIRM: vision, mission and values wording with WWS
const values = [
  { icon: TargetIcon, t: "Our vision", d: "To be Sri Lanka's most trusted name for roofing and building solutions." },
  { icon: FlagIcon, t: "Our mission", d: "To supply durable, high-quality roofing products and install them right, with honest advice at every step." },
  { icon: ShieldIcon, t: "Our values", d: "Quality in every sheet. Integrity in every job. Care for every customer." },
];

// CONFIRM: replace with real names, roles and photos from WWS
const team = [
  { name: "Name to be added", role: "Managing Director" },
  { name: "Name to be added", role: "Director – Operations" },
  { name: "Name to be added", role: "Head of Sales" },
  { name: "Name to be added", role: "Installation Manager" },
];

// Real photos from the Siyambalape factory. `span` sets the tile size in the gallery grid (4 columns on desktop, 2 on phones).
// The film stills are about 1000px wide, so they are kept to tiles no wider than two columns.
const gallery = [
  { src: "/images/factory-hall.jpg", alt: "The WWS factory floor with roofing sheets coming off the production lines", label: "Our factory in Siyambalape", span: "col-span-2 row-span-2" },
  { src: "/images/factory-quality-check.jpg", alt: "Team member checking a flat sheet", label: "Quality check", span: "row-span-2" },
  { src: "/images/factory-team-inspection.jpg", alt: "Two WWS team members inspecting a formed steel section", label: "Our team", span: "" },
  { src: "/images/factory-roll-former.jpg", alt: "Close-up of the roll forming stations", label: "Roll forming", span: "" },
  { src: "/images/factory-production-line.jpg", alt: "Roofing sheets running off the production line", label: "Production line", span: "col-span-2" },
  { src: "/images/factory-bending.jpg", alt: "Team folding a sheet on the bender machine", label: "Bending", span: "" },
  { src: "/images/factory-operator.jpg", alt: "Operator setting up a forming machine", label: "Machine set-up", span: "" },
  { src: "/images/factory-loading.jpg", alt: "Finished roofing sheets loaded on a trailer for delivery", label: "Ready for delivery", span: "row-span-2" },
  { src: "/images/factory-coil-stock.jpg", alt: "Zinc-aluminium steel coils in the coil store", label: "Coil store", span: "col-span-2" },
  { src: "/images/factory-purlins.jpg", alt: "Long steel sections stacked after forming", label: "Steel sections", span: "" },
  { src: "/images/factory-finished-sheets.jpg", alt: "Finished blue roofing sheets on the factory rack", label: "Finished sheets", span: "col-span-2" },
  { src: "/images/factory-sheet-check.jpg", alt: "Two team members checking a sheet as it leaves the machine", label: "Checked by hand", span: "" },
  { src: "/images/factory-floor.jpg", alt: "Team at work between the production lines", label: "On the factory floor", span: "col-span-2" },
  { src: "/images/factory-bender.jpg", alt: "Bender machine used to fold flashings and ridges", label: "Bender machine", span: "" },
  { src: "/images/factory-sheeting-machine.jpg", alt: "Sheeting machine with steel coil", label: "Sheeting machine", span: "" },
];

const companies = [
  { href: "/roofing", icon: HomeIcon, tag: "Roofing & cladding", n: "WWS Roofing Products", d: "Zinc-aluminium roofing and cladding sheets, gutters and accessories, with installation." },
  { href: "/construction-electricals", icon: BoltIcon, tag: "Since 2006", n: "WWS Construction & Electricals", d: "Construction and electrical contracting for projects of every size." },
  { href: "/hotel", icon: BedIcon, tag: "Coming soon", n: "WWS Hotel", d: "A new hospitality venture from the WWS Group." },
];

export default function About() {
  return (
    <>
      <PageHero crumb="About Us" title="Building Sri Lanka since 2006" accent={["2006"]} intro="Get to know the people, values and journey behind WWS Roofing Products and the WWS Group of Companies." image="/images/factory-floor.jpg" />

      {/* Story */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageReveal className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src="/images/story-machine.jpg" alt="A WWS sheet going through the crimping machine" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </ImageReveal>
          <div className="space-y-6">
            <SectionHeading eyebrow="Who we are" title="One group, built on quality and trust" />
            <Stagger delay={0.2} className="space-y-6">
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                WWS began in 2006 as WWS Construction &amp; Electricals, a subcontractor known for finishing large and complex projects with care. As we grew, we brought our businesses together as the WWS Group of Companies in 2013.
              </StaggerItem>
              <StaggerItem as="p" className="text-[17px] leading-relaxed text-muted">
                Today, WWS Roofing Products (Pvt) Ltd manufactures zinc-aluminium coated hi-tensile roofing and cladding sheets at our factory in Siyambalape, and installs them with our own trained team.
              </StaggerItem>
            </Stagger>
            <Stagger as="dl" className="grid grid-cols-3 gap-3 pt-2" stagger={0.12}>
              {([[20, "+", "Years in construction"], [2013, "", "WWS Group founded"], [3, "", "Businesses in the group"]] as const).map(([n, suffix, l]) => (
                <StaggerItem key={l} className="rounded-xl bg-mist p-5">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-bold text-navy sm:text-4xl"><CountUp value={n} suffix={suffix} /></dd>
                  <dd className="mt-1 text-sm leading-snug text-muted">{l}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Factory gallery */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading dark center eyebrow="Inside our factory" title="Where every WWS sheet is made" intro="Coil, forming, cutting, bending and checking, all under one roof in Siyambalape." />
          <Stagger as="ul" className="mt-14 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4" stagger={0.08}>
            {gallery.map((g) => (
              <StaggerItem as="li" variant="scale" key={g.src} className={`group relative overflow-hidden rounded-2xl ${g.span}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="card-img object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent p-4 pt-12">
                  <p className="translate-y-1 text-sm font-semibold text-white transition-transform duration-500 group-hover:translate-y-0 sm:text-base">{g.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our journey" title="From one team to a group of companies" intro="A short look at how WWS has grown over the years." />
          <Stagger as="ol" className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.2}>
            {journey.map((m, i) => (
              <StaggerItem as="li" key={m.y}>
                <div className="flex items-center gap-3">
                  <span className={`relative h-5 w-5 shrink-0 rounded-full border-4 border-brand ${m.current ? "bg-brand" : "bg-white"}`}>
                    {m.current && <span aria-hidden="true" className="absolute -inset-1 animate-ping rounded-full bg-brand/40" />}
                  </span>
                  {i < journey.length - 1 && <DrawLine delay={0.3 + i * 0.2} className="hidden h-0.5 flex-1 bg-brand/30 lg:block" />}
                </div>
                <p className="mt-4 font-display text-4xl font-bold text-navy">{m.y}</p>
                <h3 className="mt-2 text-lg font-semibold">{m.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{m.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Vision mission values */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="What drives us" title="Our vision, mission and values" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {values.map(({ icon: I, t, d }) => (
              <StaggerItem as="article" key={t} className="group card-lift rounded-2xl border border-line p-8">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:scale-110"><I /></span>
                <h3 className="mt-6 text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our team" title="The people behind WWS" intro="Experienced leaders and skilled teams who make every project a success." />
          <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {team.map((m) => (
              <StaggerItem as="li" key={m.role} className="card-lift overflow-hidden rounded-2xl bg-white">
                <div className="grid aspect-[296/320] place-items-center bg-navy-soft text-navy/40"><UserIcon /></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 text-[15px] font-medium text-brand">{m.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Group */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading dark center eyebrow="WWS Group of Companies" title="One group, three businesses" intro="Each WWS company brings its own expertise, backed by the strength of the group." />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
            {companies.map(({ href, icon: I, tag, n, d }) => (
              <StaggerItem as="div" key={n} className="card-lift rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10">
                <Link href={href} className="block p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white"><I /></span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">{tag}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{n}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{d}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner eyebrow="Work with WWS" title="Let's talk about your project" text="Roofing, construction or electrical work, our team is ready to help. Send us your enquiry and we'll get back to you." />
    </>
  );
}
