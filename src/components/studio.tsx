import { useEffect, useState } from "react";
import { ArrowRight, Share2 } from "lucide-react";
import { DemoWebsite, type DemoPackage } from "@/components/demo-websites";
import { packages, type PackageId } from "@/lib/content";

const STORAGE_KEY = "alden-dream";
const LANGUAGE_STORAGE_KEY = "alden-demo-language";

type TradeId = "restaurant" | "boutique" | "clinic" | "gym" | "salon" | "firm" | "property";
type Language = "en" | "ar";

type Item = { name: string; meta: string; price: string };

type Trade = {
  id: TradeId;
  label: string;
  packageId: DemoPackage;
  verb: string;
  listLabel: string;
  bookLabel: string;
  defaultName: string;
  defaultLine: string;
  items: Item[];
  times: string[];
};

const trades: Trade[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    packageId: "bookings",
    verb: "Reserve",
    listLabel: "Menu",
    bookLabel: "Table",
    defaultName: "Olive & Ember",
    defaultLine: "Seasonal plates. Quiet evenings.",
    items: [
      { name: "Charred prawns", meta: "Starter", price: "48" },
      { name: "Lamb shoulder", meta: "Main", price: "92" },
      { name: "Date cake", meta: "Sweet", price: "36" },
    ],
    times: ["18:30", "19:30", "20:30", "21:00"],
  },
  {
    id: "boutique",
    label: "Boutique",
    packageId: "store",
    verb: "Buy",
    listLabel: "Shop",
    bookLabel: "Bag",
    defaultName: "Maison Lune",
    defaultLine: "Soft tailoring for the new season.",
    items: [
      { name: "Linen set", meta: "Ready to wear", price: "420" },
      { name: "Silk scarf", meta: "Accessories", price: "180" },
      { name: "Evening coat", meta: "Limited", price: "890" },
    ],
    times: ["Pickup today", "Pickup tomorrow", "Deliver in Doha"],
  },
  {
    id: "clinic",
    label: "Clinic",
    packageId: "bookings",
    verb: "Book",
    listLabel: "Care",
    bookLabel: "Visit",
    defaultName: "ClearCare",
    defaultLine: "Care that fits your afternoon.",
    items: [
      { name: "Consultation", meta: "30 min", price: "250" },
      { name: "Dental clean", meta: "45 min", price: "180" },
      { name: "Skin check", meta: "20 min", price: "220" },
    ],
    times: ["Tomorrow 9:00", "Tomorrow 16:30", "Thursday 11:00"],
  },
  {
    id: "gym",
    label: "Gym",
    packageId: "business",
    verb: "Join",
    listLabel: "Plans",
    bookLabel: "Join",
    defaultName: "Forge",
    defaultLine: "Show up. Lift more.",
    items: [
      { name: "Drop-in", meta: "One class", price: "80" },
      { name: "Monthly", meta: "Unlimited", price: "350" },
      { name: "Quarter", meta: "Best value", price: "900" },
    ],
    times: ["Start Monday", "Start today", "Trial class first"],
  },
  {
    id: "salon",
    label: "Salon",
    packageId: "bookings",
    verb: "Book",
    listLabel: "Services",
    bookLabel: "Chair",
    defaultName: "Atelier Rose",
    defaultLine: "Colour, cut, and calm.",
    items: [
      { name: "Cut and style", meta: "45 min", price: "150" },
      { name: "Full colour", meta: "2 hours", price: "280" },
      { name: "Bridal", meta: "Half day", price: "1,200" },
    ],
    times: ["Thu 16:30", "Fri 11:00", "Sat 13:00"],
  },
  {
    id: "firm",
    label: "Professional",
    packageId: "business",
    verb: "Enquire",
    listLabel: "Practice",
    bookLabel: "Consult",
    defaultName: "North & Co.",
    defaultLine: "Advice that holds up in writing.",
    items: [
      { name: "Corporate", meta: "Companies", price: "Consult" },
      { name: "Private clients", meta: "Family", price: "Consult" },
      { name: "Disputes", meta: "When it matters", price: "Consult" },
    ],
    times: ["This week", "Next week", "Call first"],
  },
  {
    id: "property",
    label: "Property",
    packageId: "business",
    verb: "View",
    listLabel: "Homes",
    bookLabel: "Viewing",
    defaultName: "Harbour Homes",
    defaultLine: "Homes worth the viewing.",
    items: [
      { name: "West Bay", meta: "2 bed", price: "12,000" },
      { name: "The Pearl", meta: "3 bed", price: "18,500" },
      { name: "Lusail", meta: "Villa", price: "22,000" },
    ],
    times: ["Today 17:00", "Tomorrow 10:00", "Saturday morning"],
  },
];

const areas = ["West Bay", "The Pearl", "Lusail", "Al Sadd", "Msheireb"];
const packageOptions = (trade: TradeId): DemoPackage[] =>
  trade === "restaurant"
    ? ["business", "bookings", "store"]
    : trade === "boutique"
      ? ["business", "store"]
      : ["business", "bookings"];

const arabicAreas: Record<string, string> = {
  "West Bay": "الخليج الغربي",
  "The Pearl": "اللؤلؤة",
  Lusail: "لوسيل",
  "Al Sadd": "السد",
  Msheireb: "مشيرب",
};

const arabicPreviews: Record<
  TradeId,
  {
    business: string;
    line: string;
    listLabel: string;
    verb: string;
    bookLabel: string;
    items: Item[];
    times: string[];
  }
> = {
  restaurant: {
    business: "زيتون وجمر",
    line: "أطباق موسمية. أمسيات هادئة.",
    listLabel: "القائمة",
    verb: "احجز",
    bookLabel: "طاولة",
    items: [
      { name: "جمبري مشوي", meta: "مقبلات", price: "48" },
      { name: "كتف ضأن", meta: "طبق رئيسي", price: "92" },
      { name: "كيكة التمر", meta: "حلوى", price: "36" },
    ],
    times: ["18:30", "19:30", "20:30", "21:00"],
  },
  boutique: {
    business: "دار القمر",
    line: "أزياء أنيقة للموسم الجديد.",
    listLabel: "تسوّق",
    verb: "اطلب",
    bookLabel: "حقيبة التسوق",
    items: [
      { name: "طقم كتان", meta: "أزياء جاهزة", price: "420" },
      { name: "وشاح حرير", meta: "إكسسوارات", price: "180" },
      { name: "معطف سهرة", meta: "إصدار محدود", price: "890" },
    ],
    times: ["استلام اليوم", "استلام غداً", "توصيل في الدوحة"],
  },
  clinic: {
    business: "كلير كير",
    line: "رعاية تناسب وقتك.",
    listLabel: "الخدمات",
    verb: "احجز",
    bookLabel: "زيارة",
    items: [
      { name: "استشارة", meta: "30 دقيقة", price: "250" },
      { name: "تنظيف أسنان", meta: "45 دقيقة", price: "180" },
      { name: "فحص البشرة", meta: "20 دقيقة", price: "220" },
    ],
    times: ["غداً 9:00", "غداً 16:30", "الخميس 11:00"],
  },
  gym: {
    business: "فورج",
    line: "ابدأ اليوم. تقدّم كل يوم.",
    listLabel: "الخطط",
    verb: "انضم",
    bookLabel: "الاشتراك",
    items: [
      { name: "زيارة واحدة", meta: "حصة واحدة", price: "80" },
      { name: "شهري", meta: "دخول غير محدود", price: "350" },
      { name: "ثلاثة أشهر", meta: "أفضل قيمة", price: "900" },
    ],
    times: ["ابدأ الاثنين", "ابدأ اليوم", "جرّب حصة أولاً"],
  },
  salon: {
    business: "أتيليه روز",
    line: "لون وقصّة ووقت لك.",
    listLabel: "الخدمات",
    verb: "احجز",
    bookLabel: "موعد",
    items: [
      { name: "قص وتصفيف", meta: "45 دقيقة", price: "150" },
      { name: "صبغة كاملة", meta: "ساعتان", price: "280" },
      { name: "تصفيف زفاف", meta: "نصف يوم", price: "1,200" },
    ],
    times: ["الخميس 16:30", "الجمعة 11:00", "السبت 13:00"],
  },
  firm: {
    business: "نورث وشركاه",
    line: "مشورة مهنية واضحة يمكنك الاعتماد عليها.",
    listLabel: "مجالات العمل",
    verb: "استفسر",
    bookLabel: "استشارة",
    items: [
      { name: "الشركات", meta: "للأعمال", price: "Consult" },
      { name: "العملاء الأفراد", meta: "شؤون عائلية", price: "Consult" },
      { name: "النزاعات", meta: "عند الحاجة", price: "Consult" },
    ],
    times: ["هذا الأسبوع", "الأسبوع القادم", "اتصل أولاً"],
  },
  property: {
    business: "هاربور هومز",
    line: "منازل تستحق الزيارة.",
    listLabel: "العقارات",
    verb: "استعرض",
    bookLabel: "موعد معاينة",
    items: [
      { name: "الخليج الغربي", meta: "غرفتان", price: "12,000" },
      { name: "اللؤلؤة", meta: "3 غرف", price: "18,500" },
      { name: "لوسيل", meta: "فيلا", price: "22,000" },
    ],
    times: ["اليوم 17:00", "غداً 10:00", "السبت صباحاً"],
  },
};

type Draft = {
  trade: TradeId;
  business: string;
  line: string;
  area: string;
};

const initial: Draft = {
  trade: "restaurant",
  business: "Olive & Ember",
  line: "Seasonal plates. Quiet evenings.",
  area: "West Bay",
};

export function Studio({ onKeep }: { onKeep: (summary: string, packageId: PackageId) => void }) {
  const [draft, setDraft] = useState<Draft>(initial);
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  const [picked, setPicked] = useState(0);
  const [when, setWhen] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<DemoPackage>("bookings");

  useEffect(() => {
    let restored: Draft = initial;
    let restoredLanguage: Language = "en";
    try {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage === "ar" || savedLanguage === "en") restoredLanguage = savedLanguage;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Draft>;
        restored = {
          ...initial,
          ...saved,
          trade: trades.some((item) => item.id === saved.trade)
            ? (saved.trade as TradeId)
            : initial.trade,
          business: typeof saved.business === "string" ? saved.business : initial.business,
          line: typeof saved.line === "string" ? saved.line : initial.line,
          area:
            typeof saved.area === "string" && areas.includes(saved.area)
              ? saved.area
              : initial.area,
        };
      }
    } catch {
      /* ignore broken drafts */
    }
    const params = new URLSearchParams(window.location.search);
    let nextTrade = trades.find((entry) => entry.id === restored.trade) ?? trades[0];
    if (params.get("demo") === "1") {
      const sharedTrade = params.get("trade");
      nextTrade = trades.find((entry) => entry.id === sharedTrade) ?? nextTrade;
      const sharedPackage = params.get("package") as DemoPackage | null;
      setSelectedPackage(
        sharedPackage && packageOptions(nextTrade.id).includes(sharedPackage)
          ? sharedPackage
          : nextTrade.packageId,
      );
      restoredLanguage = params.get("lang") === "ar" ? "ar" : "en";
      restored = {
        ...restored,
        trade: nextTrade.id,
        business: (params.get("business") ?? restored.business).slice(0, 48),
        line: (params.get("line") ?? restored.line).slice(0, 100),
        area: areas.includes(params.get("area") ?? "")
          ? (params.get("area") as string)
          : restored.area,
      };
    } else {
      setSelectedPackage(nextTrade.packageId);
    }
    setDraft(restored);
    setLanguage(restoredLanguage);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, ready]);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({
      demo: "1",
      trade: draft.trade,
      lang: language,
      business: draft.business.trim() || trades.find((item) => item.id === draft.trade)!.defaultName,
      line: draft.line.trim() || trades.find((item) => item.id === draft.trade)!.defaultLine,
      area: draft.area,
      package: selectedPackage,
    }).toString();
    window.history.replaceState(window.history.state, "", url);
  }, [draft, language, ready, selectedPackage]);

  const trade = trades.find((item) => item.id === draft.trade) ?? trades[0];
  const name = draft.business.trim() || trade.defaultName;
  const line = draft.line.trim() || trade.defaultLine;
  const localized = arabicPreviews[draft.trade];
  const previewName =
    language === "ar" && draft.business === trade.defaultName ? localized.business : name;
  const previewLine = language === "ar" && draft.line === trade.defaultLine ? localized.line : line;
  const previewItems = language === "ar" ? localized.items : trade.items;
  const previewTimes = language === "ar" ? localized.times : trade.times;
  const previewItem = previewItems[picked] ?? previewItems[0];
  const previewTime = previewTimes[when] ?? previewTimes[0];
  const previewArea = language === "ar" ? (arabicAreas[draft.area] ?? draft.area) : draft.area;

  function chooseTrade(id: TradeId) {
    const next = trades.find((entry) => entry.id === id) ?? trades[0];
    setDraft((current) => ({
      ...current,
      trade: id,
      business:
        current.business === trade.defaultName || current.business.trim() === ""
          ? next.defaultName
          : current.business,
      line:
        current.line === trade.defaultLine || current.line.trim() === ""
          ? next.defaultLine
          : current.line,
    }));
    setPicked(0);
    setWhen(0);
    setSelectedPackage(next.packageId);
  }

  function choosePackage(id: DemoPackage) {
    setSelectedPackage(id);
    setPicked(0);
    setWhen(0);
  }

  function shareDemo() {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({
      demo: "1",
      trade: draft.trade,
      lang: language,
      business: name,
      line,
      area: draft.area,
      package: selectedPackage,
    }).toString();
    const message = `Try this website direction for ${name}: ${url.toString()}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const packageName =
    packages.find((item) => item.id === selectedPackage)?.name ?? "Business Website";
  const packageDetail =
    selectedPackage === "bookings"
      ? `${previewItem.name} · ${previewTime}`
      : selectedPackage === "store"
        ? `${previewItem.name} · sample order`
        : `Enquiry about ${previewItem.name}`;
  const summary = `${name} · ${trade.label} · ${packageName} · ${draft.area} · ${packageDetail} · ${language === "ar" ? "Arabic preview" : "English preview"}`;

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
        Your site, before you hire
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl">
        Make a site direction you can actually try.
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Explore a full website shaped for each kind of business: its own layout, useful details, and
        the actions customers actually take. Personalize the name and area, then try the experience.
        Nothing is submitted as a real order or booking.
      </p>

      <ol className="mt-6 grid gap-3 rounded-2xl border border-line bg-surface p-4 text-sm sm:grid-cols-3 sm:p-5">
        {[
          ["01", "Choose a business"],
          ["02", "Make it yours"],
          ["03", "Explore the full website"],
        ].map(([number, label]) => (
          <li key={number} className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper-deep text-xs font-semibold text-ink-soft">
              {number}
            </span>
            <span className="font-medium">{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
              Business
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {trades.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`h-10 rounded-full px-3 text-sm font-semibold ${draft.trade === entry.id ? "bg-ink text-paper" : "bg-surface text-ink-soft"}`}
                  onClick={() => chooseTrade(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
              Website package
            </legend>
            <div className="mt-2 space-y-2">
              {packageOptions(draft.trade).map((id) => {
                const item = packages.find((entry) => entry.id === id)!;
                const detail =
                  id === "business"
                    ? "Pages and customer enquiries"
                    : id === "bookings"
                      ? "Services, availability and bookings"
                      : "Products, cart and sample orders";
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selectedPackage === id}
                    onClick={() => choosePackage(id)}
                    className={`w-full rounded-xl border p-3 text-start ${selectedPackage === id ? "border-copper bg-paper-deep" : "border-line bg-surface"}`}
                  >
                    <span className="flex justify-between gap-2 text-sm font-semibold">
                      <span>{item.name}</span>
                      <span>QAR {item.price}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">{detail}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="block text-sm font-medium">
            Name on the site
            <input
              value={draft.business}
              onChange={(event) =>
                setDraft((current) => ({ ...current, business: event.target.value }))
              }
              className="mt-1 h-12 w-full rounded-xl border border-line bg-surface px-3"
            />
          </label>
          <label className="block text-sm font-medium">
            One line customers should remember
            <input
              value={draft.line}
              onChange={(event) =>
                setDraft((current) => ({ ...current, line: event.target.value }))
              }
              className="mt-1 h-12 w-full rounded-xl border border-line bg-surface px-3"
            />
          </label>
          <label className="block text-sm font-medium">
            Area
            <select
              value={draft.area}
              onChange={(event) =>
                setDraft((current) => ({ ...current, area: event.target.value }))
              }
              className="mt-1 h-12 w-full rounded-xl border border-line bg-surface px-3"
            >
              {areas.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
              Preview language
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ["en", "English"],
                  ["ar", "العربية"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={language === id}
                  className={`h-11 rounded-xl text-sm font-semibold ${language === id ? "bg-ink text-paper" : "border border-line bg-surface"}`}
                  onClick={() => setLanguage(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-copper text-sm font-semibold text-ink"
            onClick={() => onKeep(summary, selectedPackage)}
          >
            Use this direction in my enquiry <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-semibold text-ink-soft hover:bg-paper"
            onClick={shareDemo}
          >
            <Share2 size={16} /> Share this demo on WhatsApp
          </button>
          <p className="text-xs text-muted">This demo is showing the {packageName} package.</p>
        </form>

        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <p className="ml-2 min-w-0 truncate text-xs text-muted">
              {name.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yours"}.qa
            </p>
            <span className="ml-auto shrink-0 text-xs font-medium text-muted">
              {language === "ar"
                ? "نموذج تجريبي · لا توجد معاملات حقيقية"
                : "Concept demo · no live transactions"}
            </span>
          </div>
          <DemoWebsite
            key={`${draft.trade}-${selectedPackage}`}
            sector={draft.trade}
            packageId={selectedPackage}
            name={previewName}
            line={previewLine}
            area={previewArea}
            language={language}
            items={previewItems}
            times={previewTimes}
            picked={picked}
            setPicked={setPicked}
            onAction={(_summary, index) => setWhen(index)}
          />
        </div>
      </div>
    </section>
  );
}
