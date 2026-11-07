"use client";
import { m } from "motion/react";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";
import { ease } from "./motion";

export default function WhatsAppButton() {
  return (
    <m.a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi WWS, I'd like to make an enquiry.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WWS on WhatsApp"
      data-reveal
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      {/* Soft ring that pulses a few times to draw the eye, then stops. */}
      <span aria-hidden="true" className="absolute inset-0 animate-ring rounded-full bg-[#25D366]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </m.a>
  );
}
