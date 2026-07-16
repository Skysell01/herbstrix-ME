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
        title: "ESI Wellness Alpha Men — पुरुषों के लिए मुफ़्त व्यक्तिगत परामर्श | ESI Wellness",
      },
      {
        name: "description",
        content:
          "हमारे वेलनेस एडवाइजर के साथ मुफ़्त व्यक्तिगत परामर्श कॉल। ESI Wellness Alpha Men स्टैमिना, एनर्जी और पुरुषों की सेहत को सपोर्ट करता है। 100% गोपनीय। कैश ऑन डिलीवरी उपलब्ध है।",
      },
      { property: "og:image", content: heroDesktopImg },
    ],
  }),
  component: Advertorial,
});

const problems = [
  "दिनभर में एनर्जी बहुत जल्दी खत्म हो जाती है",
  "आत्मविश्वास (Confidence) कम हो जाता है",
  "तनाव (Stress) और लाइफस्टाइल की वजह से हमेशा चिंता बनी रहती है",
  "मार्केट में बहुत सारे प्रोडक्ट्स हैं — बहुत कन्फ्यूजन होती है",
  "यह एक पर्सनल बात है — किसी से शेयर करने में झिझक होती है",
];

const benefits = [
  {
    icon: Activity,
    title: "स्टैमिना सपोर्ट",
    body: "आपको दिनभर एक्टिव रखने और डेली स्टैमिना बढ़ाने में मदद करता है।",
  },
  {
    icon: Zap,
    title: "एनर्जी सपोर्ट",
    body: "थकावट कम करता है और एनर्जी लेवल्स को हाई रखता है।",
  },
  {
    icon: HeartPulse,
    title: "पुरुषों की वाइटलिटी सपोर्ट",
    body: "ओवरऑल पुरुषों की सेहत और कॉन्फिडेंस को बेहतर बनाता है।",
  },
  {
    icon: Leaf,
    title: "आसान डेली रूटीन",
    body: "हर्बल फॉर्मूला। एक कैप्सूल सुबह, एक रात को — बस इतना ही।",
  },
];

const callSteps = [
  { icon: ClipboardList, title: "फॉर्म भरें", body: "अपनी डिटेल्स शेयर करें — सिर्फ 30 सेकंड लगेंगे।" },
  { icon: PhoneCall, title: "एडवाइजर आपको पर्सनली कॉल करेंगे", body: "यह बिल्कुल गोपनीय और प्राइवेट कॉल होगी।" },
  { icon: Stethoscope, title: "आपकी समस्या को समझेंगे", body: "आपकी उम्र, गोल और लाइफस्टाइल के हिसाब से गाइडेंस देंगे।" },
  { icon: Headphones, title: "सही खुराक और बेस्ट ऑफर समझाएंगे", body: "आपके लिए सही पैक, इस्तेमाल का तरीका और बेस्ट प्राइस बताएंगे।" },
  { icon: HandshakeIcon, title: "आप सहमत हों तभी ऑर्डर कन्फर्म करें", body: "कैश ऑन डिलीवरी (COD) या ऑनलाइन — कोई प्रेशर नहीं है।" },
];

const testimonials = [
  {
    name: "रोहित एस.",
    avatar: avatar1,
    age: 34,
    city: "चेन्नई",
    before: "ऑफिस का तनाव और लेट नाइट्स की वजह से शाम तक थक जाता था। स्टैमिना कम होने लगा था।",
    after:
      "3 हफ़्तों में मेरी एनर्जी वापस आ गई। एडवाइजर द्वारा बताया गया रूटीन आसान था और कोई साइड इफेक्ट नहीं हुआ।",
    duration: "3 हफ़्ते",
  },
  {
    name: "विवेक एम.",
    avatar: avatar2,
    age: 41,
    city: "कोयंबटूर",
    before: "मैंने बहुत सारे प्रोडक्ट्स ट्राई किए थे — कुछ काम नहीं आया, बस पैसे बर्बाद हुए।",
    after:
      "एडवाइजर ने कॉल पर मुफ़्त गाइडेंस दी जिससे भरोसा बना। 1 महीने में साफ़ बदलाव दिखा, और पार्सल बिना kisi label ke आया।",
    duration: "1 महीना",
  },
  {
    name: "आकाश पी.",
    avatar: avatar3,
    age: 29,
    city: "मदुरै",
    before: "नई-नई शादी हुई थी। परफॉरमेंस एंग्जायटी (Performance anxiety) की वजह से किसी से बात नहीं कर पाता था।",
    after:
      "फ़ोन पर बात करने से हौसला मिला। एडवाइजर ने सब बहुत अच्छे से समझाया। अब मैं कॉन्फिडेंट महसूस करता हूँ।",
    duration: "6 हफ़्ते",
  },
  {
    name: "सुरेश आर.",
    avatar: avatar4,
    age: 47,
    city: "त्रिची",
    before: "उम्र बढ़ने के साथ स्टैमिना कम हो रहा था। डॉक्टर के पास जाने में शर्म आती थी।",
    after:
      "वेलनेस एडवाइजर से बात करके दोस्त जैसा लगा। उन्होंने एक पैक सजेस्ट किया। कैश ऑन डिलीवरी से डिलीवरी मिली, अब रेगुलर चल रहा है।",
    duration: "2 महीने",
  },
  {
    name: "कार्तिक वी.",
    avatar: avatar5,
    age: 36,
    city: "सेलम",
    before: "जिम जाने के बाद भी एनर्जी लो रहती थी। वैवाहिक जीवन में थोड़ा तनाव बढ़ गया था।",
    after:
      "एडवाइजर ने मेरी लाइफस्टाइल समझकर सही सलाह दी। 5 हफ़्तों में पॉजिटिव बदलाव मिला। हम दोनों खुश हैं।",
    duration: "5 हफ़्ते",
  },
  {
    name: "मणिकंदन टी.",
    avatar: avatar6,
    age: 38,
    city: "तिरुनेलवेली",
    before: "ऑनलाइन ऑर्डर करने में डर लगता था कि कहीं फैमिली को पता न चल जाए।",
    after:
      "पार्सल बिना किसी लेबल के बिल्कुल प्लेन बॉक्स में आया। किसी को पता नहीं चला और प्रोडक्ट ने काम भी किया।",
    duration: "1 महीना",
  },
];

const compare = [
  { feature: "गोपनीय एडवाइजर कॉल (Confidential advisor call)", us: true, them: false },
  { feature: "इस्तेमाल के लिए व्यक्तिगत गाइडेंस (Personalised usage guidance)", us: true, them: false },
  { feature: "साधारण बिना लेबल वाली पैकेजिंग (Discreet plain packaging)", us: true, them: "शायद" },
  { feature: "हर्बल वेलनेस सपोर्ट (Herbal wellness support)", us: true, them: "अलग-अलग" },
  { feature: "कैश ऑन डिलीवरी (Cash on Delivery)", us: true, them: "शायद" },
  { feature: "कॉल पर गाइडेंस सपोर्ट (Post-purchase support)", us: true, them: false },
];

const faqs = [
  {
    q: "💰 इसकी कीमत कितनी है? क्या मुझे कीमत पहले पता चल सकती है?",
    a: "कीमत आपकी जरूरत और पैक साइज पर निर्भर करती है। एडवाइजर कॉल पर आपको बिना किसी छिपे हुए चार्ज के सही पैक और सही कीमत बताएंगे। अगर आपको सही न लगे, तो बिल्कुल न खरीदें — कोई दबाव नहीं है।",
  },
  {
    q: "⚠️ क्या इसका कोई साइड इफेक्ट है?",
    a: "ESI Wellness Alpha Men 100% हर्बल फॉर्मूला है — जैसे अश्वगंधा और शिलाजीत। यह FSSAI और GMP प्रमाणित है। यह सुरक्षित है। यदि आपको कोई बीमारी है या आपकी दवा चल रही है, तो कृपया पहले अपने डॉक्टर से सलाह लें। एडवाइजर आपकी हेल्थ हिस्ट्री भी चेक करेंगे।",
  },
  {
    q: "🔒 क्या मेरी डिटेल्स और फोन नंबर सुरक्षित हैं?",
    a: "100% सुरक्षित हैं। आपकी डिटेल्स हमारे सुरक्षित डेटाबेस में रहती हैं। हम इसे किसी तीसरे पक्ष के साथ साझा नहीं करते हैं। एडवाइजर सिर्फ एक बार कॉल करेंगे — यदि आप मना कर देंगे तो उसके बाद कोई स्पैम कॉल या मैसेज नहीं आएगा। कोई स्पैम व्हाट्सएप या एसएमएस मार्केटिंग भी नहीं होगी।",
  },
  {
    q: "📦 डिलीवरी कैसे होगी? क्या किसी को पता चलेगा?",
    a: "पार्सल बिल्कुल साधारण (प्लेन) बॉक्स में आएगा — बॉक्स पर न तो प्रोडक्ट का नाम होगा और न ही कंपनी का लोगो। डिलीवरी करने वाले या परिवार को कुछ पता नहीं चलेगा। बड़े शहरों में 2-4 दिन और अन्य जगहों पर 4-7 दिन लगेंगे।",
  },
  {
    q: "↩️ यदि प्रोडक्ट मेरे लिए सही न हो, तो क्या मुझे रिफंड मिल सकता है?",
    a: "हाँ। सीलबंद (Unopened) पैक पर 7 दिनों की रिटर्न पॉलिसी है। किसी भी क्वालिटी इश्यू पर पूरा रिफंड मिलेगा। खुले हुए पैक के लिए एडवाइजर मदद करेंगे। कैश ऑन डिलीवरी में आपको पार्सल मिलने के बाद ही भुगतान करना है — रिस्क बिल्कुल जीरो है।",
  },
  {
    q: "📞 मुझे कौन और कब कॉल करेगा?",
    a: "हमारे वेलनेस एडवाइजर (डॉ. राकेश के. या उनकी टीम) फॉर्म भरने के 1-4 घंटे के भीतर आपके चुने हुए समय पर कॉल करेंगे। कॉल 15-30 मिनट की होगी — बिल्कुल गोपनीय बातचीत।",
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
        प्रायोजित वेलनेस परामर्श (Sponsored Wellness Consultation)
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
            मुफ़्त कॉल बुक करें
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
                मुफ़्त व्यक्तिगत परामर्श
              </span>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-ink">
                स्टैमिना, एनर्जी और कॉन्फिडेंस के लिए —{" "}
                <span className="text-brand">मुफ़्त व्यक्तिगत परामर्श</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
                ESI Wellness Alpha Men को लेकर असमंजस में हैं? अपनी डिटेल्स शेयर करें। हमारे वेलनेस एडवाइजर आपको{" "}
                <strong className="text-ink">गोपनीय कॉल (Confidential call) पर</strong> सब समझाएंगे — इस्तेमाल का तरीका, सही पैक, कीमत और डिलीवरी।
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
                  <span>100% गोपनीय कॉल</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>कोई अजीब सवाल नहीं</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>कैश ऑन डिलीवरी (COD)</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Check className="h-4 w-4 text-brand flex-shrink-0" />
                  <span>बिना लेबल के प्लेन पैकेजिंग</span>
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
            क्या आप भी ऐसा महसूस करते हैं?
          </h2>
          <p className="mt-2 text-ink-muted">
            आप अकेले नहीं हैं। लाखों भारतीय पुरुष बिल्कुल ऐसा ही महसूस करते हैं।
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
            <ScrollToFormButton>गोपनीय गाइडेंस प्राप्त करें</ScrollToFormButton>
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
              ESI Wellness Alpha Men का <span className="text-brand">दैनिक वेलनेस सपोर्ट</span>
            </h2>
            <p className="mt-2 text-ink-muted">
              एक हर्बल फॉर्मूला जो आपकी डेली रूटीन में आसानी से फिट हो जाता है।
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
            * परिणाम अलग-अलग हो सकते हैं। यह एक वेलनेस सपोर्ट प्रोडक्ट है — इससे कोई मेडिकल दावा नहीं किया जाता है।
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
              आसान स्टेप्स
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-ink">
              फॉर्म भरने के बाद क्या होता है?
            </h2>
            <p className="mt-2 text-ink-muted">
              बिल्कुल पारदर्शी प्रक्रिया। कोई छिपा हुआ कदम नहीं।
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
            <ScrollToFormButton>मुफ़्त कॉल बुक करें</ScrollToFormButton>
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
              वास्तविक ग्राहकों के अनुभव
            </h2>
            <p className="mt-2 text-ink-muted">
              हमारे एडवाइजर से बात करने के बाद ग्राहकों का क्या कहना है।
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
                      पहले (Before)
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      "{t.before}"
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-ink-muted/30 bg-ink/5 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                        बाद में ({t.duration})
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
            * वास्तविक ग्राहक प्रतिक्रिया। गोपनीयता के लिए नाम बदले गए हैं। परिणाम अलग-अलग व्यक्तियों में भिन्न हो सकते हैं।
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
              रियल-लाइफ परिणाम (Real-life results)
            </span>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-paper">
              वापस पाएं अपनी <span className="text-brand-glow">इंटीमेसी, कॉन्फिडेंस और कनेक्शन</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-paper/70 leading-relaxed">
              जब स्टैमिना और एनर्जी वापस आती है, तब सिर्फ बेडरूम में ही नहीं —
              आपको अपने रिश्ते, आत्मविश्वास और समग्र जीवन में बदलाव दिखेगा।
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                src: lifestyle1,
                tag: "इंटीमेसी",
                line: "अपने पार्टनर के साथ भावनात्मक रूप से फिर से जुड़ें।",
              },
              {
                src: lifestyle2,
                tag: "आत्मविश्वास",
                line: "परफॉरमेंस एंग्जायटी से मुक्त रहें।",
              },
              {
                src: lifestyle3,
                tag: "कनेक्शन",
                line: "आपका रिश्ता और भी करीब और गहरा हो जाता है।",
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
            * ये केवल सांकेतिक चित्र हैं। परिणाम अलग-अलग हो सकते हैं। ESI Wellness Alpha Men एक हर्बल वेलनेस सपोर्ट प्रोडक्ट है।
          </p>

          <div className="mt-8 text-center">
            <ScrollToFormButton>मुफ़्त कॉल प्राप्त करें</ScrollToFormButton>
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
              ESI Wellness Alpha Men बनाम <span className="text-ink-muted">बाजार के सामान्य उत्पाद</span>
            </h2>
            <p className="mt-2 text-ink-muted">
              एक ईमानदार तुलना — समझदार पुरुष एडवाइजर-गाइडेड दृष्टिकोण क्यों चुनते हैं।
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-rule bg-card shadow-sm">
            <div className="grid grid-cols-3 bg-ink text-paper">
              <div className="p-4 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                विशेषताएं (Features)
              </div>
              <div className="p-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider bg-brand text-brand-foreground">
                ESI Wellness Alpha Men
              </div>
              <div className="p-4 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider">
                बाजार के सामान्य उत्पाद
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
                अभी भी असमंजस में हैं? <br />
                <span className="text-brand">पहले हमारे एडवाइजर से बात करें।</span>
              </h2>
              <p className="mt-4 text-base text-ink-muted leading-relaxed">
                कोई दबाव नहीं। कोई अजीब सवाल नहीं। बस कॉल पर आसान स्पष्टीकरण —
                प्रोडक्ट, इस्तेमाल के तरीके, कीमत और डिलीवरी के बारे में।
              </p>

              <ul className="mt-6 space-y-2.5 text-left max-w-md lg:max-w-none mx-auto lg:mx-0">
                {[
                  { icon: Lock, text: "100% प्राइवेट और गोपनीय" },
                  { icon: Truck, text: "साधारण प्लेन पैकेजिंग में डिलीवरी" },
                  { icon: Package, text: "कैश ऑन डिलीवरी (COD) — डिलीवरी के समय भुगतान करें" },
                  { icon: ShieldCheck, text: "प्रशिक्षित वेलनेस एडवाइजर" },
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
              अक्सर पूछे जाने वाले प्रश्न (FAQs)
            </h2>
            <p className="mt-2 text-ink-muted">
              आपके मन के सवाल — हमारी तरफ से सच्चे जवाब।
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
            <ScrollToFormButton>मुफ़्त कॉल बैक प्राप्त करें</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule bg-ink/5">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-ink-muted">
          <p className="font-semibold text-ink">ESI Wellness × Alpha Men</p>
          <p className="mt-2">
            यह एक वेलनेस सपोर्ट प्रोडक्ट है। परिणाम अलग-अलग हो सकते हैं। नाबालिगों या किसी भी चिकित्सीय स्थिति वाले व्यक्ति को अपने डॉक्टर से सलाह लेनी चाहिए।
          </p>
          <p className="mt-2">© {new Date().getFullYear()} ESI Wellness. All rights reserved.</p>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}
