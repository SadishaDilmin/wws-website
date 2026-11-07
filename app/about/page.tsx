import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionHeading, CtaBanner } from "@/components/Section";
import { TargetIcon, FlagIcon, ShieldIcon, UserIcon, HomeIcon, BoltIcon, BedIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story, values and team behind WWS Roofing Products and the WWS Group of Companies.",
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

const companies = [
  { icon: HomeIcon, tag: "You are here", n: "WWS Roofing Products", d: "Zinc-aluminium roofing and cladding sheets, gutters and accessories, with installation." },
  { icon: BoltIcon, tag: "Since 2006", n: "WWS Construction & Electricals", d: "Construction and electrical contracting for projects of every size." },
  { icon: BedIcon, tag: "Coming soon", n: "WWS Hotel", d: "A new hospitality venture from the WWS Group." },
];

export default function About() {
  return (
    <>
      <PageHero crumb="About Us" title="Building strong roofs for Sri Lanka since 2006" intro="Get to know the people, values and journey behind WWS Roofing Products and the WWS Group of Companies." image="/images/story-machine.jpg" />

      {/* Story */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src="/images/story-machine.jpg" alt="A WWS sheet going through the crimping machine" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6">
            <SectionHeading eyebrow="Who we are" title="One group, built on quality and trust" />
            <p className="text-[17px] leading-relaxed text-muted">
              WWS began in 2006 as WWS Construction &amp; Electricals, a subcontractor known for finishing large and complex projects with care. As we grew, we brought our businesses together as the WWS Group of Companies in 2013.
            </p>
            <p className="text-[17px] leading-relaxed text-muted">
              Today, WWS Roofing Products (Pvt) Ltd manufactures zinc-aluminium coated hi-tensile roofing and cladding sheets at our factory in Siyambalape, and installs them with our own trained team.
            </p>
            <dl className="grid grid-cols-3 gap-3 pt-2">
              {[["20+", "Years in construction"], ["2013", "WWS Group founded"], ["3", "Businesses in the group"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-mist p-5">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl font-bold text-navy sm:text-4xl">{n}</dd>
                  <dd className="mt-1 text-sm leading-snug text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our journey" title="From one team to a group of companies" intro="A short look at how WWS has grown over the years." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {journey.map((m, i) => (
              <li key={m.y}>
                <div className="flex items-center gap-3">
                  <span className={`h-5 w-5 shrink-0 rounded-full border-4 border-brand ${m.current ? "bg-brand" : "bg-white"}`} />
                  {i < journey.length - 1 && <span className="hidden h-0.5 flex-1 bg-brand/30 lg:block" />}
                </div>
                <p className="mt-4 font-display text-4xl font-bold text-navy">{m.y}</p>
                <h3 className="mt-2 text-lg font-semibold">{m.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision mission values */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="What drives us" title="Our vision, mission and values" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: I, t, d }) => (
              <article key={t} className="rounded-2xl border border-line p-8">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white"><I /></span>
                <h3 className="mt-6 text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-mist py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading center eyebrow="Our team" title="The people behind WWS" intro="Experienced leaders and skilled teams who make every project a success." />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.role} className="overflow-hidden rounded-2xl bg-white">
                <div className="grid aspect-[296/320] place-items-center bg-navy-soft text-navy/40"><UserIcon /></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 text-[15px] font-medium text-brand">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Group */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading dark center eyebrow="WWS Group of Companies" title="One group, three businesses" intro="Each WWS company brings its own expertise, backed by the strength of the group." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {companies.map(({ icon: I, tag, n, d }) => (
              <article key={n} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white"><I /></span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">{tag}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{n}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
