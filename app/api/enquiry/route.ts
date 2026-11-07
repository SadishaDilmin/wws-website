import { NextResponse } from "next/server";

/**
 * Receives quote requests from the contact form and emails them to WWS.
 * Email is sent through Resend (https://resend.com). Set these in Vercel → Settings → Environment Variables:
 *   RESEND_API_KEY   – API key from Resend
 *   ENQUIRY_TO       – the WWS inbox that receives enquiries
 *   ENQUIRY_FROM     – a verified sender, e.g. "WWS Website <website@your-domain.lk>"
 */
const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  if (clean(body.company)) return NextResponse.json({ ok: true }); // honeypot: silently ignore bots

  const data = {
    name: clean(body.name, 120), phone: clean(body.phone, 40), email: clean(body.email, 160),
    location: clean(body.location, 120), product: clean(body.product, 80), colour: clean(body.colour, 60), message: clean(body.message),
  };
  if (!data.name || !data.phone) return NextResponse.json({ error: "Please add your name and phone number." }, { status: 400 });

  const { RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO || !ENQUIRY_FROM) {
    return NextResponse.json({ error: "The online form isn't connected yet." }, { status: 503 });
  }

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const rows = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5A5F78">${k}</td><td>${esc(v)}</td></tr>`).join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: ENQUIRY_FROM, to: [ENQUIRY_TO], reply_to: data.email || undefined,
      subject: `New quote request: ${data.product || "General"} – ${data.name}`,
      html: `<h2>New website enquiry</h2><table>${rows}</table>`,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "We couldn't send your enquiry right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
