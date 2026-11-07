"use client";
import { m } from "motion/react";

// Re-mounts on every navigation, giving each page a short fade-in.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      {children}
    </m.div>
  );
}
