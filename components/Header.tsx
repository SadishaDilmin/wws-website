"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-site flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="WWS Roofing Products home"><Logo /></Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative py-2 text-[15px] font-medium transition-colors hover:text-brand ${isActive(n.href) ? "text-brand" : "text-ink"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${site.phoneHref}`} className="btn-primary hidden sm:inline-flex">
            <PhoneIcon /> {site.phone}
          </a>
          <button
            className="rounded-lg p-2 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="container-site flex flex-col py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={`block py-3 text-base font-medium ${isActive(n.href) ? "text-brand" : "text-ink"}`}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-3">
              <a href={`tel:${site.phoneHref}`} className="btn-primary w-full"><PhoneIcon /> Call {site.phone}</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
