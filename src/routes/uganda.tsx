import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CircleCheck,
  ExternalLink,
  Code2,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  ShoppingBag,
  Smartphone,
  X,
} from "lucide-react";

export const Route = createFileRoute("/uganda")({
  head: () => ({
    meta: [
      { title: "Alden Digital Solutions | Websites for Ugandan Businesses" },
      {
        name: "description",
        content:
          "Give your business ambition a place to grow online. Explore mobile-first website concepts for businesses in Uganda.",
      },
    ],
  }),
  component: UgandaPage,
});

const photos = {
  hospitality:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=82",
  retail:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=82",
  wellness:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=82",
};

const concepts = {
  hospitality: {
    label: "Food & hospitality",
    name: "Kintu House",
    place: "Kampala · concept",
    headline: "A table worth coming back to.",
    detail: "Thoughtful plates, warm service, and everything you need before you visit.",
    action: "View the menu",
    image: photos.hospitality,
    tag: "Menu · location · bookings",
  },
  retail: {
    label: "Retail & products",
    name: "Mirembe Market",
    place: "Uganda · concept",
    headline: "Made to be part of your everyday.",
    detail: "A considered collection, easy to explore on the phone in your hand.",
    action: "Explore the collection",
    image: photos.retail,
    tag: "Catalogue · enquiries · delivery",
  },
  services: {
    label: "Appointments & services",
    name: "Luma Studio",
    place: "Kampala · concept",
    headline: "Make time for feeling like you.",
    detail: "Clear services, a calm booking path, and the details clients need first.",
    action: "See the services",
    image: photos.wellness,
    tag: "Services · hours · appointment request",
  },
} as const;

type ConceptId = keyof typeof concepts;
type PreviewPackage = "launch" | "business" | "growth";
type PreviewPage = "Home" | "Offer" | "Story" | "Contact";

const previewPackages: Record<
  PreviewPackage,
  { label: string; description: string; includes: string[] }
> = {
  launch: {
    label: "Launch page",
    description: "One focused page for your offer, the essentials, and the next step.",
    includes: ["One clear customer journey", "Core business details", "Call or WhatsApp action"],
  },
  business: {
    label: "Business website",
    description: "A complete website that gives each important part of your business room.",
    includes: ["Separate information pages", "A stronger story and trust", "Clear contact routes"],
  },
  growth: {
    label: "Growth experience",
    description: "A deeper customer journey with a catalogue, booking, or enquiry workflow.",
    includes: [
      "Richer product or service detail",
      "An action shaped to your business",
      "Room to add features",
    ],
  },
};

const previewPageNames: Record<ConceptId, Record<PreviewPackage, string[]>> = {
  hospitality: {
    launch: ["Home"],
    business: ["Home", "Offer", "Story", "Contact"],
    growth: ["Home", "Offer", "Story", "Contact"],
  },
  retail: {
    launch: ["Home"],
    business: ["Home", "Offer", "Story", "Contact"],
    growth: ["Home", "Offer", "Story", "Contact"],
  },
  services: {
    launch: ["Home"],
    business: ["Home", "Offer", "Story", "Contact"],
    growth: ["Home", "Offer", "Story", "Contact"],
  },
};

const previewPageCopy: Record<
  ConceptId,
  Record<
    PreviewPage,
    { eyebrow: string; title: string; copy: string; details: string[]; action: string }
  >
> = {
  hospitality: {
    Home: {
      eyebrow: "A Kampala dining concept",
      title: "A table worth coming back to.",
      copy: "Seasonal plates, a welcoming room, and the useful details guests want before they head out.",
      details: ["Explore the menu", "See the location", "Plan a visit"],
      action: "Explore the menu",
    },
    Offer: {
      eyebrow: "Menu · illustrative sample",
      title: "Made for a slower evening.",
      copy: "A sample menu page can make dishes, ingredients, dietary notes, and current specials easy to browse.",
      details: [
        "Garden greens & toasted groundnuts",
        "Charred market fish with matooke",
        "Passion fruit and ginger tart",
      ],
      action: "Ask about a table",
    },
    Story: {
      eyebrow: "Our story · illustrative sample",
      title: "A little more about the people behind the table.",
      copy: "Give guests a feel for the restaurant, its point of view, and what makes an evening here distinct.",
      details: ["The idea behind the menu", "Seasonal ingredients", "The people who welcome you"],
      action: "Come and visit",
    },
    Contact: {
      eyebrow: "Visit · illustrative sample",
      title: "Make a plan for tonight.",
      copy: "A real site can bring the location, opening hours, reservation method, and accessibility notes together.",
      details: [
        "Location details for your business",
        "Current opening hours",
        "Call or message to enquire",
      ],
      action: "Request a table",
    },
  },
  retail: {
    Home: {
      eyebrow: "A Ugandan retail concept",
      title: "Good things, made to be used.",
      copy: "A considered collection with the details customers need to choose confidently from their phone.",
      details: ["Browse the collection", "See sizes and materials", "Ask about delivery"],
      action: "Browse the collection",
    },
    Offer: {
      eyebrow: "Collection · illustrative sample",
      title: "Find something you’ll keep reaching for.",
      copy: "A catalogue can make each product easy to understand, compare, and ask about—before full online checkout is needed.",
      details: ["Everyday woven tote", "Hand-finished table linen", "Gift sets made in Uganda"],
      action: "Ask about an item",
    },
    Story: {
      eyebrow: "Our story · illustrative sample",
      title: "The care behind each piece.",
      copy: "Show how the products are chosen or made, who makes them, and what the business stands for.",
      details: ["Materials and craft", "People and process", "How to care for your purchase"],
      action: "Meet the collection",
    },
    Contact: {
      eyebrow: "Delivery & help · illustrative sample",
      title: "Know what happens after you choose.",
      copy: "Answer questions about delivery areas, payment, exchanges, and how to reach a real person.",
      details: [
        "Delivery details set by the business",
        "Payment options confirmed at checkout",
        "WhatsApp for product questions",
      ],
      action: "Ask about delivery",
    },
  },
  services: {
    Home: {
      eyebrow: "A Kampala studio concept",
      title: "Make time for feeling like you.",
      copy: "A calm introduction to the studio, its services, and the easiest way to request an appointment.",
      details: ["See available treatments", "Meet the studio", "Request a time"],
      action: "Explore services",
    },
    Offer: {
      eyebrow: "Services · illustrative sample",
      title: "Choose the care that suits you.",
      copy: "Explain what each appointment includes, how long it takes, who it suits, and how to prepare.",
      details: [
        "Signature style session",
        "Restorative hair treatment",
        "Consultation and care plan",
      ],
      action: "Ask about an appointment",
    },
    Story: {
      eyebrow: "Meet the studio · illustrative sample",
      title: "A thoughtful space, shaped around you.",
      copy: "Introduce the team, the atmosphere, and the experience clients can expect when they arrive.",
      details: [
        "The studio’s approach",
        "The people behind the service",
        "Care and accessibility notes",
      ],
      action: "Get to know us",
    },
    Contact: {
      eyebrow: "Appointments · illustrative sample",
      title: "Find a time that works.",
      copy: "A booking flow can show availability or collect a preferred time and service for the studio to confirm.",
      details: [
        "Choose a service",
        "Share a preferred day",
        "Receive confirmation from the business",
      ],
      action: "Request an appointment",
    },
  },
};

const UGANDA_WHATSAPP_NUMBER = "256745793217";
const UGANDA_WHATSAPP_URL = `https://wa.me/${UGANDA_WHATSAPP_NUMBER}`;
const DEFAULT_WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Alden Digital Solutions, I would like to discuss a website for my business in Uganda.",
);

function StandaloneConceptDemo({
  conceptId,
  packageId,
  onClose,
}: {
  conceptId: ConceptId;
  packageId: PreviewPackage;
  onClose: () => void;
}) {
  const [page, setPage] = useState<PreviewPage>("Home");
  const [submitted, setSubmitted] = useState(false);
  const concept = concepts[conceptId];
  const content = previewPageCopy[conceptId][page];
  const pages = previewPageNames[conceptId][packageId];
  const pageLabel = (name: string) =>
    name === "Offer"
      ? conceptId === "hospitality"
        ? "Menu"
        : conceptId === "retail"
          ? "Collection"
          : "Services"
      : name === "Story"
        ? "Our story"
        : name === "Contact"
          ? conceptId === "hospitality"
            ? "Visit"
            : conceptId === "retail"
              ? "Delivery"
              : "Appointments"
          : name;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink/70 p-0 backdrop-blur-sm sm:p-5" role="dialog" aria-modal="true" aria-label={`${concept.name} full website demo`}>
      <div className="mx-auto min-h-full max-w-7xl overflow-hidden bg-paper text-ink shadow-2xl sm:min-h-[min(900px,calc(100vh-40px))] sm:rounded-3xl">
        <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-paper sm:px-7">
          <p className="text-xs font-medium tracking-wide text-paper/75">ILLUSTRATIVE BUSINESS WEBSITE <span className="mx-2 text-copper">/</span> {previewPackages[packageId].label.toUpperCase()}</p>
          <button type="button" onClick={onClose} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-paper/25 px-4 text-sm font-semibold hover:bg-paper/10" aria-label="Close full website demo">Close <X size={16} /></button>
        </div>
        <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
            <button type="button" onClick={() => setPage("Home")} className="font-display text-2xl font-semibold">{concept.name}<span className="text-copper">.</span></button>
            <nav className="flex max-w-full gap-1 overflow-x-auto" aria-label={`${concept.name} sample website`}>
              {pages.map((item) => {
                const name = item as PreviewPage;
                return <button key={item} type="button" onClick={() => { setPage(name); setSubmitted(false); }} aria-current={page === name ? "page" : undefined} className={`min-h-10 shrink-0 rounded-full px-3 text-xs font-semibold sm:px-4 sm:text-sm ${page === name ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"}`}>{pageLabel(name)}</button>;
              })}
            </nav>
          </div>
        </header>
        <main>
          <section className="grid min-h-[450px] lg:grid-cols-[1fr_0.92fr]">
            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-deep">{content.eyebrow}</p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-medium tracking-tight sm:text-5xl lg:text-6xl">{content.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">{content.copy}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {content.details.map((detail) => <li key={detail} className="flex gap-2 text-sm leading-5 text-ink-soft"><CircleCheck size={16} className="mt-0.5 shrink-0 text-copper-deep" />{detail}</li>)}
              </ul>
              <button type="button" onClick={() => { if (packageId === "launch") document.getElementById("concept-contact")?.scrollIntoView({ behavior: "smooth" }); else setPage(page === "Home" ? "Offer" : "Contact"); setSubmitted(false); }} className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-copper px-5 text-sm font-semibold text-ink">{content.action}<ArrowRight size={15} /></button>
            </div>
            <div className="relative min-h-[320px] bg-paper-deep lg:min-h-[500px]">
              <img src={concept.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-surface/95 p-5 shadow-lg backdrop-blur-sm sm:inset-x-7 sm:bottom-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper-deep">{concept.tag}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{concept.place} <span className="mx-1 text-copper">·</span> A fictional concept created to demonstrate a possible website.</p>
              </div>
            </div>
          </section>
          {page === "Home" && <section className="grid gap-4 border-t border-line bg-paper-deep/50 px-5 py-8 sm:grid-cols-3 sm:px-8">{["A clear first impression", "Useful details at a glance", "A next step that feels easy"].map((item, index) => <article key={item} className="rounded-2xl border border-line bg-surface p-5"><span className="text-xs font-bold tracking-widest text-copper-deep">0{index + 1}</span><h2 className="mt-3 font-display text-xl font-medium">{item}</h2><p className="mt-2 text-sm leading-6 text-muted">Content and customer journey would be shaped around the real business.</p></article>)}</section>}
          {page === "Home" && packageId === "launch" && <section className="grid gap-px border-t border-line bg-line md:grid-cols-3">{(["Offer", "Story", "Contact"] as const).map((section) => { const detail = previewPageCopy[conceptId][section]; return <article id={section === "Contact" ? "concept-contact" : undefined} key={section} className="bg-surface px-6 py-9 sm:px-8"><p className="text-xs font-semibold uppercase tracking-wider text-copper-deep">{detail.eyebrow}</p><h2 className="mt-3 font-display text-2xl font-medium">{detail.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{detail.copy}</p><ul className="mt-4 grid gap-2">{detail.details.map((line) => <li key={line} className="flex gap-2 text-sm text-ink-soft"><Check size={15} className="mt-0.5 shrink-0 text-copper-deep" />{line}</li>)}</ul>{section === "Contact" && <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">A real business would add its verified contact details and preferred enquiry route here.</p>}</article>; })}</section>}
          {page === "Contact" && packageId === "growth" && <section className="border-t border-line px-6 py-10 sm:px-10"><div className="mx-auto max-w-xl rounded-3xl border border-line bg-surface p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-copper-deep">Sample enquiry flow</p><h2 className="mt-3 font-display text-3xl font-medium">Make the next step simple.</h2><p className="mt-3 text-sm leading-6 text-muted">A real enquiry or booking flow would be agreed and connected during the project. This preview does not send or store information.</p><form className="mt-6 grid gap-3" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="grid gap-2 text-sm font-semibold">Your name<input required className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal" placeholder="Name" /></label><label className="grid gap-2 text-sm font-semibold">What would you like to ask?<textarea required className="min-h-24 rounded-xl border border-line bg-paper px-4 py-3 font-normal" placeholder="A short message" /></label><button className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-paper" type="submit">Preview enquiry</button>{submitted && <p role="status" className="text-sm font-medium text-copper-deep">Demo only: no message was sent or saved.</p>}</form></div></section>}
        </main>
        <footer className="flex flex-col gap-3 border-t border-line bg-ink px-6 py-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="font-display text-lg font-semibold">{concept.name}<span className="text-copper">.</span></span><span className="text-xs leading-5 text-paper/60">Fictional concept · Sample content · Not a live business</span><button type="button" onClick={onClose} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold hover:text-copper">Back to Alden <ArrowRight size={15} /></button></footer>
      </div>
    </div>
  );
}

function UgandaPage() {
  const [activeConcept, setActiveConcept] = useState<ConceptId>("hospitality");
  const [previewPackage, setPreviewPackage] = useState<PreviewPackage>("business");
  const [previewPage, setPreviewPage] = useState<PreviewPage>("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullDemoOpen, setFullDemoOpen] = useState(false);
  const [business, setBusiness] = useState("");
  const [town, setTown] = useState("");
  const [goal, setGoal] = useState("Get more customer enquiries");
  const selectedConcept = concepts[activeConcept];
  const availablePreviewPages = previewPageNames[activeConcept][previewPackage];
  const selectedPreviewContent = previewPageCopy[activeConcept][previewPage];
  const closeFullDemo = useCallback(() => setFullDemoOpen(false), []);
  const briefText = useMemo(
    () =>
      [
        "Hello Alden Digital Solutions,",
        "",
        `Business: ${business.trim() || "[business name]"}`,
        `Town/area: ${town.trim() || "[town or area]"}`,
        `Website goal: ${goal}`,
        "I would like to discuss scope and a written quote in UGX.",
      ].join("\n"),
    [business, town, goal],
  );
  const whatsAppDraftUrl = useMemo(
    () => `${UGANDA_WHATSAPP_URL}?text=${encodeURIComponent(briefText)}`,
    [briefText],
  );

  function handleBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsAppDraftUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="border-b border-paper/10 bg-ink px-4 py-2 text-center text-xs font-medium tracking-wide text-paper/75">
        ALDEN DIGITAL SOLUTIONS <span className="mx-2 text-copper">/</span> UGANDA EDITION
      </div>

      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="/uganda" className="font-display text-xl font-semibold tracking-tight">
            Alden<span className="text-copper">.</span>
          </a>
          <nav
            className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex"
            aria-label="Main navigation"
          >
            <a className="transition-colors hover:text-copper-deep" href="#approach">
              Approach
            </a>
            <a className="transition-colors hover:text-copper-deep" href="#concepts">
              Concepts
            </a>
            <a className="transition-colors hover:text-copper-deep" href="#services">
              Services
            </a>
            <a className="transition-colors hover:text-copper-deep" href="#process">
              Process
            </a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
              href="#contact"
            >
              Plan a project <ArrowRight size={15} />
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-copper px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              href={`${UGANDA_WHATSAPP_URL}?text=${DEFAULT_WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} /> WhatsApp Alden
            </a>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="grid gap-1 border-t border-line px-5 py-3 lg:hidden"
            aria-label="Mobile navigation"
          >
            {[
              ["Approach", "#approach"],
              ["Concepts", "#concepts"],
              ["Services", "#services"],
              ["Process", "#process"],
              ["Plan a project", "#contact"],
              [
                "WhatsApp +256 745 793 217",
                `${UGANDA_WHATSAPP_URL}?text=${DEFAULT_WHATSAPP_MESSAGE}`,
              ],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-paper-deep"
                onClick={() => setMenuOpen(false)}
                target={href.startsWith("https://") ? "_blank" : undefined}
                rel={href.startsWith("https://") ? "noreferrer" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-7 md:pb-20 md:pt-10">
          <div className="relative isolate overflow-hidden rounded-hero bg-ink text-paper">
            <div className="absolute inset-y-0 right-0 -z-10 hidden w-[48%] lg:block">
              <img
                src={photos.hospitality}
                alt=""
                className="h-full w-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/10" />
            </div>
            <div className="grid min-h-[560px] items-center lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:py-20">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                  <span className="size-1.5 rounded-full bg-copper" />
                  Websites for Ugandan businesses
                </p>
                <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] font-medium tracking-tight text-balance md:text-7xl">
                  Give your ambition <span className="text-copper">room to grow.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-paper/75 md:text-lg md:leading-8">
                  You have a vision for your business. Let’s give it a digital home that tells your
                  story, helps the right people find you, and makes their next step simple. Start
                  with what you need today; build toward what you want next.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#concepts"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Explore website concepts <ArrowRight size={16} />
                  </a>
                  <a
                    href="#approach"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/30 px-6 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
                  >
                    How Alden works <ArrowDown size={15} />
                  </a>
                </div>
                <p className="mt-5 text-sm text-paper/75">
                  Prefer to talk?{" "}
                  <a
                    className="font-semibold text-copper underline decoration-copper/60 underline-offset-4"
                    href={`${UGANDA_WHATSAPP_URL}?text=${DEFAULT_WHATSAPP_MESSAGE}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp +256 745 793 217
                  </a>
                </p>
                <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-paper/15 pt-5 text-sm text-paper/75">
                  <span className="inline-flex items-center gap-2">
                    <Smartphone size={16} className="text-copper" /> Made for mobile first
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CircleCheck size={16} className="text-copper" /> Written project scope
                  </span>
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden lg:min-h-[500px]">
                <img
                  src={photos.hospitality}
                  alt="Warm restaurant interior, used as illustrative imagery"
                  className="absolute inset-0 h-full w-full object-cover lg:hidden"
                />
                <div className="absolute inset-0 bg-ink/55 lg:hidden" />
                <div className="absolute bottom-5 left-5 right-5 z-10 rounded-2xl border border-paper/20 bg-ink/80 p-4 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-sm sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold">Kintu House</p>
                      <p className="mt-1 text-xs text-paper/65">Kampala · illustrative concept</p>
                    </div>
                    <span className="rounded-full border border-paper/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-copper">
                      Sample
                    </span>
                  </div>
                  <p className="mt-4 font-display text-2xl leading-tight">
                    A table worth coming back to.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-paper/15 pt-3 text-xs text-paper/70">
                    <span>Menu · location · enquiry</span>
                    <ArrowRight size={15} className="text-copper" />
                  </div>
                </div>
                <div className="absolute right-7 top-8 hidden rounded-xl border border-paper/20 bg-paper/90 px-4 py-3 text-xs font-semibold text-ink backdrop-blur md:block">
                  Designed around the customer journey
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-right text-xs text-muted">
            Illustrative photography and sample business concept.
          </p>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Smartphone,
                title: "Mobile-first",
                copy: "Fast, clear pages built for the screen customers use most.",
              },
              {
                icon: MessageCircle,
                title: "Easy to enquire",
                copy: "Give people a clear next step, such as a WhatsApp enquiry to your business.",
              },
              {
                icon: Layers3,
                title: "Right-sized scope",
                copy: "Choose a landing page, business site, store, or custom system.",
              },
              {
                icon: Globe2,
                title: "Your accounts, your site",
                copy: "Keep domain and key service accounts in your business's name.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="bg-surface px-6 py-7 md:px-8">
                <Icon size={20} className="text-copper-deep" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="approach"
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-deep">
              The approach
            </p>
            <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight font-medium tracking-tight md:text-5xl">
              The website should do a job for your business.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted">
              Start with the customer’s question, then build the page around the answer and the next
              action. No feature list for its own sake.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                number: "01",
                title: "Help people understand",
                copy: "Explain the offer, service area, important details, and what makes the business a fit.",
              },
              {
                number: "02",
                title: "Make action simple",
                copy: "A clear enquiry, call, booking request, or product path—based on the actual project.",
              },
              {
                number: "03",
                title: "Keep the experience light",
                copy: "Prioritize readable layouts, compressed imagery, and quick access to key information.",
              },
              {
                number: "04",
                title: "Agree the scope in writing",
                copy: "Define pages, features, timeline, payment milestones, ownership, and support before work starts.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="rounded-card border border-line bg-surface p-6 md:p-7"
              >
                <span className="font-display text-sm text-copper-deep">{item.number}</span>
                <h3 className="mt-4 font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="concepts" className="bg-paper-deep/60 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-deep">
                  Explore the demos
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-medium tracking-tight md:text-5xl">
                  Different businesses. Different online journeys.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted">
                These sample businesses are fictional concepts. They show the shape a real project
                could take—not client work or live services.
              </p>
            </div>

            <div
              className="mt-9 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Business website concepts"
            >
              {(Object.keys(concepts) as ConceptId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeConcept === id}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${activeConcept === id ? "bg-ink text-paper" : "border border-line bg-surface text-ink-soft hover:border-ink/30"}`}
                  onClick={() => {
                    setActiveConcept(id);
                    setPreviewPage("Home");
                  }}
                >
                  {concepts[id].label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3" aria-label="Choose a demo scope">
              {(Object.keys(previewPackages) as PreviewPackage[]).map((key) => {
                const option = previewPackages[key];
                const selected = previewPackage === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selected}
                    className={`rounded-card border p-5 text-left transition-colors ${selected ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-ink/40"}`}
                    onClick={() => {
                      setPreviewPackage(key);
                      setPreviewPage("Home");
                    }}
                  >
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${selected ? "text-copper" : "text-copper-deep"}`}
                    >
                      {key === "launch"
                        ? "Focused start"
                        : key === "business"
                          ? "More room"
                          : "More ways to act"}
                    </span>
                    <span className="mt-2 block font-display text-xl font-medium">
                      {option.label}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-6 ${selected ? "text-paper/70" : "text-muted"}`}
                    >
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 overflow-hidden rounded-hero border border-line bg-surface shadow-xl shadow-ink/5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-5 py-4 md:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-line" />
                    <span className="size-2.5 rounded-full bg-line" />
                    <span className="size-2.5 rounded-full bg-line" />
                  </div>
                  <span className="text-xs font-semibold text-muted">
                    {selectedConcept.name} · Uganda
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                  <span className="size-1.5 rounded-full bg-copper" /> Illustrative website preview
                </span>
                <button
                  type="button"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-paper transition-colors hover:bg-ink/85"
                  onClick={() => setFullDemoOpen(true)}
                >
                  Open full website demo <ExternalLink size={14} />
                </button>
              </div>

              <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
                <div className="font-display text-xl font-semibold">
                  {selectedConcept.name}
                  <span className="text-copper">.</span>
                </div>
                <nav
                  className="flex max-w-full gap-1 overflow-x-auto"
                  aria-label={`${selectedConcept.name} demo pages`}
                >
                  {availablePreviewPages.map((page) => {
                    const typedPage = page as PreviewPage;
                    return (
                      <button
                        key={page}
                        type="button"
                        aria-current={previewPage === page ? "page" : undefined}
                        className={`min-h-10 shrink-0 rounded-full px-3 text-xs font-semibold transition-colors ${previewPage === page ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"}`}
                        onClick={() => setPreviewPage(typedPage)}
                      >
                        {page === "Offer"
                          ? activeConcept === "hospitality"
                            ? "Menu"
                            : activeConcept === "retail"
                              ? "Collection"
                              : "Services"
                          : page === "Story"
                            ? "Our story"
                            : page === "Contact"
                              ? activeConcept === "hospitality"
                                ? "Visit"
                                : activeConcept === "retail"
                                  ? "Delivery"
                                  : "Appointments"
                              : page}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="grid lg:grid-cols-[1.05fr_0.95fr]" role="tabpanel">
                <div className="flex flex-col justify-center px-6 py-9 md:px-10 md:py-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-deep">
                    {selectedPreviewContent.eyebrow}
                  </p>
                  <h3 className="mt-4 max-w-xl font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl">
                    {selectedPreviewContent.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted md:text-base md:leading-7">
                    {selectedPreviewContent.copy}
                  </p>
                  <ul className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
                    {selectedPreviewContent.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm leading-5 text-ink-soft"
                      >
                        <CircleCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-copper-deep"
                          aria-hidden="true"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-copper px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                    onClick={() =>
                      setPreviewPage((current) =>
                        current === "Contact" ? "Home" : current === "Home" ? "Offer" : "Contact",
                      )
                    }
                  >
                    {previewPage === "Contact"
                      ? "Back to the homepage"
                      : selectedPreviewContent.action}
                    <ArrowRight size={15} />
                  </button>
                </div>
                <div className="relative min-h-[330px] bg-paper-deep md:min-h-[430px]">
                  <img
                    key={selectedConcept.image}
                    src={selectedConcept.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-surface/95 p-5 shadow-lg backdrop-blur-sm md:inset-x-6 md:bottom-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper-deep">
                      {previewPackages[previewPackage].label} · sample scope
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {previewPackages[previewPackage].includes.map((item) => (
                        <span
                          key={item}
                          className="flex items-start gap-2 text-xs leading-5 text-ink-soft"
                        >
                          <Check
                            size={14}
                            className="mt-0.5 shrink-0 text-copper-deep"
                            aria-hidden="true"
                          />
                          {item}
                        </span>
                      ))}
                    </div>
                    {previewPackage === "growth" && (
                      <p className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">
                        Booking, ordering, payments, and other integrations are confirmed and quoted
                        separately for each real project.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-line bg-paper px-5 py-4 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between md:px-7">
                <span>
                  Every real site is shaped around the business, its customers, and agreed scope.
                </span>
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-copper-deep"
                >
                  Plan your version <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">
              Concept businesses and sample content are fictional. The preview demonstrates how the
              experience can expand by scope; it does not imply client results or connected
              bookings, orders, or payments.
            </p>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-deep">
              What Alden can build
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight md:text-5xl">
              A focused start, or a system that grows with you.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              We’ll recommend the smallest scope that does the job. Every project receives a written
              quote in UGX after the requirements are clear.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Globe2,
                title: "Landing page",
                fit: "One offer, campaign, event, or new business.",
                includes: [
                  "One clear customer journey",
                  "Mobile-first layout",
                  "Call, enquiry, or WhatsApp action",
                ],
              },
              {
                icon: Layers3,
                title: "Business website",
                fit: "Several services, locations, or audiences.",
                includes: [
                  "Custom page structure",
                  "Services and contact details",
                  "Search and sharing basics",
                ],
              },
              {
                icon: ShoppingBag,
                title: "Online store",
                fit: "A product catalogue and a practical order flow.",
                includes: [
                  "Products and categories",
                  "Cart or enquiry-led ordering",
                  "Payment integration scoped separately",
                ],
              },
              {
                icon: Code2,
                title: "Custom system",
                fit: "A workflow that needs more than a public website.",
                includes: [
                  "Discovery before build",
                  "Roles and operating flows",
                  "Milestones and handover agreed",
                ],
              },
            ].map(({ icon: Icon, title, fit, includes }) => (
              <article
                key={title}
                className="flex flex-col rounded-card border border-line bg-surface p-6"
              >
                <Icon size={20} className="text-copper-deep" />
                <h3 className="mt-5 font-display text-2xl font-medium">{title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{fit}</p>
                <ul className="mt-5 grid gap-3 border-t border-line pt-5">
                  {includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-5 text-ink-soft">
                      <Check size={15} className="mt-0.5 shrink-0 text-copper-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  Scoped and quoted in UGX
                </p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">
            Mobile Money, booking, and other third-party integrations depend on provider access,
            fees, testing, and the agreed project scope.
          </p>
        </section>

        <section id="process" className="border-y border-line bg-ink py-16 text-paper md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                  A clear path to launch
                </p>
                <h2 className="mt-4 font-display text-4xl leading-tight font-medium md:text-5xl">
                  Know what happens next.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-paper/65">
                  The exact timeline depends on scope and how quickly content and approvals are
                  ready. Alden confirms it in the written proposal.
                </p>
              </div>
              <ol className="grid gap-0 sm:grid-cols-2">
                {[
                  [
                    "01",
                    "Discovery",
                    "Understand your business, customers, and the job the site needs to do.",
                  ],
                  [
                    "02",
                    "Written scope",
                    "Agree pages, features, timeline, payment milestones, and support in writing.",
                  ],
                  [
                    "03",
                    "Design & build",
                    "Review the direction, then develop the agreed pages and functionality.",
                  ],
                  [
                    "04",
                    "Test & hand over",
                    "Check mobile and desktop, launch, and hand over the site and accounts.",
                  ],
                ].map(([number, title, copy]) => (
                  <li key={number} className="border-t border-paper/20 py-6 sm:pr-7">
                    <span className="text-xs font-semibold tracking-widest text-copper">
                      {number}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-medium">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-paper/65">{copy}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-deep">
              Questions, answered
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-medium md:text-5xl">
              Before you start.
            </h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {[
              [
                "How much does a website cost?",
                "Alden will quote in UGX after confirming what you need. The price, deliverables, exclusions, milestones, and support period should be clear in writing before work begins.",
              ],
              [
                "Can customers contact me on WhatsApp?",
                "A website can include a WhatsApp enquiry action for your business. The project brief on this page opens a separate draft to Alden; review it in WhatsApp and press Send when you are ready.",
              ],
              [
                "Can I take Mobile Money payments online?",
                "It may be possible through a supported provider. Provider approval, transaction fees, settlement, and testing are part of the project discussion.",
              ],
              [
                "Will the sample businesses shown here become real sites?",
                "No. They are fictional concept previews that show possible customer journeys. A real site starts with your own business, content, and agreed scope.",
              ],
              [
                "Who owns the website and accounts?",
                "Ownership, access, and handover are written into the project scope. Domain and service accounts should be created in your business's name.",
              ],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                  <span>{question}</span>
                  <ChevronDown
                    size={18}
                    className="mt-0.5 shrink-0 text-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-2xl pt-4 text-sm leading-6 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-paper-deep/70 px-5 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-hero border border-line bg-surface lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-copper px-6 py-9 text-ink md:px-10 md:py-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em]">Start with the goal</p>
              <h2 className="mt-4 max-w-md font-display text-4xl leading-tight font-medium md:text-5xl">
                Tell us what the website needs to do.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-ink/75">
                Share your business, service area, and the main outcome you need from your website.
                Your message opens in WhatsApp for you to review.
              </p>
              <div className="mt-8 flex items-start gap-3 border-t border-ink/20 pt-5 text-sm leading-6">
                <MessageCircle size={18} className="mt-1 shrink-0" />
                <p>
                  WhatsApp Alden at{" "}
                  <a
                    className="font-semibold underline underline-offset-2"
                    href={UGANDA_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    +256 745 793 217
                  </a>
                  . The message is only sent when you press Send.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-10">
              <form className="grid gap-4" onSubmit={handleBrief}>
                <label className="grid gap-2 text-sm font-semibold">
                  Business name
                  <input
                    value={business}
                    onChange={(event) => setBusiness(event.target.value)}
                    className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal outline-none transition focus:border-copper-deep focus:ring-2 focus:ring-copper/30"
                    placeholder="e.g. your business"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Town or area
                  <input
                    value={town}
                    onChange={(event) => setTown(event.target.value)}
                    className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal outline-none transition focus:border-copper-deep focus:ring-2 focus:ring-copper/30"
                    placeholder="e.g. Kampala, Entebbe, Jinja"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Main website goal
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className="min-h-12 rounded-xl border border-line bg-paper px-4 font-normal outline-none transition focus:border-copper-deep focus:ring-2 focus:ring-copper/30"
                  >
                    <option>Get more customer enquiries</option>
                    <option>Explain our services clearly</option>
                    <option>Show products and take orders</option>
                    <option>Let customers request appointments</option>
                    <option>Improve an existing website</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
                >
                  Prepare my project brief <ArrowRight size={15} />
                </button>
                <p className="text-xs leading-5 text-muted">
                  WhatsApp opens with a draft. Review the details and send it when you are ready.
                </p>
                <p className="text-xs leading-5 text-muted">
                  No pricing or payment details are collected in this brief.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 py-8 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">
              Alden<span className="text-copper">.</span>
            </p>
            <p className="mt-1 text-xs text-paper/60">
              Websites and digital tools for Ugandan businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-paper/70">
            <a className="hover:text-paper" href="#approach">
              Approach
            </a>
            <a className="hover:text-paper" href="#concepts">
              Concepts
            </a>
            <a className="hover:text-paper" href="#contact">
              Project brief
            </a>
            <a
              className="inline-flex items-center gap-1 hover:text-paper"
              href={UGANDA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp +256 745 793 217 <ExternalLink size={13} />
            </a>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-7xl border-t border-paper/15 pt-4 text-xs text-paper/50">
          All demo businesses and interactions are illustrative. No client outcomes are claimed.
        </p>
      </footer>
      {fullDemoOpen && (
        <StandaloneConceptDemo
          conceptId={activeConcept}
          packageId={previewPackage}
          onClose={closeFullDemo}
        />
      )}
    </div>
  );
}

