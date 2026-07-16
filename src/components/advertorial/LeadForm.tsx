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
    .min(1, "Please enter your name")
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, "Only alphabetic characters are allowed"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "invalid number the reuired 10 digit number"),
  age: z.coerce
    .number({ invalid_type_error: "Please enter your age" })
    .int()
    .min(18, "18+ only")
    .max(99, "Please enter a valid age"),
  city: z.string().trim().min(1, "Please enter your city").max(80),
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
      toast.success("Request received. Our advisor will call you shortly.");
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
      toast.error("Something went wrong. Please try again.");
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
          Thank you, {firstName}! 🙏
        </h3>
        <p className="mt-2 text-center text-sm sm:text-base text-ink-muted">
          Your consultation request is <span className="font-semibold text-ink">confirmed</span>.
        </p>

        {/* Expert call callout */}
        <div className="mt-6 rounded-xl border-2 border-brand bg-brand/10 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xl shadow-md animate-pulse-glow">
              <PhoneCall className="h-5 w-5 text-brand-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold text-ink leading-snug">
                Our wellness advisor will call you shortly
              </p>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                They'll understand your concern and recommend the <strong className="text-ink">right pack, dosage and offer</strong> —
                a completely <strong className="text-ink">private</strong> and <strong className="text-ink">judgement-free</strong> conversation.
                Calls usually come within <strong className="text-ink">15–30 minutes</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-rule bg-card/70 p-4 sm:p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-brand">What happens next</p>
          <ol className="mt-3 space-y-3 text-sm text-ink">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                1
              </span>
              <span>Our <strong>wellness advisor</strong> will call you personally.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                2
              </span>
              <span>They'll understand your age, lifestyle and goal and recommend the <strong>right pack</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                3
              </span>
              <span>If you agree, confirm the order via <strong>COD or online</strong> — zero pressure.</span>
            </li>
          </ol>
        </div>

        <p className="mt-4 text-center text-xs text-ink-muted flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3" />
          Your details are 100% safe and confidential.
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
            100% Confidential Consultation
          </span>
        </div>

        <h3 className="text-center font-serif text-2xl sm:text-[26px] text-ink leading-tight">
          Check if it's right for you — <span className="text-brand">free advisor call</span>
        </h3>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Share your details. Our wellness advisor will call you personally.
        </p>

        <div className="mt-6 grid gap-4">
          {/* Name + Age */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-ink">
                Full name
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
                Age
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
              Mobile Number <span className="text-brand">*</span>
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
            <p className="mt-1 text-xs text-ink-muted">The advisor will WhatsApp / call this number</p>
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="text-sm font-semibold text-ink">
              City
            </Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <Input
                id="city"
                placeholder="Chennai, Coimbatore, Madurai..."
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
                  Submitting…
                </>
              ) : (
                <>
                  <PhoneCall className="h-5 w-5" />
                  Get a free callback
                  <span className="text-lg">→</span>
                </>
              )}
            </span>
          </Button>

          {/* Microcopy */}
          <p className="text-center text-xs text-ink-muted leading-relaxed">
            <Lock className="inline h-3 w-3 mr-1 -mt-0.5" />
            100% private. Your number will only be used for the advisor call.
            <span className="block mt-0.5">No spam. No pressure. No awkward questions.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
