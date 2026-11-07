"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";
import { ease } from "./motion";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => setOpen(false), [path]);

  // Add a shadow once the page scrolls, and tuck the header away while scrolling down.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > prev && y > 240);
  });

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <m.header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 ${scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgba(20,22,63,0.25)]" : "border-line"}`}
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="WWS Group of Companies home"><Logo /></Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative block py-2 text-[15px] font-medium transition-colors hover:text-brand ${isActive(n.href) ? "text-brand" : "text-ink"}`}
                >
                  {n.label}
                  {isActive(n.href) && (
                    <m.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand" transition={{ duration: 0.45, ease }} />
                  )}
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
            className="rounded-lg p-2 text-ink xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={open ? "close" : "menu"}
                className="block"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line bg-white xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <m.ul
              className="container-site flex flex-col py-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {nav.map((n) => (
                <m.li key={n.href} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                  <Link href={n.href} className={`block py-3 text-base font-medium ${isActive(n.href) ? "text-brand" : "text-ink"}`}>
                    {n.label}
                  </Link>
                </m.li>
              ))}
              <m.li className="pt-2 pb-3" variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
                <a href={`tel:${site.phoneHref}`} className="btn-primary w-full"><PhoneIcon /> Call {site.phone}</a>
              </m.li>
            </m.ul>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
