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
  // Keep the GitHub Pages client preview out of search results (it still has placeholder details).
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions (e.g. LocatorJS, Grammarly) add attributes to <html>/<body> before React loads.
    // suppressHydrationWarning ignores attribute differences on these two elements only, not their children.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Without JavaScript, show content that would otherwise wait for its entrance animation. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning>
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
