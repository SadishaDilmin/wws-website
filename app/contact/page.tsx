import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import { PhoneIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ask WWS Roofing Products for a free quote on roofing sheets, cladding, gutters and installation.",
};

export default function Contact() {
  return (
    <>
      <PageHero crumb="Contact Us" title="Get a free quote" intro="Tell us about your project and our team will recommend the right products and give you an estimate." />
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="mb-8 text-3xl font-semibold">Send us your enquiry</h2>
            <Suspense fallback={null}><EnquiryForm /></Suspense>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl bg-navy p-8 text-white">
              <h2 className="text-xl font-semibold">Call our team</h2>
              <a href={`tel:${site.phoneHref}`} className="mt-4 inline-flex items-center gap-3 font-display text-2xl font-bold hover:text-white/80">
                <PhoneIcon className="h-6 w-6" /> {site.phone}
              </a>
              <p className="mt-3 text-white/70">{site.hours}</p>
            </div>
            <div className="rounded-2xl border border-line p-8">
              <h2 className="text-xl font-semibold">Visit our factory</h2>
              <address className="mt-3 not-italic leading-relaxed text-muted">
                {site.legalName}<br />{site.address[0]}<br />{site.address[1]}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(", "))}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block font-semibold text-brand hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="rounded-2xl border border-line p-8">
              <h2 className="text-xl font-semibold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-3 inline-block text-muted hover:text-ink">{site.email}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
