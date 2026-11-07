"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { ease } from "./motion";

export default function SubNav({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <div className="border-b border-line bg-mist">
      <div className="container-site flex items-center gap-6 overflow-x-auto">
        <span className="eyebrow shrink-0 py-4 text-navy">{title}</span>
        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-line" />
        <nav aria-label={`${title} sections`}>
          <ul className="flex gap-6">
            {items.map((i) => {
              const active = path === i.href;
              return (
                <li key={i.href} className="shrink-0">
                  <Link
                    href={i.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block py-4 text-sm font-medium transition-colors hover:text-brand ${active ? "text-ink" : "text-muted"}`}
                  >
                    {i.label}
                    {active && <m.span layoutId="subnav-underline" className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" transition={{ duration: 0.45, ease }} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
