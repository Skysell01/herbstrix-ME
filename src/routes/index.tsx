import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import {
  Check,
  X,
  ShieldCheck,
  Lock,
  PhoneCall,
  Truck,
  Leaf,
  Zap,
  Activity,
  HeartPulse,
  ClipboardList,
  Headphones,
  Stethoscope,
  Package,
  HandshakeIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-mobile.jpg";
import heroDesktopImg from "@/assets/hero-desktop.jpg";
import dailyWellnessImg from "@/assets/daily-wellness.jpg";
import productImg from "@/assets/landing-product.jpg";
import strengthImg from "@/assets/landing-strength.jpg";
import powerImg from "@/assets/landing-power.jpg";
import lifestyle1 from "@/assets/lifestyle-intimacy-1.jpg";
import lifestyle2 from "@/assets/lifestyle-intimacy-2.jpg";
import lifestyle3 from "@/assets/lifestyle-intimacy-3.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import { LeadForm } from "@/components/advertorial/LeadForm";
import { MiniLeadForm } from "@/components/advertorial/MiniLeadForm";
import { TrustStrip } from "@/components/advertorial/TrustStrip";
import { StickyCTA } from "@/components/advertorial/StickyCTA";
import { AdvisorCard } from "@/components/advertorial/AdvisorCard";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "ESI Wellness Alpha Men — Free Personal Consultation for Men | ESI Wellness",
      },
      {
        name: "description",
        content:
          "Free personal consultation call with our wellness advisor. ESI Wellness Alpha Men supports stamina, energy and men's wellness. 100% confidential. Cash on Delivery available.",
      },
      { property: "og:image", content: heroDesktopImg },
    ],
  }),
  component: Advertorial,
});

const problems = [
  "Energy drops too quickly through the day",
  "Confidence takes a hit",
  "Stress and lifestyle cause constant worry",
  "Too many products in the market — it's confusing",
  "It's a personal issue — hard to talk about with anyone",
];

const benefits = [
  {
    icon: Activity,
    title: "Stamina Support",
    body: "Helps you stay active and maintain daily stamina.",
  },
  {
    icon: Zap,
    title: "Energy Support",
    body: "Reduces fatigue and helps sustain a fresh, vibrant energy.",
  },
  {
    icon: HeartPulse,
    title: "Men's Vitality Support",
    body: "Supports overall men's wellness and confidence.",
  },
  {
    icon: Leaf,
    title: "Easy Daily Routine",
    body: "Herbal formula. One in the morning, one at night — that's it.",
  },
];

const callSteps = [
  { icon: ClipboardList, title: "Fill the form", body: "Share your details — takes just 30 seconds." },
  { icon: PhoneCall, title: "Advisor calls you personally", body: "A completely confidential conversation." },
  { icon: Stethoscope, title: "Understands your concern", body: "Considers your age, goal and lifestyle." },
  { icon: Headphones, title: "Explains fit & best offer", body: "The right pack, usage and best price for you." },
  { icon: HandshakeIcon, title: "Confirm order only if you agree", body: "COD or online — zero pressure." },
];

const testimonials = [
  {
    name: "Rohit S.",
    avatar: avatar1,
    age: 34,
    city: "Chennai",
    before: "Work stress + late nights — by evening I was wiped out. My confidence even with my wife took a hit.",
    after:
      "In 3 weeks my energy was back. The routine the advisor suggested was simple. No side effects at all.",
    duration: "3 weeks",
  },
  {
    name: "Vivek M.",
    avatar: avatar2,
    age: 41,
    city: "Coimbatore",
    before: "I'd tried so many products — nothing worked, just wasted money.",
    after:
      "The fact that the advisor spoke to me for free first built trust. Clear difference in 1 month. Came in a discreet box.",
    duration: "1 month",
  },
  {
    name: "Akash P.",
    avatar: avatar3,
    age: 29,
    city: "Madurai",
    before: "Newly married. Performance anxiety was real — couldn't speak about it with anyone.",
    after:
      "Talking on the phone is what gave me courage. The advisor explained things really well. Now I feel confident.",
    duration: "6 weeks",
  },
  {
    name: "Suresh R.",
    avatar: avatar4,
    age: 47,
    city: "Trichy",
    before: "Getting older, stamina dropping. I felt embarrassed to go see a doctor.",
    after:
      "Talking to the wellness advisor felt like talking to a friend. They recommended a pack. COD delivery, and I'm a regular now.",
    duration: "2 months",
  },
  {
    name: "Karthik V.",
    avatar: avatar5,
    age: 36,
    city: "Salem",
    before: "Even with the gym, my energy levels stayed low. There was real dissatisfaction in married life.",
    after:
      "The advisor understood my lifestyle and gave proper advice. Positive change in 5 weeks. My wife is happier too.",
    duration: "5 weeks",
  },
  {
    name: "Manikandan T.",
    avatar: avatar6,
    age: 38,
    city: "Tirunelveli",
    before: "I was scared to order online — worried the packaging would give it away to my family.",
    after:
      "It arrived in a plain box, no labels. No one had any idea. And the product actually worked.",
    duration: "1 month",
  },
];

const compare = [
  { feature: "Confidential advisor call", us: true, them: false },
  { feature: "Personalised usage guidance", us: true, them: false },
  { feature: "Discreet plain packaging", us: true, them: "Maybe" },
  { feature: "Herbal wellness support", us: true, them: "Varies" },
  { feature: "Cash on Delivery", us: true, them: "Maybe" },
  { feature: "Post-purchase support", us: true, them: false },
];

const faqs = [
  {
    q: "💰 How much does it cost? Can I know the price upfront?",
    a: "Pricing depends on the pack size and your specific needs. During the advisor call, they will transparently share the right pack and the right price for you — no hidden charges. If it isn't right for you, simply don't buy — there is zero pressure.",
  },
  {
    q: "⚠️ Are there any side effects?",
    a: "ESI Wellness Alpha Men is a 100% herbal formula — traditional Ayurvedic herbs like Ashwagandha and Shilajit. FSSAI and GMP certified. It is safe for most men. If you have a medical condition or are on medication, please consult your doctor first. The advisor will also review your health history.",
  },
  {
    q: "🔒 Are my details / phone number safe?",
    a: "100% safe. Your details are stored only in our encrypted database. We do not sell or share them with any third party. The advisor will call you once — if you say no, there will be no spam calls afterwards. No WhatsApp or SMS marketing either.",
  },
  {
    q: "📦 How will delivery work? Will anyone find out?",
    a: "It arrives in a plain brown box — no product name, no company logo, no label of what's inside. The delivery person, family, or neighbours can't tell. 2–4 days for major cities, 4–7 days for other locations.",
  },
  {
    q: "↩️ Can I get a refund if the product isn't right for me?",
    a: "Yes. We offer a 7-day return policy for unopened / sealed packs. Full refund for any quality issue. For opened packs, the advisor will help case-by-case. With COD, you pay only after the product reaches you — minimal risk.",
  },
  {
    q: "📞 Who will call me and when?",
    a: "Our Wellness Advisor (Dr. Rakesh K. or team) will call you within 1–4 hours of form submission, during the time slot you select. The call lasts 15–30 minutes — a confidential, judgement-free conversation.",
  },
];

function ScrollToFormButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#claim"
      className={`cta-premium inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm sm:text-base font-bold uppercase tracking-wide text-brand-foreground ${className}`}
    >
      <PhoneCall className="h-4 w-4" />
      {children}
      <span className="text-lg">→</span>
    </a>
  );
}

function Advertorial() {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased" lang="en">
      <Toaster richColors position="top-center" />

      {/* Disclosure */}
      <div className="bg-ink/5 text-center text-[11px] uppercase tracking-wider text-ink-muted py-1.5">
        Sponsored Wellness Consultation
      </div>

      {/* Header */}
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-ink">ESI Wellness</span>
            <span className="text-xs text-ink-muted hidden sm:inline">× Alpha Men</span>
          </a>
          <a
            href="#claim"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            <PhoneCall className="h-4 w-4" />
            Book free call
          </a>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 1. HERO + FORM (above the fold) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/40 to-paper">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left — pitch */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free Personal Consultation
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-ink">
                For stamina, energy & confidence —{" "}
                <span className="text-brand">a free personal consultation</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
                Confused about ESI Wellness Alpha Men? Share your details. Our wellness advisor will
                explain <strong className="text-ink">in a confidential call</strong> — usage,
                fit, pricing and delivery.
              </p>

              {/* Hero main image (mobile shows here) */}
              <div className="mt-4 lg:hidden space-y-4">
                <img
                  src={heroImg}
                  alt="Alpha Men Ayurvedic Capsules"
                  className="mx-auto h-[26rem] sm:h-[32rem] w-auto object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </div>

              {/* Trust chips */}
              <ul className="mt-3 grid grid-cols-2 gap-2 text-left text-sm">
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>100% confidential call</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>No awkward questions</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>Cash on Delivery</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>Discreet delivery</span>
                </li>
              </ul>

              {/* Desktop images below trust chips */}
              <div className="mt-8 hidden lg:block space-y-6">
                <img
                  src={heroImg}
                  alt="Alpha Men Ayurvedic Capsules"
                  className="h-[34rem] w-auto object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* Right — mini form (2-step) + advisor trust card */}
            <div id="claim" className="scroll-mt-24 space-y-4">
              <MiniLeadForm id="claim" />
              <AdvisorCard />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — directly under hero, before everything else */}
      <TrustStrip />

      {/* ============================================================ */}
      {/* 2. PROBLEM AWARENESS */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
            Do you feel this too?
          </h2>
          <p className="mt-2 text-ink-muted">
            You're not alone. Lakhs of Indian men feel exactly the same.
          </p>

          <ul className="mt-8 grid gap-3 max-w-2xl mx-auto text-left">
            {problems.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-rule bg-card p-4 shadow-sm"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Check className="h-4 w-4 text-brand" />
                </div>
                <span className="text-sm sm:text-base text-ink">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ScrollToFormButton>Get confidential guidance</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SOFT BENEFITS */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-brand-soft/20">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              ESI Wellness Alpha Men's <span className="text-brand">daily wellness support</span>
            </h2>
            <p className="mt-2 text-ink-muted">
              A herbal formula that fits easily into your daily wellness routine.
            </p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <img
              src={dailyWellnessImg}
              alt="ESI Wellness Alpha Men 18+ Ayurvedic supplement"
              className="w-full rounded-xl border border-rule object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-rule bg-card p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-ink-muted italic">
            * Results may vary. This is a wellness support product — no medical claims are made.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. HOW THE CALL WORKS */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <PhoneCall className="h-3.5 w-3.5" />
              Step by step
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-ink">
              What happens after the call?
            </h2>
            <p className="mt-2 text-ink-muted">
              A fully transparent process. No hidden steps.
            </p>
          </div>

          <ol className="relative mt-10 max-w-xl mx-auto">
            {/* Vertical dashed connector */}
            <div
              className="absolute left-[26px] top-7 bottom-7 w-0 border-l-2 border-dashed border-brand/25"
              aria-hidden="true"
            />

            {callSteps.map((s, i) => {
              const Icon = s.icon;
              const isLast = i === callSteps.length - 1;
              return (
                <li
                  key={i}
                  className={`relative flex gap-4 ${isLast ? "" : "mb-5"}`}
                >
                  {/* Numbered badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-brand text-base font-bold text-brand-foreground border-4 border-paper shadow-md">
                      {i + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-rule bg-card p-5 shadow-sm">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-ink text-[15px] leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 max-w-3xl mx-auto">
            <img
              src={heroDesktopImg}
              alt="ESI Wellness Alpha Men Warning"
              className="w-full rounded-xl border border-rule object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          <div className="mt-10 text-center">
            <ScrollToFormButton>Book your free call</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-brand-soft/20">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              Real experiences
            </h2>
            <p className="mt-2 text-ink-muted">
              What customers say after speaking to our advisor.
            </p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <img
              src={strengthImg}
              alt="Lion-like strength"
              className="w-full rounded-xl border border-rule object-cover shadow-sm"
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-rule bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-brand/30"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand/15 font-serif text-sm font-bold text-brand"
                      >
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink leading-tight">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-ink-muted">
                        {t.age} · {t.city}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    ✓ Verified
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border-l-4 border-brand bg-brand-soft/40 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand">
                      Before
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      "{t.before}"
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-ink-muted/30 bg-ink/5 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                        After {t.duration}
                      </div>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-ink leading-relaxed">
                      "{t.after}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-ink-muted italic">
            * Genuine customer feedback. Full names hidden for privacy. Results may vary by individual.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5b. LIFESTYLE / INTIMACY RESULTS STRIP */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-paper/90">
              <HeartPulse className="h-3.5 w-3.5" />
              Real-life results
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-paper">
              Reclaim <span className="text-brand-glow">intimacy, confidence & connection</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-paper/70 leading-relaxed">
              When stamina and energy return, it's not just the bedroom —
              you'll feel the difference in your relationship, confidence and overall life.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                src: lifestyle1,
                tag: "Intimacy",
                line: "Reconnect emotionally with your partner.",
              },
              {
                src: lifestyle2,
                tag: "Confidence",
                line: "Be free of performance anxiety.",
              },
              {
                src: lifestyle3,
                tag: "Connection",
                line: "Your relationship grows closer and deeper.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-ink shadow-xl"
              >
                <img
                  src={item.src}
                  alt={item.tag}
                  loading="lazy"
                  className="h-72 w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="inline-block rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-foreground">
                    {item.tag}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-paper leading-snug">
                    {item.line}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] text-paper/50 italic">
            * Representational images. Results may vary by individual. ESI Wellness Alpha Men is a herbal wellness support product.
          </p>

          <div className="mt-8 text-center">
            <ScrollToFormButton>Get your free call</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COMPARISON */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              ESI Wellness Alpha Men vs <span className="text-ink-muted">typical market products</span>
            </h2>
            <p className="mt-2 text-ink-muted">
              An honest comparison — why smart men choose the advisor-guided approach.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-rule bg-card shadow-sm">
            <div className="grid grid-cols-3 bg-ink text-paper">
              <div className="p-4 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Feature
              </div>
              <div className="p-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider bg-brand text-brand-foreground">
                ESI Wellness Alpha Men
              </div>
              <div className="p-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Typical Products
              </div>
            </div>
            {compare.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-rule ${i % 2 === 0 ? "bg-card" : "bg-brand-soft/20"
                  }`}
              >
                <div className="p-4 text-sm text-ink">{row.feature}</div>
                <div className="p-4 flex items-center justify-center bg-brand-soft/30">
                  {row.us === true ? (
                    <Check className="h-5 w-5 text-brand" />
                  ) : (
                    <span className="text-sm text-ink">{String(row.us)}</span>
                  )}
                </div>
                <div className="p-4 flex items-center justify-center text-ink-muted">
                  {row.them === true ? (
                    <Check className="h-5 w-5" />
                  ) : row.them === false ? (
                    <X className="h-5 w-5 text-ink-muted/50" />
                  ) : (
                    <span className="text-sm">{row.them}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FINAL FORM + REASSURANCE */}
      {/* ============================================================ */}
      <section className="border-t border-rule bg-gradient-to-b from-brand-soft/40 to-paper">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight">
                Still unsure? <br />
                <span className="text-brand">Speak to our advisor first.</span>
              </h2>
              <p className="mt-4 text-base text-ink-muted leading-relaxed">
                No pressure. No awkward questions. Just a personal explanation —
                of the product, usage, pricing and delivery.
              </p>

              <ul className="mt-6 space-y-2.5 text-left max-w-md lg:max-w-none mx-auto lg:mx-0">
                {[
                  { icon: Lock, text: "100% private and confidential" },
                  { icon: Truck, text: "Delivered in discreet packaging" },
                  { icon: Package, text: "Cash on Delivery — pay after you receive it" },
                  { icon: ShieldCheck, text: "Trained wellness advisors" },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <li key={i} className="flex items-center gap-3 text-sm text-ink">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand/10">
                        <Icon className="h-4 w-4 text-brand" />
                      </div>
                      {f.text}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <img
                  src={powerImg}
                  alt="Elephant-like strength"
                  className="w-full rounded-xl border border-rule object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <LeadForm id="claim-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FAQ */}
      {/* ============================================================ */}
      <section id="faq" className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-ink-muted">
              The questions on your mind — answered honestly, from our side.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-rule">
                <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-ink-muted leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <ScrollToFormButton>Get a free callback</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-ink/5">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-ink-muted">
          <p className="font-semibold text-ink">ESI Wellness × Alpha Men</p>
          <p className="mt-2">
            This is a wellness support product. Results may vary. Pregnant or breastfeeding women,
            minors, or anyone with a medical condition should consult their doctor.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} ESI Wellness. All rights reserved.</p>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}
