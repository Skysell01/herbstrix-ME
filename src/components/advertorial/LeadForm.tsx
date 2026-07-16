import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  PhoneCall,
  User,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { submitLead } from "@/functions/leads.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "कृपया अपना नाम दर्ज करें")
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, "नाम में केवल अक्षर होने चाहिए"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "अमान्य नंबर, कृपया 10 अंकों का नंबर डालें"),
  age: z.coerce
    .number({ invalid_type_error: "कृपया अपनी उम्र दर्ज करें" })
    .int()
    .min(18, "केवल 18 वर्ष या उससे अधिक")
    .max(99, "कृपया सही उम्र दर्ज करें"),
  city: z.string().trim().min(1, "कृपया अपना शहर दर्ज करें").max(80),
  concern: z.enum(["stamina", "energy", "confidence", "wellness", "guidance"]),
  bestTime: z.enum(["morning", "afternoon", "evening", "anytime"]),
});

type FormValues = z.infer<typeof Schema>;



export function LeadForm({ id = "claim", compact = false }: { id?: string; compact?: boolean }) {
  const submit = useServerFn(submitLead);
  const [done, setDone] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
      phone: "",
      age: undefined as unknown as number,
      city: "",
      concern: "stamina",
      bestTime: "anytime",
    },
  });



  const onSubmit = async (values: FormValues) => {
    try {
      const res = await submit({ data: values });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setDone(true);
      toast.success("अनुरोध प्राप्त हुआ। हमारे एडवाइजर आपको जल्द ही कॉल करेंगे।");
      // Fire Meta Pixel Lead event for Facebook ads tracking
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: "Advisor Callback Request",
          content_category: values.concern,
        });
      }
      // Smooth scroll up so user sees the thank-you screen
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    } catch (e) {
      console.error(e);
      toast.error("कुछ गलत हुआ। कृपया फिर से प्रयास करें।");
    }
  };

  if (done) {
    const firstName = (form.getValues("name") || "").trim().split(" ")[0] || "there";
    return (
      <div
        id={id}
        className="animate-fade-in-up rounded-2xl border-2 border-brand bg-gradient-to-br from-brand-soft to-card p-6 sm:p-8 shadow-2xl"
      >
        <div className="animate-success-bounce mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 ring-4 ring-brand/20">
          <CheckCircle2 className="h-10 w-10 text-brand" />
        </div>

        <h3 className="text-center font-serif text-2xl sm:text-3xl text-ink">
          धन्यवाद, {firstName}! 🙏
        </h3>
        <p className="mt-2 text-center text-sm sm:text-base text-ink-muted">
          आपका परामर्श अनुरोध (Consultation request) <span className="font-semibold text-ink">कन्फर्म</span> हो गया है।
        </p>

        {/* Expert call callout */}
        <div className="mt-6 rounded-xl border-2 border-brand bg-brand/10 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xl shadow-md animate-pulse-glow">
              <PhoneCall className="h-5 w-5 text-brand-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold text-ink leading-snug">
                हमारे वेलनेस एडवाइजर आपको जल्द ही कॉल करेंगे
              </p>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                वह आपकी समस्या को समझकर सही <strong className="text-ink">पैक, खुराक और ऑफर्स</strong> की सिफारिश करेंगे —
                यह पूरी तरह से <strong className="text-ink">प्राइवेट</strong> और <strong className="text-ink">गोपनीय</strong> बातचीत होगी।
                कॉल आमतौर पर <strong className="text-ink">15-30 मिनट</strong> के भीतर आती हैं।
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-rule bg-card/70 p-4 sm:p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-brand">आगे क्या होगा</p>
          <ol className="mt-3 space-y-3 text-sm text-ink">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                1
              </span>
              <span>हमारे <strong>वेलनेस एडवाइजर</strong> आपको व्यक्तिगत रूप से कॉल करेंगे।</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                2
              </span>
              <span>वह आपकी उम्र, लाइफस्टाइल और लक्ष्य के अनुसार सही <strong>पैक</strong> की सलाह देंगे।</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                3
              </span>
              <span>यदि आप सहमत हों, तो <strong>कैश ऑन डिलीवरी (COD) या ऑनलाइन</strong> से ऑर्डर कन्फर्म करें — कोई दबाव नहीं।</span>
            </li>
          </ol>
        </div>

        <p className="mt-4 text-center text-xs text-ink-muted flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3" />
          की डिटेल्स 100% सुरक्षित और गोपनीय हैं।
        </p>
      </div>
    );
  }

  return (
    <div id={id} className="relative">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand/40 via-brand-glow/30 to-brand/40 opacity-60 blur-lg"
        aria-hidden
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative rounded-2xl border border-rule bg-card shadow-2xl ${
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
        }`}
        noValidate
      >
        {/* Top badge */}
        <div className="mb-3 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            100% गोपनीय परामर्श (Confidential Consultation)
          </span>
        </div>

        <h3 className="text-center font-serif text-2xl sm:text-[26px] text-ink leading-tight">
          जांचें कि क्या यह आपके लिए सही है — <span className="text-brand">मुफ़्त एडवाइजर कॉल</span>
        </h3>
        <p className="mt-2 text-center text-sm text-ink-muted">
          अपनी डिटेल्स शेयर करें। हमारे वेलनेस एडवाइजर आपको व्यक्तिगत रूप से कॉल करेंगे।
        </p>

        <div className="mt-6 grid gap-4">
          {/* Name + Age */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-ink">
                पूरा नाम (Full Name)
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  id="name"
                  placeholder="Rajesh Kumar"
                  autoComplete="name"
                  maxLength={100}
                  className="h-12 pl-10 text-base"
                  {...form.register("name")}
                />
              </div>
              {form.formState.errors.name && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age" className="text-sm font-semibold text-ink">
                उम्र (Age)
              </Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="32"
                  min={18}
                  max={99}
                  className="h-12 pl-10 text-base"
                  {...form.register("age")}
                />
              </div>
              {form.formState.errors.age && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.age.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-semibold text-ink">
              मोबाइल नंबर (Mobile Number) <span className="text-brand">*</span>
            </Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted border-r border-rule pr-2">
                +91
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                autoComplete="tel"
                maxLength={10}
                className="h-12 pl-20 text-base"
                {...form.register("phone")}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</p>
            )}
            <p className="mt-1 text-xs text-ink-muted">एडवाइजर इस नंबर पर व्हाट्सएप या कॉल करेंगे</p>
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="text-sm font-semibold text-ink">
              शहर (City)
            </Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <Input
                id="city"
                placeholder="दिल्ली, मुंबई, बेंगलुरु..."
                autoComplete="address-level2"
                maxLength={80}
                className="h-12 pl-10 text-base"
                {...form.register("city")}
              />
            </div>
            {form.formState.errors.city && (
              <p className="mt-1 text-xs text-destructive">{form.formState.errors.city.message}</p>
            )}
          </div>


          {/* CTA */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cta-premium relative h-14 w-full text-brand-foreground text-base font-bold tracking-wide rounded-md disabled:opacity-70 disabled:animate-none mt-1"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {form.formState.isSubmitting ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  सबमिट हो रहा है…
                </>
              ) : (
                <>
                  <PhoneCall className="h-5 w-5" />
                  मुफ़्त कॉल बैक प्राप्त करें
                  <span className="text-lg">→</span>
                </>
              )}
            </span>
          </Button>

          {/* Microcopy */}
          <p className="text-center text-xs text-ink-muted leading-relaxed">
            <Lock className="inline h-3 w-3 mr-1 -mt-0.5" />
            100% प्राइवेट। आपका नंबर केवल एडवाइजर कॉल के लिए उपयोग किया जाएगा।
            <span className="block mt-0.5">कोई स्पैम नहीं। कोई दबाव नहीं। कोई अजीब सवाल नहीं।</span>
          </p>
        </div>
      </form>
    </div>
  );
}
