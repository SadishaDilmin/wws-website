import Link from "next/link";
import Logo from "./Logo";
import BackToTop from "./BackToTop";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { PhoneIcon, MailIcon, PinIcon, WhatsAppIcon, ArrowIcon } from "./Icons";
import { site, companies, roofingNav } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(", "))}`;

export default function Footer() {
  const contact = [
    { icon: PhoneIcon, label: "Call us", value: site.phone, href: `tel:${site.phoneHref}` },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${site.whatsapp}`, external: true },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-white/65">
      {/* Hairline in brand red fading out to the sides */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="container-site">
        {/* Contact strip */}
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:py-20">
          <Reveal>
            <p className="eyebrow text-brand-light">Get in touch</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white sm:text-[40px]">
              Talk to the WWS team
            </h2>
          </Reveal>
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3" stagger={0.1}>
            {contact.map(({ icon: I, label, value, href, external }) => (
              <StaggerItem as="li" key={label} className="bg-navy-deep">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                    <I className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium uppercase tracking-[0.14em] text-white/45">{label}</span>
                    <span className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-white">
                      <span className="break-all">{value}</span> <ArrowIcon />
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Link columns */}
        <Stagger className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_1.2fr] lg:gap-10" stagger={0.08}>
          <StaggerItem className="space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="WWS Group of Companies home" className="inline-block"><Logo onDark className="h-12 w-auto" /></Link>
            <p className="max-w-xs text-[15px] leading-relaxed">
              Roofing products, construction and electrical works, and hospitality. One group, built on quality and trust since 2006.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h2 className="footer-heading">Our companies</h2>
            <ul className="space-y-3 text-[15px]">
              {companies.map((c) => (
                <li key={c.key}>
                  <Link href={c.href} className="footer-link">
                    {c.name.replace("WWS ", "")}
                    {c.status === "soon" && <span className="ml-2 rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Soon</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className="footer-heading">Roofing</h2>
            <ul className="space-y-3 text-[15px]">
              {roofingNav.map((n) => (
                <li key={n.href}><Link href={n.href} className="footer-link">{n.label}</Link></li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className="footer-heading">Explore</h2>
            <ul className="space-y-3 text-[15px]">
              {explore.map((n) => (
                <li key={n.href}><Link href={n.href} className="footer-link">{n.label}</Link></li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className="footer-heading">Visit us</h2>
            <address className="space-y-3 text-[15px] not-italic leading-relaxed">
              <p className="flex gap-3"><PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-light" /><span>{site.address[0]}<br />{site.address[1]}</span></p>
              <p className="pl-[30px]">{site.hours}</p>
              <p className="pl-[30px]"><a href={mapsHref} target="_blank" rel="noopener noreferrer" className="footer-link font-semibold text-white">Get directions</a></p>
            </address>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Oversized outline wordmark, a quiet signature at the bottom of every page */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <Reveal variant="up" className="container-site">
          <p className="footer-wordmark">WWS Group</p>
        </Reveal>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.group}. All rights reserved.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
