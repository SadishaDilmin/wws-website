import type { Metadata } from "next";
import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Roofing Sheets in Sri Lanka | WWS Roofing Products", template: "%s | WWS Roofing Products" },
  description:
    "WWS Roofing Products manufactures zinc-aluminium coated hi-tensile roofing and cladding sheets in Sri Lanka, with professional installation.",
  openGraph: { type: "website", siteName: site.name, locale: "en_LK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
