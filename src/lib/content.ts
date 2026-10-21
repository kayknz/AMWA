export const PHONE_DISPLAY = "6645 4489";
export const PHONE_TEL = "+97466454489";
export const WHATSAPP = "https://wa.me/97466454489";

export type PayMode = "one-time" | "installments" | "subscription";

export const packages = [
  {
    id: "landing",
    name: "Landing Page",
    price: "4,500",
    time: "5–10 days",
    fit: "One page for a campaign, launch, or event.",
    pay: ["one-time"] as PayMode[],
    payLine: "100% to start, or 50% start and 50% at launch.",
    gets: [
      "Hero, benefits, proof, and a single call to action",
      "Mobile-first layout",
      "Lead form or WhatsApp button",
      "Basic page title and description",
      "One revision round and 14 days of support",
    ],
    nots: ["Multi-page site", "Arabic layout (add-on)", "Payments or accounts"],
  },
  {
    id: "starter",
    name: "Starter Website",
    price: "7,500",
    time: "10–14 days",
    fit: "A clear first presence for a new business.",
    pay: ["one-time"] as PayMode[],
    payLine: "50% to start, 50% before launch. Optional care plan after.",
    gets: [
      "Home, About, Services, Contact, plus one or two extras",
      "Mobile layout, contact form, WhatsApp, and click-to-call",
      "Map embed if you have a location",
      "Basic SEO: titles, descriptions, sitemap",
      "Structure ready for Arabic text you provide",
      "Two revision rounds and 30 days of support",
    ],
    nots: ["Custom brand system", "Checkout or bookings", "Full bilingual UI", "Ongoing copywriting"],
  },
  {
    id: "business",
    name: "Business Website",
    price: "14,000",
    time: "3–4 weeks",
    fit: "Bilingual brand site built to generate enquiries.",
    featured: true,
    pay: ["one-time", "installments"] as PayMode[],
    payLine: "50/50, or three monthly installments agreed in the proposal.",
    gets: [
      "Everything in Starter",
      "Custom layout in your colours and type",
      "Full Arabic and English with proper right-to-left layout",
      "Up to 12 pages, including a blog or news template",
      "Lead forms, optional sheet or CRM hook, analytics",
      "Three revision rounds and 45 days of support",
    ],
    nots: ["Checkout or paid bookings", "Customer accounts", "Complex integrations", "Monthly SEO"],
  },
  {
    id: "redesign",
    name: "Website Redesign",
    price: "12,000",
    time: "3–5 weeks",
    fit: "Rebuild a site you already have, without starting the brand from zero.",
    pay: ["one-time", "installments"] as PayMode[],
    payLine: "50/50 or three installments. Migration is scoped after we see the current site.",
    gets: [
      "Review of the current site",
      "New design on the agreed page templates",
      "Mobile and speed improvements",
      "Redirect plan for important addresses",
      "45 days of support",
    ],
    nots: ["New logo", "Full rewrite of every page", "New shop if none exists"],
  },
  {
    id: "bookings",
    name: "Booking System",
    price: "22,000",
    time: "4–7 weeks",
    fit: "Appointments for salons, clinics, tutors, and consultants.",
    pay: ["one-time", "installments"] as PayMode[],
    payLine: "50/50 or three installments. Gateway fees stay with the payment provider.",
    gets: [
      "Service list with duration and price",
      "Slot or calendar booking",
      "Simple staff or room assignment",
      "Admin list of upcoming bookings",
      "Optional deposit through a local gateway",
      "Bilingual booking screens, one hour of training, 60 days of support",
    ],
    nots: ["Product catalogue", "Multi-branch operations", "Native mobile apps", "SMS charges"],
  },
  {
    id: "store",
    name: "Online Store",
    price: "28,000",
    time: "5–8 weeks",
    fit: "Catalogue, cart, checkout, and an order desk.",
    pay: ["one-time", "installments"] as PayMode[],
    payLine: "50/50 or three installments. The payment provider takes a fee per sale.",
    gets: [
      "Products with images, prices, and basic size or colour options",
      "Cart and checkout",
      "Local payment gateway connection",
      "Order list and statuses",
      "Basic customer accounts",
      "Bilingual storefront, one hour of training, 60 days of support",
    ],
    nots: ["Multi-vendor marketplace", "Deep inventory sync", "Native apps", "Product photography"],
  },
  {
    id: "integration",
    name: "System Integration",
    price: "8,000",
    time: "Quoted after a short look",
    fit: "Connect tools you already use so data is not typed twice.",
    pay: ["one-time"] as PayMode[],
    payLine: "Fixed quote, usually 50% to start and 50% on delivery.",
    gets: [
      "Forms into a CRM or spreadsheet",
      "Payments into an accounting export",
      "Stock linked to the store",
      "WhatsApp Business basics",
    ],
    nots: ["A full custom system", "Third-party licences", "Cleaning years of old data"],
  },
  {
    id: "app",
    name: "Mobile App MVP",
    price: "55,000",
    time: "8–14 weeks",
    fit: "One focused app for iOS and Android from a single codebase.",
    pay: ["one-time", "installments"] as PayMode[],
    payLine: "Milestones 40% / 30% / 20% / 10%, or three to four monthly payments after scope is locked.",
    gets: [
      "A short discovery to lock the journeys",
      "Flutter or React Native app",
      "Login and the agreed screens only",
      "API, simple admin, and push notifications",
      "Help submitting to the app stores",
      "Two months of support and a training session",
    ],
    nots: ["Unlimited features after lock", "Full staff operations", "Apple or Google account fees"],
  },
  {
    id: "platform",
    name: "Custom Platform",
    price: "120,000",
    time: "3–5 months after discovery",
    fit: "Accounts, roles, and the screens your team runs the business on.",
    pay: ["one-time", "installments", "subscription"] as PayMode[],
    payLine: "Discovery QAR 4,000–6,000, credited if you proceed. Then 40 / 30 / 20 / 10. Optional monthly care after launch.",
    gets: [
      "Written scope after discovery",
      "Customer web app and staff dashboards",
      "Payments or recurring billing when needed",
      "Operational workflows",
      "Optional companion app",
      "Bilingual screens, training, and handover notes",
    ],
    nots: ["Sold as a website package", "Open scope", "Hosting, SMS, or gateway fees"],
  },
] as const;

export const carePlans = [
  { name: "Essential", price: "1,200", hours: "2 hours of changes", response: "48 hours" },
  { name: "Growth", price: "2,400", hours: "5 hours of changes", response: "24 hours" },
  { name: "Priority", price: "4,000", hours: "10 hours of changes", response: "Same business day" },
] as const;

export const faqs = [
  {
    q: "Can every package be paid in installments?",
    a: "Landing, Starter, and a simple integration are usually one payment or 50/50. Business and above can use milestones or up to three monthly payments, written in the proposal.",
  },
  {
    q: "Is the care plan required?",
    a: "No. Each build includes a free support window. Care plans are optional monthly subscriptions after that.",
  },
  {
    q: "Do installment plans include interest?",
    a: "No. You pay the same project total, split across the dates in the proposal.",
  },
  {
    q: "Do I own the code?",
    a: "Yes, after the final project payment. Hosting and payment accounts stay in your name.",
  },
  {
    q: "Is Arabic included?",
    a: "Business and higher include full Arabic and English. Starter is ready for Arabic text you provide. A landing page can add Arabic as an extra.",
  },
  {
    q: "How do I get a formal quote?",
    a: "Message 6645 4489 with the package, language, and timeline. You get a written proposal before any paid build.",
  },
] as const;

export type PackageId = (typeof packages)[number]["id"];
