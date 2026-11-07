import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-[15px] leading-relaxed">
            {site.legalName}, a member of the {site.group}. Quality roofing and building solutions since 2006.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Quick links</h2>
          <ul className="space-y-2.5 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Products</h2>
          <ul className="space-y-2.5 text-[15px]">
            <li><Link href="/products/roofing-sheets" className="hover:text-white">Roofing Sheets</Link></li>
            <li><Link href="/what-we-do#products" className="hover:text-white">Cladding Sheets</Link></li>
            <li><Link href="/what-we-do#products" className="hover:text-white">Gutters &amp; Down Pipes</Link></li>
            <li><Link href="/what-we-do#products" className="hover:text-white">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">Contact</h2>
          <address className="space-y-2.5 text-[15px] not-italic">
            <p>{site.address[0]}<br />{site.address[1]}</p>
            <p><a href={`tel:${site.phoneHref}`} className="hover:text-white">{site.phone}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></p>
            <p>{site.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>A member of the {site.group}</p>
        </div>
      </div>
    </footer>
  );
}
