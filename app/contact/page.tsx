import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import EnquiryForm from "@/components/EnquiryForm";
import { PhoneIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the WWS Group of Companies for roofing products, construction and electrical works.",
};

export default function Contact() {
  return (
    <>
      <PageHero crumb="Contact Us" title="Contact the WWS Group" accent={["WWS"]} intro="Roofing, construction, electrical work or the hotel: send us your enquiry and the right team will get back to you." image="/images/factory-team-inspection.jpg" imagePosition="object-top" />
      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="mb-8 text-3xl font-semibold">Send us your enquiry</h2>
            <Suspense fallback={null}><EnquiryForm /></Suspense>
          </Reveal>
          <Stagger as="aside" className="space-y-6" delay={0.15} stagger={0.12}>
            <StaggerItem variant="right" className="rounded-2xl bg-navy p-8 text-white">
              <h2 className="text-xl font-semibold">Call our team</h2>
              <a href={`tel:${site.phoneHref}`} className="mt-4 inline-flex items-center gap-3 font-display text-2xl font-bold hover:text-white/80">
                <PhoneIcon className="h-6 w-6" /> {site.phone}
              </a>
              <p className="mt-3 text-white/70">{site.hours}</p>
            </StaggerItem>
            <StaggerItem variant="right" className="rounded-2xl border border-line p-8">
              <h2 className="text-xl font-semibold">Visit us</h2>
              <address className="mt-3 not-italic leading-relaxed text-muted">
                {site.group}<br />{site.address[0]}<br />{site.address[1]}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(", "))}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-block font-semibold text-brand hover:underline"
              >
                Open in Google Maps
              </a>
            </StaggerItem>
            <StaggerItem variant="right" className="rounded-2xl border border-line p-8">
              <h2 className="text-xl font-semibold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-3 inline-block text-muted hover:text-ink">{site.email}</a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
