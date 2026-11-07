# WWS Group of Companies – Website

Group website for the WWS Group of Companies, with sections for WWS Roofing Products, WWS Construction & Electricals and the upcoming WWS Hotel. Built with Next.js 15, TypeScript and Tailwind CSS, deployed on Vercel.

## Pages
- `/` WWS Group home, linking to each company
- `/roofing` WWS Roofing Products overview
- `/roofing/what-we-do` Products, manufacturing process and applications
- `/roofing/products/roofing-sheets` Roofing sheets with live colour preview (10 colours from the WWS colour card)
- `/construction-electricals` WWS Construction & Electricals
- `/hotel` WWS Hotel (coming soon)
- `/about` Group story, journey, vision/mission/values, team and companies
- `/contact` Enquiry form for any WWS company (email or WhatsApp)

## Run locally
```bash
npm install
npm run dev
```

## Contact form email
Set these environment variables in Vercel (Settings → Environment Variables):
- `RESEND_API_KEY` – from resend.com
- `ENQUIRY_TO` – inbox that receives enquiries
- `ENQUIRY_FROM` – verified sender, e.g. `WWS Website <website@your-domain.lk>`

Until these are set, the form asks visitors to use WhatsApp or call instead.

## Before launch
Company details live in `lib/site.ts`. Items marked `CONFIRM` need checking with WWS:
- Final domain and email address
- Phone and WhatsApp numbers, opening hours
- Official logo (replace `components/Logo.tsx`)
- Team names, roles and photos (`app/about/page.tsx`)
- Vision, mission and values wording
- Photos for cladding, gutters, accessories and installed roofs
- Construction & Electricals service list and project photos
- Hotel name and details
