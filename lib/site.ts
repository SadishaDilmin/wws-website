// Central place for company details. Items marked CONFIRM still need checking with WWS before launch.
export const site = {
  name: "WWS Roofing Products",
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
  { href: "/what-we-do", label: "What We Do" },
  { href: "/products/roofing-sheets", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

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
    image: null,
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
