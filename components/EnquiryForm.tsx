"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site, sheetColours, companies } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

const productOptions = ["Roofing Sheets", "Curved & Crimped Sheets", "Cladding & Walling Sheets", "Gutters & Down Pipes", "Accessories", "Professional Installation", "Not sure yet"];

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export default function EnquiryForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const initialProduct = productOptions.includes(params.get("product") ?? "") ? params.get("product")! : "";
  const initialCompany = companies.some((c) => c.key === params.get("company")) ? params.get("company")! : "";
  const [company, setCompany] = useState(initialCompany);
  const initialColour = sheetColours.some((c) => c.name === params.get("colour")) ? params.get("colour")! : "";

  function values(form: HTMLFormElement) {
    return Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    // The GitHub Pages preview is static, so there is no server to send email from.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      setStatus({ kind: "error", message: "Online sending isn't available in this preview." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values(form)) });
      const body = await res.json().catch(() => ({}));
      if (res.ok) { setStatus({ kind: "sent" }); form.reset(); }
      else setStatus({ kind: "error", message: body.error ?? "We couldn't send your enquiry." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't send your enquiry. Check your connection and try again." });
    }
  }

  function sendWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form!;
    if (!form.reportValidity()) return;
    const v = values(form);
    const text = [
      `Hi WWS, I'd like to make an enquiry.`,
      v.company && `Company: ${companies.find((c) => c.key === v.company)?.name ?? v.company}`,
      `Name: ${v.name}`, `Phone: ${v.phone}`,
      v.product && `Product: ${v.product}`, v.colour && `Colour: ${v.colour}`,
      v.location && `Location: ${v.location}`, v.message && `Details: ${v.message}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-mist p-10 text-center">
        <h2 className="text-2xl font-semibold">Thank you, your enquiry has been sent</h2>
        <p className="mt-3 text-muted">Our team will contact you soon. For anything urgent, call {site.phone}.</p>
        <button className="btn-outline mt-6" onClick={() => setStatus({ kind: "idle" })}>Send another enquiry</button>
      </div>
    );
  }

  const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/15";
  const label = "text-sm font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-5 sm:grid-cols-2">
      <div><label htmlFor="name" className={label}>Your name</label><input id="name" name="name" required autoComplete="name" className={field} /></div>
      <div><label htmlFor="phone" className={label}>Phone number</label><input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="07X XXX XXXX" className={field} /></div>
      <div><label htmlFor="email" className={label}>Email <span className="font-normal text-muted">(optional)</span></label><input id="email" name="email" type="email" autoComplete="email" className={field} /></div>
      <div><label htmlFor="location" className={label}>Project location</label><input id="location" name="location" placeholder="e.g. Gampaha" className={field} /></div>
      <div className="sm:col-span-2">
        <label htmlFor="company" className={label}>Which WWS company is this for?</label>
        <select id="company" name="company" required value={company} onChange={(e) => setCompany(e.target.value)} className={field}>
          <option value="">Choose a company</option>
          {companies.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
          <option value="general">General enquiry</option>
        </select>
      </div>
      {company === "roofing" && (<>
      <div>
        <label htmlFor="product" className={label}>Product</label>
        <select id="product" name="product" defaultValue={initialProduct} className={field}>
          <option value="">Choose a product</option>
          {productOptions.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="colour" className={label}>Colour</label>
        <select id="colour" name="colour" defaultValue={initialColour} className={field}>
          <option value="">Choose a colour</option>
          {sheetColours.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
      </div>
      </>)}
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Project details</label>
        <textarea id="message" name="message" rows={5} placeholder="Type of building, size, location, when you need it…" className={field} />
      </div>
      {/* Honeypot field to stop spam bots. Hidden from people. */}
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status.kind === "error" && (
        <p role="alert" className="rounded-lg bg-brand-soft p-4 text-[15px] text-brand-dark sm:col-span-2">
          {status.message} You can send it on WhatsApp instead, or call {site.phone}.
        </p>
      )}

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" disabled={status.kind === "sending"} className="btn-primary disabled:opacity-60">
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <button type="button" onClick={sendWhatsApp} className="btn border border-[#25D366] text-[#128C4B] hover:bg-[#25D366]/10">
          <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
