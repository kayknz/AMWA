import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
} from "lucide-react";

type Sector = "restaurant" | "boutique" | "clinic" | "gym" | "salon" | "firm" | "property";
type Item = { name: string; meta: string; price: string };

const copy = {
  en: {
    nav: ["Our story", "Explore", "Visit us"],
    menu: "Explore the menu",
    book: "Make a reservation",
    browse: "Shop the edit",
    appointment: "Request an appointment",
    plans: "Find your membership",
    services: "Explore services",
    practice: "Our expertise",
    homes: "Explore homes",
    story: "A little about us",
    note: "A concept website. Enquiries and purchases are not sent.",
    add: "Add to bag",
    bag: "Your bag",
    empty: "Your bag is ready for something lovely.",
    added: "Added to your bag",
    details: "View details",
    choose: "Choose a time",
    name: "Your name",
    request: "Send a sample request",
    requested: "Request preview saved",
    explore: "Explore the experience",
    schedule: "This week at the studio",
    class: "Book a trial class",
    filter: "All homes",
    apartment: "Apartments",
    villa: "Villas",
    search: "Search by area",
    beds: "bedrooms",
    from: "From",
    perMonth: "/ month",
    hours: "Sun–Thu · 9:00–18:00",
    local: "Made for life in Doha",
    collection: "The new-season edit",
    read: "Meet the people behind the practice",
    trust: "Clear advice. Considered outcomes.",
    enquire: "Arrange a conversation",
    amenities: "The details that make it home",
    location: "Find us in",
    guests: "Guests",
    tonight: "A table for tonight",
    specialist: "Meet your specialist",
    duration: "A moment for yourself",
    live: "Concept preview",
    success: "You’re all set",
    next: "Continue exploring",
    locationText: "Doha, Qatar",
    exploreMore: "Discover more",
  },
  ar: {
    nav: ["قصتنا", "اكتشف", "زرنا"],
    menu: "اكتشف القائمة",
    book: "احجز طاولتك",
    browse: "تسوق المجموعة",
    appointment: "اطلب موعداً",
    plans: "اختر عضويتك",
    services: "اكتشف الخدمات",
    practice: "خبراتنا",
    homes: "اكتشف العقارات",
    story: "نبذة عنا",
    note: "موقع تجريبي. لا تُرسل الطلبات أو المشتريات.",
    add: "أضف إلى الحقيبة",
    bag: "حقيبتك",
    empty: "حقيبتك تنتظر اختيارك.",
    added: "أُضيف إلى حقيبتك",
    details: "التفاصيل",
    choose: "اختر وقتاً",
    name: "اسمك",
    request: "أرسل طلباً تجريبياً",
    requested: "تم حفظ معاينة الطلب",
    explore: "اكتشف التجربة",
    schedule: "هذا الأسبوع في النادي",
    class: "احجز حصة تجريبية",
    filter: "كل العقارات",
    apartment: "شقق",
    villa: "فلل",
    search: "ابحث حسب المنطقة",
    beds: "غرف نوم",
    from: "يبدأ من",
    perMonth: "/ شهرياً",
    hours: "الأحد–الخميس · 9:00–18:00",
    local: "مصمم لحياة الدوحة",
    collection: "مجموعة الموسم الجديد",
    read: "تعرف على فريقنا",
    trust: "مشورة واضحة. نتائج مدروسة.",
    enquire: "رتب لقاءً",
    amenities: "تفاصيل تجعل المكان بيتاً",
    location: "زورونا في",
    guests: "ضيوف",
    tonight: "طاولة هذا المساء",
    specialist: "تعرف على الأخصائي",
    duration: "لحظة من أجلك",
    live: "معاينة تجريبية",
    success: "كل شيء جاهز",
    next: "تابع الاستكشاف",
    locationText: "الدوحة، قطر",
    exploreMore: "اكتشف المزيد",
  },
} as const;

export function DemoWebsite({
  sector,
  name,
  line,
  area,
  language,
  items,
  times,
  picked,
  setPicked,
  onAction,
}: {
  sector: Sector;
  name: string;
  line: string;
  area: string;
  language: "en" | "ar";
  items: Item[];
  times: string[];
  picked: number;
  setPicked: (index: number) => void;
  onAction: (summary: string, index: number) => void;
}) {
  const t = copy[language];
  const [activeTime, setActiveTime] = useState(1);
  const [cart, setCart] = useState(0);
  const [saved, setSaved] = useState<number[]>([]);
  const [filter, setFilter] = useState("All homes");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const rtl = language === "ar";
  const dark = sector === "restaurant" || sector === "gym" || sector === "firm";
  const base = dark
    ? "bg-[var(--color-demo-swatch-02)] text-[var(--color-demo-swatch-67)]"
    : "bg-[var(--color-demo-swatch-69)] text-[var(--color-demo-swatch-04)]";
  const quiet = dark ? "text-[var(--color-demo-swatch-37)]" : "text-[var(--color-demo-swatch-23)]";
  const accent =
    sector === "salon"
      ? "bg-[var(--color-demo-swatch-34)]"
      : sector === "gym"
        ? "bg-[var(--color-demo-swatch-36)]"
        : sector === "clinic"
          ? "bg-[var(--color-demo-swatch-49)]"
          : sector === "property"
            ? "bg-[var(--color-demo-swatch-48)]"
            : sector === "boutique"
              ? "bg-[var(--color-demo-swatch-39)]"
              : "bg-[var(--color-demo-swatch-42)]";
  const displayName = name || "Your business";
  const selectedItem = items[picked] ?? items[0];
  const words = {
    restaurant: [
      "A slower kind of evening",
      "A table set with intention",
      "Fire, season, and good company",
    ],
    boutique: [
      "Considered pieces, made to stay",
      "Wear the feeling of somewhere else",
      "A wardrobe with room to breathe",
    ],
    clinic: [
      "Good care starts with being heard",
      "A calmer way to feel your best",
      "Thoughtful care, close to home",
    ],
    gym: [
      "Earn your own kind of strong",
      "Built for the work you came to do",
      "Show up. Find your edge.",
    ],
    salon: [
      "A little time, entirely for you",
      "Your own kind of beautiful",
      "The art of feeling like yourself",
    ],
    firm: [
      "Clarity for your next chapter",
      "The right counsel changes everything",
      "Grounded advice for important decisions",
    ],
    property: [
      "Find where life opens up",
      "Your next chapter has an address",
      "Space to make your own",
    ],
  }[sector];
  const storyCopy = (
    language === "ar"
      ? {
          restaurant: [
            "نكهات الموسم",
            "المائدة أجمل حين نتشاركها",
            "أطباق مستوحاة من السوق المحلي، تُقدّم في أجواء مريحة في " + area + ".",
            "حضورك يجعل الأمسية.",
          ],
          boutique: [
            "اختيارات مدروسة",
            "قطع تعيش معك طويلاً",
            "خامات طبيعية وتفاصيل متقنة، مختارة لتصبح جزءاً من يومك.",
            "كتان · حرير · قطع محدودة",
          ],
          clinic: [
            "رعاية تبدأ بالإنصات",
            "أسئلتك دائماً مهمة",
            "نمنحك الوقت لتفهم خياراتك وتتخذ القرار المناسب لك.",
            "وضوح · اهتمام · متابعة",
          ],
          gym: [
            "أقوى معاً",
            "التقدم يبدأ بالحضور",
            "تدريب بإشراف مدربين، ومجتمع يشجعك على الاستمرار.",
            "التزام · تدريب · مجتمع",
          ],
          salon: [
            "فن وجمال",
            "أسلوبك، بطريقتك",
            "نستمع لما تحبين ونبتكر إطلالة تشبهك.",
            "عناية · خبرة · وقت لك",
          ],
          firm: [
            "نهجنا",
            "شراكة مبنية على الثقة",
            "تواصل مباشر ومشورة واضحة من بداية المسألة إلى نهايتها.",
            "سرية · دقة · التزام",
          ],
          property: [
            "ما حول المنزل مهم",
            "حيّ تشعر فيه بالانتماء",
            "نساعدك على اكتشاف تفاصيل المنطقة التي ستصبح جزءاً من حياتك.",
            "الدوحة · الحي · بيتك",
          ],
        }
      : {
          restaurant: [
            "From the market",
            "Food is better when shared",
            "Seasonal ingredients, carefully prepared, then brought to a table in " + area + ".",
            "An evening made for you",
          ],
          boutique: [
            "Fewer, better things",
            "Pieces made to stay",
            "Natural fabrics, careful construction, and useful details worth keeping.",
            "Linen · silk · small runs",
          ],
          clinic: [
            "Care begins with listening",
            "Your questions belong here",
            "We give you the time and context to make the right decision for you.",
            "Clarity · kindness · follow-through",
          ],
          gym: [
            "Stronger together",
            "Progress starts with showing up",
            "Coach-led training and a community that keeps you coming back.",
            "Consistency · coaching · community",
          ],
          salon: [
            "The Atelier approach",
            "Style, never a script",
            "We listen to what you love, then make a look that feels like you.",
            "Care · craft · a little time",
          ],
          firm: [
            "How we work",
            "Good counsel is a relationship",
            "Direct conversations and considered advice from the first call to the close.",
            "Discretion · clarity · care",
          ],
          property: [
            "More than an address",
            "The neighbourhood matters",
            "We help you find the local details that will make a place feel like home.",
            "Doha · the neighbourhood · home",
          ],
        }
  )[sector];
  const heroHeading = line && line !== "" ? line : words[0];
  const button = (label: string, action: () => void, extra = "") => (
    <button
      type="button"
      onClick={action}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${accent} text-[var(--color-demo-swatch-03)] ${extra}`}
    >
      {label}
      <ArrowUpRight size={15} />
    </button>
  );
  const miniNav = (
    <nav className="hidden items-center gap-6 text-xs font-medium md:flex">
      {t.nav.map((label, i) => (
        <a
          key={label}
          href={`#${["story", "offer", "visit"][i]}`}
          className="opacity-80 hover:opacity-100"
        >
          {label}
        </a>
      ))}
    </nav>
  );
  const websiteHeader = (
    <header
      className={`sticky top-0 z-10 flex items-center justify-between border-b ${dark ? "border-white/10 bg-[var(--color-demo-swatch-02)]/95" : "border-black/10 bg-[var(--color-demo-swatch-69)]/95"} px-5 py-4 backdrop-blur md:px-9`}
    >
      <a href="#top" className="font-display text-xl font-semibold tracking-tight">
        {displayName}
        <span className="ms-2 align-middle font-sans text-[9px] font-medium uppercase tracking-[.18em] opacity-55">
          {t.live}
        </span>
      </a>
      {miniNav}
      <div className="flex items-center gap-2">
        {sector === "boutique" && (
          <span className="inline-flex items-center gap-1 text-xs">
            <ShoppingBag size={15} />
            {cart}
          </span>
        )}
        {button(
          sector === "restaurant"
            ? t.book
            : sector === "boutique"
              ? t.browse
              : sector === "gym"
                ? t.plans
                : sector === "property"
                  ? t.homes
                  : sector === "firm"
                    ? t.enquire
                    : t.appointment,
          () =>
            sector === "boutique"
              ? document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })
              : setModal(true),
          "min-h-10 px-4 text-xs",
        )}
      </div>
    </header>
  );
  const titleBlock = (eyebrow: string, title: string, body: string) => (
    <div className="max-w-xl">
      <p className="text-[10px] font-semibold uppercase tracking-[.24em] opacity-65">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{title}</h2>
      <p className={`mt-3 max-w-lg text-sm leading-relaxed ${quiet}`}>{body}</p>
    </div>
  );
  const story = (
    <section
      id="story"
      className="grid gap-8 border-t border-current/10 px-6 py-12 md:grid-cols-2 md:px-10 md:py-16"
    >
      <div>{titleBlock(t.story, storyCopy[1], storyCopy[2])}</div>
      <div
        className={`flex min-h-48 items-end rounded-2xl p-6 md:p-8 ${sector === "restaurant" ? "bg-[var(--color-demo-swatch-13)]" : sector === "boutique" ? "bg-[var(--color-demo-swatch-58)] text-[var(--color-demo-swatch-15)]" : sector === "clinic" ? "bg-[var(--color-demo-swatch-56)] text-[var(--color-demo-swatch-06)]" : sector === "gym" ? "bg-[var(--color-demo-swatch-08)]" : sector === "salon" ? "bg-[var(--color-demo-swatch-59)] text-[var(--color-demo-swatch-19)]" : sector === "firm" ? "bg-[var(--color-demo-swatch-11)]" : "bg-[var(--color-demo-swatch-58)] text-[var(--color-demo-swatch-15)]"}`}
      >
        <p className="max-w-xs font-display text-2xl leading-snug">{storyCopy[3]}</p>
        <p className="ms-auto self-end text-[10px] uppercase tracking-widest opacity-60">
          {language === "ar" ? "وعدنا" : "Our promise"}
        </p>
      </div>
    </section>
  );
  const footer = (
    <footer
      id="visit"
      className="flex flex-col justify-between gap-4 border-t border-current/10 px-6 py-7 text-xs md:flex-row md:items-center md:px-10"
    >
      <div>
        <p className="font-display text-lg">{displayName}</p>
        <p className={`mt-1 ${quiet}`}>
          <MapPin size={12} className="me-1 inline" />
          {area} · {t.locationText}
        </p>
      </div>
      <p className={quiet}>{t.hours}</p>
      <p className="uppercase tracking-widest opacity-50">{t.note}</p>
    </footer>
  );

  const restaurant = (
    <>
      <section id="top" className="grid min-h-[30rem] overflow-hidden md:grid-cols-[1fr_.9fr]">
        <div className="flex flex-col items-start justify-center px-7 py-14 md:px-12 md:py-20">
          <p className="text-[10px] uppercase tracking-[.24em] opacity-65">
            {area} · {t.locationText}
          </p>
          <h1 className="mt-6 max-w-xl font-display text-5xl leading-[.98] md:text-7xl">
            {heroHeading}
          </h1>
          <p className={`mt-5 max-w-sm text-sm leading-relaxed ${quiet}`}>
            {words[2]}. A seasonal menu, a thoughtful pour, a night that takes its time.
          </p>
          <div className="mt-8 flex gap-3">
            {button(t.menu, () =>
              document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }),
            )}
            <button
              onClick={() => setModal(true)}
              className="min-h-11 rounded-full border border-current/25 px-5 text-sm"
            >
              {t.book}
            </button>
          </div>
          <div className="mt-10 flex gap-5 text-xs">
            <span>
              <Star size={13} className="me-1 inline" />
              Seasonally led
            </span>
            <span className={quiet}>
              <Clock3 size={13} className="me-1 inline" />
              Dinner · 18:00—23:00
            </span>
          </div>
        </div>
        <div className="relative flex min-h-72 items-end overflow-hidden bg-[var(--color-demo-swatch-20)] p-7 md:p-10">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              background:
                "radial-gradient(ellipse at 52% 65%, var(--color-demo-swatch-51) 0%, transparent 38%), linear-gradient(145deg, transparent 38%, var(--color-demo-swatch-10) 39%, var(--color-demo-swatch-10) 40%, transparent 41%), linear-gradient(35deg, transparent 54%, var(--color-demo-swatch-26) 55%, var(--color-demo-swatch-26) 72%, transparent 73%)",
            }}
          />
          <div className="relative max-w-xs border-s-2 border-[var(--color-demo-swatch-42)] ps-4">
            <p className="text-[10px] uppercase tracking-[.2em]">{t.tonight}</p>
            <p className="mt-1 font-display text-2xl">The chef's seasonal table</p>
            <p className="mt-2 text-xs opacity-70">A four-course tasting · QAR 285</p>
          </div>
          <button
            aria-label="See tonight's menu"
            onClick={() => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" })}
            className="relative ms-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-demo-swatch-66)] text-[var(--color-demo-swatch-02)]"
          >
            <ArrowDown size={18} />
          </button>
        </div>
      </section>
      <section id="offer" className="border-y border-current/10 px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          {titleBlock(
            "From our kitchen",
            "A menu that follows the season",
            "A few favourites from a menu that changes with the market.",
          )}
          <span className={`text-xs ${quiet}`}>All prices in QAR · sample menu</span>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setModal(true);
              }}
              className="group rounded-xl border border-current/15 p-4 text-start transition-colors hover:bg-white/5"
            >
              <span className="text-[10px] uppercase tracking-widest opacity-55">
                0{i + 1} · {item.meta}
              </span>
              <span className="mt-7 flex items-end justify-between gap-3 font-display text-xl">
                {item.name}
                <span className="text-sm font-sans opacity-70">{item.price}</span>
              </span>
              <span className="mt-2 block text-xs opacity-55">
                {t.details}{" "}
                <ArrowRight
                  size={12}
                  className="ms-1 inline transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>
          ))}
        </div>
      </section>
      {story}
      <section
        className={`mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6 md:mx-10 md:p-9 ${accent} text-[var(--color-demo-swatch-03)]`}
      >
        {titleBlock(
          t.tonight,
          "Your evening, at our table",
          `${t.guests}: 2–6 · Indoor and terrace seating.`,
        )}
        {button(
          t.book,
          () => setModal(true),
          "bg-[var(--color-demo-swatch-03)] text-[var(--color-demo-swatch-67)]",
        )}
      </section>
      {footer}
    </>
  );

  const boutique = (
    <>
      <div className="bg-[var(--color-demo-swatch-58)] px-5 py-2 text-center text-[10px] tracking-wide text-[var(--color-demo-swatch-16)]">
        Complimentary Doha delivery on orders over QAR 500{" "}
        <ArrowRight size={11} className="mx-1 inline" />
        Discover the edit
      </div>
      <section
        id="top"
        className="grid min-h-[29rem] overflow-hidden bg-[var(--color-demo-swatch-58)] text-[var(--color-demo-swatch-15)] md:grid-cols-2"
      >
        <div className="flex flex-col justify-center px-7 py-12 md:px-12">
          <p className="text-[10px] uppercase tracking-[.24em]">{t.collection} · 2026</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.03] md:text-7xl">{heroHeading}</h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-70">
            Natural textures. Beautifully useful things. Designed to live with you.
          </p>
          {button(
            t.browse,
            () => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }),
            "mt-7 self-start",
          )}
        </div>
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[var(--color-demo-swatch-45)]">
          <div className="absolute h-64 w-56 rotate-[-8deg] rounded-[45%_45%_12%_12%] bg-[var(--color-demo-swatch-28)] shadow-xl md:h-80 md:w-64" />
          <div className="absolute mt-28 h-28 w-60 rotate-[6deg] rounded-[50%_50%_12%_12%] border-[18px] border-[var(--color-demo-swatch-41)] md:mt-40 md:w-80" />
          <p className="absolute bottom-5 right-6 text-[10px] uppercase tracking-[.22em]">
            The Lune wardrobe
          </p>
        </div>
      </section>
      <section id="offer" className="px-6 py-12 md:px-10 md:py-16">
        <div className="flex items-end justify-between">
          {titleBlock(
            t.collection,
            "Pieces for the way you live",
            "Small runs, thoughtful fabrics, and a little something you will keep for years.",
          )}
          <p className={`hidden text-xs md:block ${quiet}`}>{cart} items in your bag</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {items.map((item, i) => (
            <article key={item.name}>
              <div
                className={`relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl ${["bg-[var(--color-demo-swatch-58)]", "bg-[var(--color-demo-swatch-54)]", "bg-[var(--color-demo-swatch-53)]"][i]}`}
              >
                <div
                  className={`h-[72%] w-[52%] rounded-[45%_45%_8%_8%] shadow-lg ${["bg-[var(--color-demo-swatch-30)]", "bg-[var(--color-demo-swatch-25)]", "bg-[var(--color-demo-swatch-32)]"][i]}`}
                />
                <button
                  type="button"
                  aria-label="Save favourite"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSaved((prev) =>
                      prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i],
                    );
                  }}
                  className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/80"
                >
                  <Heart size={15} fill={saved.includes(i) ? "currentColor" : "none"} />
                </button>
                <span className="absolute bottom-3 start-3 rounded-full bg-[var(--color-demo-swatch-69)]/90 px-2 py-1 text-[9px] uppercase tracking-wider">
                  {item.meta}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 pt-3">
                <div>
                  <h3 className="font-display text-base md:text-lg">{item.name}</h3>
                  <p className={`mt-1 text-xs ${quiet}`}>QAR {item.price}</p>
                </div>
                <button
                  onClick={() => {
                    setPicked(i);
                    setCart((n) => n + 1);
                    setMessage(t.added);
                  }}
                  aria-label={t.add}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/20"
                >
                  <Plus size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-5 grid gap-5 rounded-2xl bg-[var(--color-demo-swatch-58)] p-6 text-[var(--color-demo-swatch-15)] md:mx-10 md:grid-cols-2 md:items-center md:p-9">
        <div>
          {titleBlock(
            t.bag,
            cart ? `${cart} pieces, beautifully chosen` : t.empty,
            "Complimentary gift wrap on every order. Easy exchanges within 14 days.",
          )}
          {message && <p className="mt-3 text-xs font-medium">{message}</p>}
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {items.slice(0, 2).map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setCart((n) => n + 1);
                setMessage(t.added);
              }}
              className="flex w-full max-w-sm items-center justify-between rounded-xl bg-white/60 p-4 text-sm"
            >
              <span>{item.name}</span>
              <span>
                QAR {item.price} <Plus size={13} className="ms-2 inline" />
              </span>
            </button>
          ))}
          {button("Continue shopping", () =>
            document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }),
          )}
        </div>
      </section>
      {story}
      {footer}
    </>
  );

  const clinic = (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-[var(--color-demo-swatch-56)] px-7 py-12 text-[var(--color-demo-swatch-06)] md:px-12 md:py-16"
      >
        <div className="absolute -end-20 -top-36 h-96 w-96 rounded-full border border-[var(--color-demo-swatch-24)]/25" />
        <div className="absolute -end-5 -top-20 h-72 w-72 rounded-full border border-[var(--color-demo-swatch-24)]/25" />
        <div className="relative max-w-2xl">
          <p className="text-[10px] uppercase tracking-[.24em]">{area} · patient-first care</p>
          <h1 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] md:text-7xl">
            {heroHeading}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed opacity-70">
            Good care starts with a good conversation. Meet a team that sees the whole person.
          </p>
          {button(t.appointment, () => setModal(true), "mt-7")}
        </div>
        <div className="relative mt-11 flex max-w-2xl flex-wrap gap-2">
          {["Family medicine", "Dental care", "Skin health"].map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--color-demo-swatch-24)]/35 px-3 py-2 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </section>
      <section
        id="offer"
        className="grid gap-9 px-6 py-12 md:grid-cols-[.8fr_1.2fr] md:px-10 md:py-16"
      >
        <div>
          {titleBlock(
            "Care that fits your life",
            "Your health, in good hands",
            "Experienced clinicians, unhurried appointments, and care plans shaped around you.",
          )}
          <p className={`mt-6 text-xs ${quiet}`}>
            {t.hours} · {area}
          </p>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setModal(true);
              }}
              className="flex w-full items-center gap-4 rounded-xl border border-current/10 p-4 text-start transition-colors hover:bg-[var(--color-demo-swatch-56)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-demo-swatch-56)] font-display text-lg text-[var(--color-demo-swatch-14)]">
                0{i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{item.name}</span>
                <span className={`text-xs ${quiet}`}>
                  {item.meta} · {item.price} QAR
                </span>
              </span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-4 bg-[var(--color-demo-swatch-65)] px-6 py-10 md:grid-cols-3 md:px-10">
        {[
          ["01", "Listen first", "We understand what brings you in."],
          ["02", "A clear plan", "Your options, explained with care."],
          ["03", "Here when you need us", "Follow-up that fits real life."],
        ].map(([n, h, b]) => (
          <article key={n} className="rounded-xl bg-white/70 p-5">
            <span className="text-xs text-[var(--color-demo-swatch-21)]">{n}</span>
            <h3 className="mt-4 font-display text-xl">{h}</h3>
            <p className={`mt-2 text-xs ${quiet}`}>{b}</p>
          </article>
        ))}
      </section>
      {story}
      <section className="mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[var(--color-demo-swatch-49)] p-6 text-[var(--color-demo-swatch-06)] md:mx-10 md:p-9">
        {titleBlock(
          t.specialist,
          "A team that takes time",
          "Our clinicians make space for your questions and your priorities.",
        )}
        {button(t.appointment, () => setModal(true))}
      </section>
      {footer}
    </>
  );

  const gym = (
    <>
      <div className="bg-[var(--color-demo-swatch-36)] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--color-demo-swatch-03)]">
        Your first class is on us · Claim a trial pass{" "}
        <ArrowRight size={12} className="mx-1 inline" />
      </div>
      <section
        id="top"
        className="relative overflow-hidden bg-[var(--color-demo-swatch-05)] px-6 py-12 md:px-12 md:py-16"
      >
        <div className="absolute -end-20 top-10 h-72 w-72 rotate-45 border-[36px] border-[var(--color-demo-swatch-17)]/50" />
        <div className="relative max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[var(--color-demo-swatch-36)]">
            {area} · Training club
          </p>
          <h1 className="mt-5 font-display text-6xl font-black uppercase leading-[.88] tracking-tight md:text-8xl">
            {heroHeading}
          </h1>
          <p className="mt-5 max-w-md text-sm text-[var(--color-demo-swatch-38)]">
            No mirrors. No shortcuts. Just good people, expert coaching, and work that adds up.
          </p>
          {button(t.class, () => setModal(true), "mt-7")}
        </div>
        <div className="relative mt-14 grid grid-cols-3 border-y border-white/15 py-5 text-center">
          <div>
            <strong className="block font-display text-2xl">06:00</strong>
            <span className="text-[9px] uppercase tracking-widest opacity-60">First session</span>
          </div>
          <div>
            <strong className="block font-display text-2xl">12</strong>
            <span className="text-[9px] uppercase tracking-widest opacity-60">
              People per class
            </span>
          </div>
          <div>
            <strong className="block font-display text-2xl">1:1</strong>
            <span className="text-[9px] uppercase tracking-widest opacity-60">
              Coaching built in
            </span>
          </div>
        </div>
      </section>
      <section id="offer" className="px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          {titleBlock(
            t.schedule,
            "A little structure. A lot of momentum.",
            "Small-group sessions built to fit into a real week.",
          )}
        </div>
        <div className="mt-8 grid gap-2 md:grid-cols-4">
          {[
            "MON · STRENGTH",
            "TUE · CONDITIONING",
            "WED · MOBILITY",
            "THU · FULL BODY",
            "FRI · ENGINE",
            "SAT · TEAM WOD",
            "SUN · RECOVERY",
            "OPEN GYM",
          ].map((slot, i) => (
            <button
              key={slot}
              onClick={() => {
                setActiveTime(i % times.length);
                setModal(true);
              }}
              className={`rounded-xl p-4 text-start ${i === activeTime ? "bg-[var(--color-demo-swatch-36)] text-[var(--color-demo-swatch-03)]" : "border border-current/15"}`}
            >
              <span className="block text-xs font-bold">{slot}</span>
              <span className="mt-5 block font-display text-xl">{times[i % times.length]}</span>
              <span className="mt-1 block text-[10px] opacity-60">Coach-led · 45 min</span>
            </button>
          ))}
        </div>
      </section>
      <section className="bg-[var(--color-demo-swatch-64)] px-6 py-12 text-[var(--color-demo-swatch-05)] md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          {titleBlock(
            "Membership, without the guesswork",
            "Find your rhythm",
            "Come once, train consistently, or make it part of your week.",
          )}
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setModal(true);
              }}
              className={`rounded-xl p-5 text-start ${i === 1 ? "bg-[var(--color-demo-swatch-36)]" : "bg-white"}`}
            >
              <span className="text-[10px] uppercase tracking-widest opacity-60">
                {i === 1 ? "Most popular" : "Membership"}
              </span>
              <span className="mt-5 block font-display text-2xl">{item.name}</span>
              <span className="mt-2 block text-3xl font-semibold">
                QAR {item.price}
                <span className="text-xs font-normal"> {t.perMonth}</span>
              </span>
              <span className="mt-5 block text-xs">
                {item.meta} <ArrowUpRight size={13} className="ms-1 inline" />
              </span>
            </button>
          ))}
        </div>
      </section>
      {story}
      <section className="mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[var(--color-demo-swatch-36)] p-6 text-[var(--color-demo-swatch-03)] md:mx-10 md:p-9">
        {titleBlock(
          "Start where you are",
          "Book a no-pressure first session",
          "Meet a coach, see the space, and find out if the fit feels right.",
        )}
        {button(
          t.class,
          () => setModal(true),
          "bg-[var(--color-demo-swatch-03)] text-[var(--color-demo-swatch-67)]",
        )}
      </section>
      {footer}
    </>
  );

  const salon = (
    <>
      <section
        id="top"
        className="grid overflow-hidden bg-[var(--color-demo-swatch-62)] text-[var(--color-demo-swatch-19)] md:min-h-[28rem] md:grid-cols-[1fr_.8fr]"
      >
        <div className="flex flex-col items-start justify-center px-7 py-12 md:px-12 md:py-16">
          <p className="text-[10px] uppercase tracking-[.24em]">{area} · By appointment</p>
          <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">{heroHeading}</h1>
          <p className="mt-4 max-w-sm text-sm opacity-70">
            A warm welcome, an expert eye, and room to make the look your own.
          </p>
          {button(
            t.services,
            () => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }),
            "mt-7",
          )}
        </div>
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[var(--color-demo-swatch-34)]">
          <div className="absolute h-48 w-48 rounded-full border-[22px] border-[var(--color-demo-swatch-50)]/70 md:h-64 md:w-64" />
          <div className="absolute h-28 w-28 translate-x-8 translate-y-6 rounded-full bg-[var(--color-demo-swatch-61)]/70 md:h-40 md:w-40" />
          <div className="absolute bottom-5 end-5 rounded-full bg-[var(--color-demo-swatch-68)] px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-demo-swatch-19)]">
            Atelier · Doha
          </div>
        </div>
      </section>
      <section id="offer" className="px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          {titleBlock(
            "The Atelier menu",
            "Good hair, good energy",
            "A considered service menu. Choose what feels right and we’ll take it from there.",
          )}
          {button(t.appointment, () => setModal(true))}
        </div>
        <div className="mt-8 divide-y divide-current/15 border-y border-current/15">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setModal(true);
              }}
              className="flex w-full items-center gap-4 py-5 text-start"
            >
              <span className="font-display text-xl text-[var(--color-demo-swatch-34)]">
                0{i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl">{item.name}</span>
                <span className={`text-xs ${quiet}`}>
                  {item.meta} · {item.price} QAR
                </span>
              </span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-3 gap-2 px-5 pb-10 md:gap-4 md:px-10">
        {[
          "bg-[var(--color-demo-swatch-47)]",
          "bg-[var(--color-demo-swatch-57)]",
          "bg-[var(--color-demo-swatch-35)]",
        ].map((color, i) => (
          <div key={color} className={`relative aspect-[4/5] overflow-hidden rounded-xl ${color}`}>
            <div
              className={`absolute bottom-[-10%] left-[20%] h-[78%] w-[60%] rounded-t-full ${i === 1 ? "bg-[var(--color-demo-swatch-22)]" : "bg-[var(--color-demo-swatch-18)]"}`}
            />
            <span className="absolute bottom-3 start-3 text-[9px] uppercase tracking-wider text-white">
              Look 0{i + 1}
            </span>
          </div>
        ))}
      </section>
      {story}
      <section className="mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[var(--color-demo-swatch-62)] p-6 text-[var(--color-demo-swatch-19)] md:mx-10 md:p-9">
        {titleBlock(
          t.duration,
          "Take a little time for yourself",
          "Tell us what you have in mind. We'll find a time that works.",
        )}
        {button(t.appointment, () => setModal(true))}
      </section>
      {footer}
    </>
  );

  const firm = (
    <>
      <section id="top" className="bg-[var(--color-demo-swatch-07)] px-7 py-12 md:px-12 md:py-16">
        <p className="text-[10px] uppercase tracking-[.24em] text-[var(--color-demo-swatch-43)]">
          {area} · Qatar
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] md:text-7xl">
          {heroHeading}
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--color-demo-swatch-40)]">
          Independent counsel for the moments that matter. We bring clarity, perspective, and steady
          hands to every decision.
        </p>
        {button(t.enquire, () => setModal(true), "mt-7")}
      </section>
      <section className="grid gap-10 px-6 py-12 md:grid-cols-[.75fr_1.25fr] md:px-10 md:py-16">
        <div>
          {titleBlock(
            "What we do",
            "Sound judgment. Close attention.",
            "We work across the decisions that shape businesses, families, and futures.",
          )}
        </div>
        <div id="offer" className="divide-y divide-current/15 border-y border-current/15">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => {
                setPicked(i);
                setModal(true);
              }}
              className="group flex w-full items-center gap-4 py-5 text-start"
            >
              <span className="font-display text-xl text-[var(--color-demo-swatch-43)]">
                0{i + 1}
              </span>
              <span className="flex-1">
                <span className="block font-display text-xl">{item.name}</span>
                <span className={`text-xs ${quiet}`}>{item.meta} · Bespoke counsel</span>
              </span>
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                size={17}
              />
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-8 bg-[var(--color-demo-swatch-12)] px-6 py-12 md:grid-cols-2 md:px-10 md:py-16">
        <div>
          {titleBlock(
            t.trust,
            "The details matter. So does the relationship.",
            "You work directly with a senior advisor. Clear updates, considered options, no surprises.",
          )}
        </div>
        <blockquote className="border-s-2 border-[var(--color-demo-swatch-43)] ps-5 font-display text-2xl leading-snug">
          {storyCopy[3]}
          <footer className="mt-4 font-sans text-xs uppercase tracking-widest opacity-60">
            {language === "ar" ? "وعدنا" : "Our promise"}
          </footer>
        </blockquote>
      </section>
      {story}
      <section className="mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-current/15 p-6 md:mx-10 md:p-9">
        {titleBlock(
          "A good first step",
          "Tell us what you’re navigating",
          "A confidential first conversation to understand your situation and explain how we can help.",
        )}
        {button(t.enquire, () => setModal(true))}
      </section>
      {footer}
    </>
  );

  const property = (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-[var(--color-demo-swatch-52)] text-[var(--color-demo-swatch-09)]"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(135deg, transparent 36%, var(--color-demo-swatch-31) 37%, var(--color-demo-swatch-31) 38%, transparent 39%), linear-gradient(20deg, transparent 42%, var(--color-demo-swatch-60) 43%, var(--color-demo-swatch-60) 74%, transparent 75%), linear-gradient(150deg, transparent 66%, var(--color-demo-swatch-29) 67%, var(--color-demo-swatch-29) 68%, transparent 69%)",
          }}
        />
        <div className="relative px-7 py-14 md:px-12 md:py-20">
          <p className="text-[10px] uppercase tracking-[.24em]">{area} · A better way home</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] md:text-7xl">
            {heroHeading}
          </h1>
          <p className="mt-4 max-w-md text-sm opacity-75">
            A place for everything you are becoming. Discover considered homes across Doha.
          </p>
          <div className="mt-8 flex max-w-2xl flex-wrap gap-2 rounded-xl bg-[var(--color-demo-swatch-69)] p-3">
            {button(t.homes, () =>
              document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" }),
            )}
            <span className="flex min-h-11 flex-1 items-center gap-2 rounded-full border border-black/10 px-4 text-xs">
              <Search size={15} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search}
                className="w-full bg-transparent outline-none"
              />
            </span>
            <button
              onClick={() => setFilter(filter === "Villas" ? "Apartments" : "Villas")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/15 px-4 text-xs"
            >
              <SlidersHorizontal size={14} />
              {filter === "Villas" ? t.villa : filter === "Apartments" ? t.apartment : t.filter}
            </button>
          </div>
        </div>
      </section>
      <section id="offer" className="px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          {titleBlock(
            "Handpicked for you",
            "Find your place in Doha",
            "A considered collection of places we think you’ll love.",
          )}
          <div className="flex gap-2">
            {[t.filter, t.apartment, t.villa].map((v) => (
              <button
                key={v}
                onClick={() =>
                  setFilter(
                    v === t.villa ? "Villas" : v === t.apartment ? "Apartments" : "All homes",
                  )
                }
                className={`rounded-full px-3 py-2 text-xs ${filter === v || (v === t.filter && filter === "All homes") ? "bg-[var(--color-demo-swatch-48)] text-[var(--color-demo-swatch-09)]" : "border border-current/20"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items
            .filter(
              (item, i) =>
                (!search ||
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  area.toLowerCase().includes(search.toLowerCase())) &&
                (filter === "All homes" || (filter === "Villas" ? i === 2 : i !== 2)),
            )
            .map((item, i) => {
              const index = items.indexOf(item);
              return (
                <article
                  key={item.name}
                  className="overflow-hidden rounded-xl border border-current/10"
                >
                  <div
                    className={`relative flex aspect-[4/3] items-end p-4 ${["bg-[var(--color-demo-swatch-55)]", "bg-[var(--color-demo-swatch-46)]", "bg-[var(--color-demo-swatch-44)]"][index]}`}
                  >
                    <div className="absolute inset-x-[12%] bottom-0 top-[20%] border-x-8 border-t-8 border-[var(--color-demo-swatch-69)] bg-[var(--color-demo-swatch-33)]" />
                    <div className="relative rounded-full bg-white/85 px-3 py-1 text-[10px] uppercase tracking-wide">
                      {index === 2 ? t.villa : t.apartment}
                    </div>
                    <button
                      aria-label="Save home"
                      onClick={() =>
                        setSaved((prev) =>
                          prev.includes(index) ? prev.filter((v) => v !== index) : [...prev, index],
                        )
                      }
                      className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90"
                    >
                      <Heart size={15} fill={saved.includes(index) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg">{item.name}, Doha</h3>
                        <p className={`mt-1 text-xs ${quiet}`}>
                          {item.meta} {t.beds} · Move-in ready
                        </p>
                      </div>
                      <p className="shrink-0 text-end text-xs font-semibold">
                        QAR {item.price}
                        <span className="block text-[10px] font-normal">{t.perMonth}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPicked(index);
                        setModal(true);
                      }}
                      className="mt-4 w-full rounded-full border border-current/20 py-2 text-xs font-semibold"
                    >
                      {t.details} <ArrowRight size={12} className="ms-1 inline" />
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
        {items.filter(
          (item, i) =>
            (!search ||
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              area.toLowerCase().includes(search.toLowerCase())) &&
            (filter === "All homes" || (filter === "Villas" ? i === 2 : i !== 2)),
        ).length === 0 && (
          <p className={`mt-8 rounded-xl border border-current/15 p-6 text-sm ${quiet}`}>
            No homes match yet. Try a different area or property type.
          </p>
        )}
      </section>
      <section className="grid gap-8 bg-[var(--color-demo-swatch-63)] px-6 py-12 md:grid-cols-2 md:items-center md:px-10">
        {titleBlock(
          t.amenities,
          "The neighbourhood makes the home",
          "Waterfront walks, favourite cafés, and the places you’ll find yourself returning to.",
        )}
        <div className="grid grid-cols-2 gap-2">
          {["Walkable waterfront", "Concierge service", "Secure parking", "Move-in ready"].map(
            (x) => (
              <span key={x} className="rounded-lg bg-white/70 p-3 text-xs">
                <Check size={13} className="me-2 inline text-[var(--color-demo-swatch-27)]" />
                {x}
              </span>
            ),
          )}
        </div>
      </section>
      {story}
      <section className="mx-5 my-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[var(--color-demo-swatch-48)] p-6 text-[var(--color-demo-swatch-09)] md:mx-10 md:p-9">
        {titleBlock(
          "Your next chapter",
          "Come see how it feels",
          "A private viewing, at a time that works for you.",
        )}
        {button(t.appointment, () => setModal(true))}
      </section>
      {footer}
    </>
  );

  const confirmation = (
    <div
      className="fixed inset-0 z-20 grid place-items-center bg-[var(--color-demo-swatch-01)]/60 p-4"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) setModal(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={t.request}
        dir={rtl ? "rtl" : "ltr"}
        className="w-full max-w-md rounded-2xl bg-[var(--color-demo-swatch-69)] p-6 text-[var(--color-demo-swatch-04)] shadow-2xl md:p-8"
      >
        <button
          type="button"
          onClick={() => setModal(false)}
          aria-label="Close"
          className="float-end grid h-9 w-9 place-items-center rounded-full border border-black/10"
        >
          <Minus size={14} />
        </button>
        <p className="text-[10px] uppercase tracking-[.2em] text-[var(--color-demo-swatch-23)]">
          {displayName} · {t.live}
        </p>
        <h2 className="mt-3 font-display text-3xl">
          {message
            ? t.success
            : sector === "boutique"
              ? t.bag
              : sector === "restaurant"
                ? t.tonight
                : sector === "gym"
                  ? t.class
                  : t.appointment}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-demo-swatch-23)]">
          {message ||
            `${selectedItem.name} · ${selectedItem.meta} · ${selectedItem.price === "Consult" ? "Consult" : `QAR ${selectedItem.price}`}`}
        </p>
        {!message && (
          <>
            <div className="mt-5 flex flex-wrap gap-2">
              {(sector === "restaurant" ||
              sector === "clinic" ||
              sector === "salon" ||
              sector === "property" ||
              sector === "firm"
                ? times
                : ["Today", "This week", "Next week"]
              ).map((slot, i) => (
                <button
                  key={slot}
                  onClick={() => setActiveTime(i)}
                  className={`rounded-full border px-3 py-2 text-xs ${i === activeTime ? "border-[var(--color-demo-swatch-04)] bg-[var(--color-demo-swatch-04)] text-white" : "border-black/15"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <label className="mt-4 block text-xs font-medium">
              {sector === "boutique"
                ? "Email for order updates"
                : sector === "firm"
                  ? "Email or phone"
                  : t.name}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={sector === "boutique" ? "you@example.com" : "Your name"}
                className="mt-2 h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm"
              />
            </label>
          </>
        )}
        {button(
          message ? t.next : sector === "boutique" ? t.add : t.request,
          () => {
            if (message) {
              setModal(false);
              setMessage("");
              return;
            }
            if (sector === "boutique") setCart((n) => n + 1);
            else
              onAction(
                `${displayName} · ${selectedItem.name} · ${times[activeTime % times.length] ?? "This week"}`,
                activeTime,
              );
            setMessage(sector === "boutique" ? t.added : t.requested);
          },
          "mt-5 w-full",
        )}
      </section>
    </div>
  );

  return (
    <div
      data-demo-site={sector}
      className={`relative min-h-[42rem] overflow-hidden ${base}`}
      dir={rtl ? "rtl" : "ltr"}
      lang={language}
    >
      {websiteHeader}
      {sector === "restaurant"
        ? restaurant
        : sector === "boutique"
          ? boutique
          : sector === "clinic"
            ? clinic
            : sector === "gym"
              ? gym
              : sector === "salon"
                ? salon
                : sector === "firm"
                  ? firm
                  : property}
      {modal && confirmation}
    </div>
  );
}
