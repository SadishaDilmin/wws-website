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
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "WWS Group of Companies | Roofing, Construction & Electricals", template: "%s | WWS Group" },
  description:
    "The WWS Group of Companies: WWS Roofing Products, WWS Construction & Electricals and the upcoming WWS Hotel. Building Sri Lanka since 2006.",
  openGraph: { type: "website", siteName: site.name, locale: "en_LK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Without JavaScript, show content that would otherwise wait for its entrance animation. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
