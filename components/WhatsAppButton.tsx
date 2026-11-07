import { site } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi WWS, I'd like a quote for roofing sheets.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WWS on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon />
    </a>
  );
}
