import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Languages,
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";
import { Studio } from "@/components/studio";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP,
  carePlans,
  faqs,
  packages,
  type PackageId,
  type PayMode,
} from "@/lib/content";

export const Route = createFileRoute("/")({ component: Home });

type View = "home" | "styles" | "packages" | "faq" | "enquire";

const payLabel: Record<PayMode, string> = {
  "one-time": "One-time",
  installments: "Installments",
  subscription: "Subscription",
};

function Home() {
  const [view, setView] = useState<View>("home");
  const [open, setOpen] = useState(false);
  const [pkg, setPkg] = useState<PackageId>("business");
  const [payPref, setPayPref] = useState("One-time / 50-50");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [goal, setGoal] = useState("Get more enquiries");
  const [timeline, setTimeline] = useState("Not sure yet");
  const [currentSite, setCurrentSite] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1") {
      setView("styles");
    }
  }, []);

  const enquiry = useMemo(() => {
    const label = packages.find((item) => item.id === pkg)?.name ?? "Project";
    const lines = [
      "Hello Alden Digital Solutions,",
      "",
      `Package: ${label}`,
      `Main goal: ${goal}`,
      `Target timeline: ${timeline}`,
      `Payment preference: ${payPref}`,
      name.trim() ? `Name: ${name.trim()}` : "",
      company.trim() ? `Company: ${company.trim()}` : "",
      currentSite.trim() ? `Current website: ${currentSite.trim()}` : "",
      note.trim() ? `Notes: ${note.trim()}` : "",
    ].filter(Boolean);
    return `${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [pkg, goal, timeline, payPref, name, company, currentSite, note]);

  function go(next: View, id?: PackageId) {
    if (id) setPkg(id);
    setView(next);
    setOpen(false);
    window.scrollTo(0, 0);
  }

  const nav = [
    ["home", "Home"],
    ["styles", "Build a demo"],
    ["packages", "Packages"],
    ["faq", "FAQ"],
    ["enquire", "Enquire"],
  ] as const;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header
        className={`${view === "styles" ? "relative" : "sticky top-0"} z-30 border-b border-line bg-paper/90 backdrop-blur-md`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <button
            type="button"
            className="font-display text-xl font-medium tracking-tight"
            onClick={() => go("home")}
          >
            Alden
            <span className="text-copper"> Digital</span>
          </button>
          <nav className="hidden items-center gap-6 text-sm font-medium text-ink-soft md:flex">
            {nav.slice(0, 4).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={view === id ? "text-ink" : undefined}
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className="rounded-full bg-ink px-4 py-2.5 text-paper"
              onClick={() => go("enquire")}
            >
              Enquire
            </button>
          </nav>
          <a
            href={WHATSAPP}
            className="hidden h-11 items-center rounded-full bg-copper px-4 text-sm font-semibold text-surface md:inline-flex"
          >
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-line px-5 py-3 md:hidden">
            {nav.map(([id, label]) => (
              <button
                key={id}
                type="button"
                className="rounded-xl px-3 py-3 text-left font-medium"
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        {view === "home" && (
          <>
            <section className="mx-auto max-w-6xl px-5 pb-10 pt-7 md:pt-10">
              <div className="relative overflow-hidden rounded-hero bg-ink text-paper">
                <div className="grid lg:grid-cols-2">
                  <div className="relative z-10 px-6 py-12 md:px-12 md:py-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                      Independent digital studio · Doha, Qatar
                    </p>
                    <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.04] font-medium tracking-tight text-balance md:text-6xl">
                      Your next customer is already looking.
                    </h1>
                    <p className="mt-5 max-w-xl text-base text-paper/75 md:text-lg">
                      Give them a clear way to discover your business, book a service, or place an
                      order—with a fast, thoughtful website built for Qatar.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-copper px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                        onClick={() => go("styles")}
                      >
                        Try the interactive demo <ArrowRight size={16} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-12 items-center rounded-full border border-paper/30 px-5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
                        onClick={() => go("packages")}
                      >
                        Explore packages
                      </button>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-5 text-sm text-paper/75">
                      <span className="inline-flex items-center gap-2">
                        <Languages size={16} className="text-copper" /> English + Arabic ready
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Check size={16} className="text-copper" /> Clear scope and pricing
                      </span>
                    </div>
                  </div>
                  <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-ink-soft p-6 md:p-10">
                    <div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-paper/10" />
                    <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-paper/10" />
                    <div className="relative w-full max-w-sm rounded-hero bg-surface p-3 text-ink shadow-2xl">
                      <div className="overflow-hidden rounded-[var(--radius-card)] bg-paper">
                        <div className="flex items-center justify-between border-b border-line px-4 py-3">
                          <span className="font-display text-sm font-semibold">Olive & Ember</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                            Concept demo
                          </span>
                        </div>
                        <div className="px-5 pb-5 pt-7">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper">
                            West Bay · Doha
                          </p>
                          <h2 className="mt-2 font-display text-3xl leading-tight">
                            An evening worth making time for.
                          </h2>
                          <p className="mt-2 text-xs text-muted">
                            Seasonal plates, warm service, a table waiting for you.
                          </p>
                          <div className="mt-5 rounded-2xl bg-surface p-3">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span>Tonight</span>
                              <span className="text-muted">2 guests</span>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              {["18:30", "19:30", "20:30"].map((slot, index) => (
                                <span
                                  key={slot}
                                  className={`rounded-lg px-2 py-2 text-center text-xs font-semibold ${index === 1 ? "bg-ink text-paper" : "bg-paper-deep text-ink-soft"}`}
                                >
                                  {slot}
                                </span>
                              ))}
                            </div>
                            <div className="mt-3 flex h-10 items-center justify-center gap-2 rounded-full bg-copper text-xs font-semibold">
                              <CalendarDays size={14} /> Find a table
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 rounded-xl border border-paper/15 bg-ink px-3 py-2 text-[11px] text-paper/75 md:bottom-8 md:left-8">
                      A sample flow · no client results implied
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-20 sm:grid-cols-3">
              {[
                {
                  icon: <MessageCircle size={18} />,
                  title: "More useful enquiries",
                  body: "Help people understand your offer and take the next step on WhatsApp or a form.",
                },
                {
                  icon: <CalendarDays size={18} />,
                  title: "Bookings without the back-and-forth",
                  body: "Show services, availability, and the details customers need before they get in touch.",
                },
                {
                  icon: <ShoppingBag size={18} />,
                  title: "A simpler route to checkout",
                  body: "Present your products clearly and make it easier for customers to place an order.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[var(--radius-card)] border border-line bg-surface p-5 md:p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper-deep text-copper-deep">
                    {item.icon}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-medium">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </article>
              ))}
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-16">
              <div className="grid gap-8 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:grid-cols-[0.9fr_1.1fr] md:p-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                    Built for customer-facing businesses
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance md:text-4xl">
                    Give customers a better way to choose you.
                  </h2>
                  <p className="mt-3 text-sm text-muted">
                    Start with the job your site needs to do. The design and features follow from
                    that—not from a one-size-fits-all template.
                  </p>
                  <button
                    type="button"
                    onClick={() => go("styles")}
                    className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper"
                  >
                    Explore business demos <ArrowRight size={15} />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Food & hospitality", "Menus, location details, and table enquiries."],
                    ["Shops & product brands", "Product discovery, carts, and checkout."],
                    ["Clinics & personal care", "Services, appointment requests, and clear guidance."],
                    ["Property & professional services", "Listings or expertise presented with a clear next step."],
                  ].map(([title, body]) => (
                    <article key={title} className="rounded-2xl border border-line bg-paper p-4">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted">{body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-y border-line bg-surface">
              <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                      Choose the right starting point
                    </p>
                    <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight text-balance md:text-5xl">
                      Built around what customers need to do.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => go("packages")}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold hover:bg-paper"
                  >
                    See all packages <ArrowRight size={15} />
                  </button>
                </div>
                <div className="mt-9 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: <Languages size={18} />,
                      id: "business" as PackageId,
                      name: "Business website",
                      price: "14,000",
                      copy: "A bilingual home for your brand, services, and enquiries.",
                      meta: "English + Arabic · up to 12 pages",
                    },
                    {
                      icon: <CalendarDays size={18} />,
                      id: "bookings" as PackageId,
                      name: "Booking system",
                      price: "22,000",
                      copy: "Let clients compare services and request a suitable slot.",
                      meta: "For clinics, salons, tutors, and consultants",
                    },
                    {
                      icon: <ShoppingBag size={18} />,
                      id: "store" as PackageId,
                      name: "Online store",
                      price: "28,000",
                      copy: "A considered storefront with catalogue, cart, and checkout.",
                      meta: "Bilingual storefront · order desk",
                    },
                  ].map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-5 md:p-6"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper-deep text-copper-deep">
                          {item.icon}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                          From QAR
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-medium">{item.name}</h3>
                      <p className="mt-1 font-display text-3xl font-medium">{item.price}</p>
                      <p className="mt-3 text-sm text-ink-soft">{item.copy}</p>
                      <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
                        {item.meta}
                      </p>
                      <button
                        type="button"
                        onClick={() => go("enquire", item.id)}
                        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper hover:bg-ink-soft"
                      >
                        Discuss this package <ArrowRight size={15} />
                      </button>
                    </article>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted">
                  Prices are starting points in QAR. Final scope and payment milestones are
                  confirmed in a written proposal.
                </p>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
              <div className="grid gap-8 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                    A clear, collaborative process
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance md:text-5xl">
                    No mystery between first message and launch.
                  </h2>
                  <p className="mt-4 max-w-md text-muted">
                    You’ll know what is included, what you need to provide, and when each decision
                    is due.
                  </p>
                  <button
                    type="button"
                    onClick={() => go("enquire")}
                    className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-copper px-5 text-sm font-semibold text-ink"
                  >
                    Talk through your project <ArrowRight size={15} />
                  </button>
                </div>
                <div className="divide-y divide-line border-y border-line lg:col-span-3">
                  {[
                    [
                      "01",
                      "Scope",
                      "Share the goal, audience, content, and any existing tools. We recommend a package or quote a focused discovery.",
                    ],
                    [
                      "02",
                      "Direction",
                      "Agree the page list, languages, integrations, timeline, and price in writing before the build begins.",
                    ],
                    [
                      "03",
                      "Build and review",
                      "See the work in progress, give feedback in the included revision rounds, and check it on mobile.",
                    ],
                    [
                      "04",
                      "Launch and handover",
                      "Your site goes live with the agreed handover and support window. Optional monthly care is available.",
                    ],
                  ].map(([number, title, body]) => (
                    <article
                      key={number}
                      className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5"
                    >
                      <span className="font-display text-xl text-copper">{number}</span>
                      <div>
                        <h3 className="font-display text-xl font-medium">{title}</h3>
                        <p className="mt-1 text-sm text-muted">{body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-5 pb-16">
              <div className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-paper-deep p-6 md:flex-row md:items-center md:justify-between md:p-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-deep">
                    Straight answers, before you commit
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-medium">
                    A real person. A written proposal.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-ink-soft">
                    Message us with what you’re building. We’ll talk through fit, timing, and a
                    sensible next step.
                  </p>
                </div>
                <a
                  href={WHATSAPP}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper"
                >
                  WhatsApp {PHONE_DISPLAY} <ArrowRight size={15} />
                </a>
              </div>
            </section>

            <section className="border-y border-line bg-surface">
              <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:py-16">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                    Clear from day one
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
                    Know what happens to your site after launch.
                  </h2>
                  <p className="mt-3 text-sm text-muted">
                    Scope, price, and payment dates are put in writing before work begins. No
                    commitment is made by trying a demo or sending an enquiry.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["You own the work", "Code transfers to you after the final project payment."],
                    ["Your accounts stay yours", "Domain, hosting, and payment accounts are set up in your name."],
                    ["Revisions are included", "Each package states its revision rounds and support window."],
                    ["Care is optional", "Choose a monthly plan after the included support period, or handle updates yourself."],
                  ].map(([title, body]) => (
                    <article key={title} className="rounded-2xl border border-line bg-paper p-4">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted">{body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === "styles" && (
          <Studio
            onKeep={(summary, packageId) => {
              setPkg(packageId);
              setNote((current) => {
                const direction = `Demo direction: ${summary}`;
                return current.includes(direction)
                  ? current
                  : [current.trim(), direction].filter(Boolean).join("\n\n");
              });
              setCompany((current) => current.trim() || summary.split(" · ")[0] || current);
              go("enquire", packageId);
            }}
          />
        )}

        {view === "packages" && (
          <section className="mx-auto max-w-6xl px-5 py-12">
            <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              What you are purchasing.
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Each package lists what is included, what is not, and how you can pay. Custom
              platforms start with paid discovery.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {packages.map((item) => (
                <article
                  key={item.id}
                  className={`rounded-[var(--radius-card)] border p-5 ${
                    item.id === "platform"
                      ? "border-ink bg-ink text-paper md:col-span-2"
                      : item.id === "business"
                        ? "border-copper bg-surface"
                        : "border-line bg-surface"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl font-medium">{item.name}</h2>
                      <p
                        className={`mt-1 text-sm ${item.id === "platform" ? "text-paper/70" : "text-muted"}`}
                      >
                        {item.fit}
                      </p>
                    </div>
                    <p className="text-right">
                      <span
                        className={`block text-xs uppercase tracking-wider ${item.id === "platform" ? "text-paper/60" : "text-muted"}`}
                      >
                        from
                      </span>
                      <span className="font-display text-3xl font-medium">QAR {item.price}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-copper">
                    {item.time}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.pay.map((mode) => (
                      <span
                        key={mode}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.id === "platform"
                            ? "bg-ink-soft text-paper"
                            : "bg-paper-deep text-ink-soft"
                        }`}
                      >
                        {payLabel[mode]}
                      </span>
                    ))}
                  </div>
                  <p
                    className={`mt-3 text-sm ${item.id === "platform" ? "text-paper/80" : "text-ink-soft"}`}
                  >
                    {item.payLine}
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${item.id === "platform" ? "text-paper/50" : "text-muted"}`}
                      >
                        You get
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {item.gets.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${item.id === "platform" ? "text-paper/50" : "text-muted"}`}
                      >
                        Not included
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {item.nots.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`mt-5 inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold ${
                      item.id === "platform" ? "bg-copper text-ink" : "bg-ink text-paper"
                    }`}
                    onClick={() => go("enquire", item.id)}
                  >
                    Enquire on {item.name}
                  </button>
                </article>
              ))}
            </div>

            <h2 className="mt-12 font-display text-3xl font-medium">Monthly care</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Subscription after launch. Cancel with 30 days’ notice. Unused hours do not roll over.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {carePlans.map((planItem) => (
                <article
                  key={planItem.name}
                  className="rounded-[var(--radius-card)] border border-line bg-surface p-5"
                >
                  <h3 className="font-display text-2xl font-medium">{planItem.name}</h3>
                  <p className="mt-2 font-display text-3xl font-medium">QAR {planItem.price}</p>
                  <p className="text-sm text-muted">per month</p>
                  <p className="mt-3 text-sm text-muted">
                    {planItem.hours}. Response {planItem.response}.
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "faq" && (
          <section className="mx-auto max-w-3xl px-5 py-12">
            <h1 className="font-display text-4xl font-medium tracking-tight">FAQ</h1>
            <div className="mt-6 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="rounded-[var(--radius-card)] border border-line bg-surface p-5"
                >
                  <summary className="cursor-pointer font-semibold">{item.q}</summary>
                  <p className="mt-3 text-sm text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {view === "enquire" && (
          <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight">
                Tell us what you need.
              </h1>
              <p className="mt-3 text-muted">
                Your answers are not saved on this site. The button opens a WhatsApp draft to{" "}
                {PHONE_DISPLAY} with your package, goal, and timing so you can review it before
                sending.
              </p>
              <a href={`tel:${PHONE_TEL}`} className="mt-6 inline-flex text-sm font-semibold">
                Or call {PHONE_DISPLAY}
              </a>
              <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
                <h2 className="font-display text-xl font-medium">What happens next?</h2>
                <ol className="mt-3 space-y-2 text-sm text-muted">
                  <li>1. Your message opens in WhatsApp for you to review.</li>
                  <li>2. We discuss fit, scope, and timing.</li>
                  <li>3. You receive a written proposal before any paid work starts.</li>
                </ol>
              </div>
            </div>
            <form
              className="space-y-3 rounded-[var(--radius-card)] border border-line bg-surface p-6"
              onSubmit={(event) => {
                event.preventDefault();
                window.open(enquiry, "_blank", "noopener,noreferrer");
              }}
            >
              <label className="block text-sm font-medium">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm font-medium">
                Company
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                  autoComplete="organization"
                />
              </label>
              <label className="block text-sm font-medium">
                Package
                <select
                  value={pkg}
                  onChange={(event) => setPkg(event.target.value as PackageId)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                >
                  {packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Payment preference
                <select
                  value={payPref}
                  onChange={(event) => setPayPref(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                >
                  <option>One-time / 50-50</option>
                  <option>Installments / milestones</option>
                  <option>Monthly subscription (care)</option>
                  <option>Not sure — advise me</option>
                </select>
              </label>
              <label className="block text-sm font-medium">
                What should the website help you do?
                <select
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                >
                  <option>Get more enquiries</option>
                  <option>Take bookings</option>
                  <option>Sell products online</option>
                  <option>Explain our services clearly</option>
                  <option>Improve or replace our current site</option>
                  <option>Not sure — advise me</option>
                </select>
              </label>
              <label className="block text-sm font-medium">
                When would you like to launch?
                <select
                  value={timeline}
                  onChange={(event) => setTimeline(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                >
                  <option>Not sure yet</option>
                  <option>Within a month</option>
                  <option>In 1–3 months</option>
                  <option>In 3–6 months</option>
                  <option>Just exploring options</option>
                </select>
              </label>
              <label className="block text-sm font-medium">
                Current website, if you have one
                <input
                  type="url"
                  value={currentSite}
                  onChange={(event) => setCurrentSite(event.target.value)}
                  placeholder="https://"
                  className="mt-1 h-12 w-full rounded-xl border border-line bg-paper px-3"
                  autoComplete="url"
                />
              </label>
              <label className="block text-sm font-medium">
                Anything else we should know?
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-paper"
              >
                <MessageCircle size={16} />
                Open WhatsApp
              </button>
              <p className="text-center text-xs text-muted">
                Your answers stay in this page until you open WhatsApp. Review the message before
                sending it.
              </p>
            </form>
          </section>
        )}
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg text-ink">Alden Digital Solutions</p>
          <p>Doha · {PHONE_DISPLAY}</p>
        </div>
      </footer>
    </div>
  );
}
