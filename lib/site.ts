// Central place for company details. Items marked CONFIRM still need checking with WWS before launch.
export const site = {
  name: "WWS Group of Companies",
  roofingName: "WWS Roofing Products",
  legalName: "WWS Roofing Products (Pvt) Ltd",
  group: "WWS Group of Companies",
  brand: "REEGO",
  phone: "+94 11 248 7727", // CONFIRM: taken from a public business listing
  phoneHref: "+94112487727",
  whatsapp: "94112487727", // CONFIRM: WhatsApp number
  email: "info@example.lk", // CONFIRM: replace once the domain is confirmed (wws.lk is not available)
  address: ["No 55/2, Galahitiyawa Rd", "Siyambalape, Sri Lanka"],
  hours: "Mon – Sat, 8.30am – 5.30pm", // CONFIRM
  url: "https://example.lk", // CONFIRM: final domain
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/roofing", label: "Roofing" },
  { href: "/construction-electricals", label: "Construction & Electricals" },
  { href: "/hotel", label: "Hotel" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const roofingNav = [
  { href: "/roofing", label: "Overview" },
  { href: "/roofing/what-we-do", label: "What We Do" },
  { href: "/roofing/products/roofing-sheets", label: "Roofing Sheets & Colours" },
];

// The companies in the WWS Group. "key" is used by the contact form.
export const companies = [
  {
    key: "roofing", href: "/roofing", name: "WWS Roofing Products", tag: "Roofing & cladding",
    text: "Zinc-aluminium roofing and cladding sheets made at our Siyambalape factory, with gutters, accessories and installation.",
    image: "/images/hero-curved-sheet.jpg", status: "live",
  },
  {
    key: "construction", href: "/construction-electricals", name: "WWS Construction & Electricals", tag: "Since 2006",
    text: "Building construction and electrical works for projects of any size, delivered by our own technical team.",
    image: null, status: "live", // CONFIRM: add a construction project photo
  },
  {
    key: "hotel", href: "/hotel", name: "WWS Hotel", tag: "Coming soon",
    text: "A new hospitality venture from the WWS Group. More details soon.",
    image: null, status: "soon",
  },
] as const;

// Sampled from the WWS Roofing Products colour card
export const sheetColours = [
  { name: "Maroon", hex: "#800000" },
  { name: "Caulifield Green", hex: "#184722" },
  { name: "Lazarite Blue", hex: "#010080" },
  { name: "Chocolate Brown", hex: "#26110D" },
  { name: "Mist Green", hex: "#678762" },
  { name: "Beige", hex: "#B8A07B" },
  { name: "Off White", hex: "#E7E0D3" },
  { name: "Titanium Silver", hex: "#989B99", metallic: true },
  { name: "Metalic Bronze", hex: "#395661", metallic: true },
  { name: "Non Color", hex: "#A4AEA5", metallic: true },
] as const;

export const products = [
  {
    slug: "roofing-sheets",
    title: "Roofing Sheets",
    text: "Hi-tensile zinc-aluminium coated sheets that are light, strong and rust resistant.",
    image: "/images/product-straight-sheet.jpg",
  },
  {
    slug: "roofing-sheets",
    title: "Curved & Crimped Sheets",
    text: "Sheets curved to shape at our factory for arched roofs, canopies and walkways.",
    image: "/images/product-curved-sheet.jpg",
  },
  {
    slug: null,
    title: "Cladding & Walling Sheets",
    text: "Wall cladding for factories, warehouses and modern buildings.",
    image: "/images/product-cladding-sheet.jpg",
  },
  {
    slug: null,
    title: "Gutters & Down Pipes",
    text: "Rainwater systems that carry heavy monsoon rain safely away from your building.",
    image: null,
  },
  {
    slug: null,
    title: "Accessories",
    text: "Ridges, flashings, fasteners and everything needed for a complete, leak-free roof.",
    image: null,
  },
  {
    slug: null,
    title: "Professional Installation",
    text: "Our trained team fixes WWS products to the correct technical standards.",
    image: "/images/service-measuring.jpg",
  },
];
