// Temporary text logo. Replace with the official REEGO / WWS logo file when WWS sends it.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">
        <path d="M2 22 20 6l18 16" fill="none" stroke="#D42430" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 26 20 15l12 11" fill="none" stroke={light ? "#FFFFFF" : "#1F2266"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[22px] font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>WWS</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-muted"}`}>
          Roofing Products
        </span>
      </span>
    </span>
  );
}
