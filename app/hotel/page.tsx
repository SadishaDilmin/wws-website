import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Section";
import { ArrowIcon, BedIcon } from "@/components/Icons";
import { Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "WWS Hotel",
  description: "A new hospitality venture from the WWS Group of Companies. Coming soon.",
};

export default function Hotel() {
  return (
    <>
      <PageHero crumb="Hotel" title="WWS Hotel is coming soon" accent={["soon"]} intro="A new hospitality venture from the WWS Group of Companies." image={null} />
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Stagger className="mx-auto max-w-2xl rounded-2xl border border-line p-10 text-center sm:p-14" stagger={0.12}>
            <StaggerItem variant="scale"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-brand"><BedIcon className="h-8 w-8" /></span></StaggerItem>
            <StaggerItem as="h2" className="mt-6 text-3xl font-semibold">We&apos;re getting ready to welcome you</StaggerItem>
            <StaggerItem as="p" className="mt-4 text-[17px] leading-relaxed text-muted">
              Details about the hotel, its location and bookings will be shared here soon. If you&apos;d like to hear from us when it opens, send us a message.
            </StaggerItem>
            <StaggerItem><Link href="/contact?company=hotel" className="btn-primary mt-8">Keep me updated <ArrowIcon /></Link></StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
}
