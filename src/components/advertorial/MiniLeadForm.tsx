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
  Calendar,
} from "lucide-react";
import { submitLead, updateLead } from "@/functions/leads.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScarcityChip } from "@/components/advertorial/ScarcityChip";
import { whatsappLink } from "@/lib/contact";
import { track, trackCTA } from "@/lib/analytics";

// Step 1 — minimum to be a usable lead. City moved to optional Step 2 to
// reduce above-the-fold form friction.
const Step1Schema = z.object({
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
  // Honeypot — bots fill this, humans never see it
  website: z.string().max(0).optional().or(z.literal("")),
});
type Step1Values = z.infer<typeof Step1Schema>;

const Step2Schema = z.object({
  age: z.coerce
    .number({ invalid_type_error: "Your age" })
    .int()
    .min(18, "18+ only")
    .max(99, "Valid age"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  concern: z.enum(["stamina", "energy", "confidence", "wellness", "guidance"]),
  bestTime: z.enum(["morning", "afternoon", "evening", "anytime"]),
});
type Step2Values = z.infer<typeof Step2Schema>;

/** Format Indian mobile numbers as `XXXXX XXXXX` while typing. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "").slice(0, 10);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}


function trackPixel(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", event, props ?? {});
  }
}

export function MiniLeadForm({ id = "claim" }: { id?: string }) {
  const submit = useServerFn(submitLead);
  const update = useServerFn(updateLead);

  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [leadId, setLeadId] = useState<string>("");
  const [sheetRange, setSheetRange] = useState<string | null>(null);
  const [contact, setContact] = useState<{
    name: string;
    phone: string;
  }>({ name: "", phone: "" });

  const step1 = useForm<Step1Values>({
    resolver: zodResolver(Step1Schema),
    defaultValues: { name: "", phone: "", website: "" },
  });

  const step2 = useForm<Step2Values>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      age: undefined as unknown as number,
      city: "",
      concern: "stamina",
      bestTime: "anytime",
    },
  });

  const focusedFirstField = useState(false);
  const onAnyFocus = () => {
    if (!focusedFirstField[0]) {
      focusedFirstField[1](true);
      trackPixel("InitiateCheckout", { content_name: "Lead Form Start" });
    }
  };

  const onSubmitStep1 = async (values: Step1Values) => {
    // Honeypot check
    if (values.website && values.website.length > 0) {
      // Pretend success to the bot
      setStep("done");
      return;
    }
    track("FormSubmitAttempt", { form: "mini", step: 1 });
    try {
      const res = await submit({
        data: {
          name: values.name.trim(),
          phone: values.phone.trim(),
          city: "",
        },
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setLeadId(res.leadId ?? "");
      setSheetRange(res.sheetRange ?? null);
      setContact({
        name: values.name.trim(),
        phone: values.phone.trim(),
      });
      trackPixel("Lead", {
        content_name: "Advisor Callback Request",
        step: 1,
      });
      toast.success("Thanks! Just one more step — your advisor will be better prepared.");
      setStep(2);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const skipStep2 = () => {
    setStep("done");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    });
  };

  const onSubmitStep2 = async (values: Step2Values) => {
    track("FormSubmitAttempt", { form: "mini", step: 2 });
    try {
      const res = await update({
        data: {
          leadId,
          sheetRange,
          name: contact.name,
          phone: contact.phone,
          age: values.age,
          city: (values.city ?? "").trim(),
          concern: values.concern,
          bestTime: values.bestTime,
        },
      });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      trackPixel("CompleteRegistration", {
        content_name: "Lead Step 2",
        content_category: values.concern,
      });
      toast.success("Thanks! Our advisor will call you shortly.");
      skipStep2();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    }
  };



  if (step === "done") {
    const firstName = contact.name.split(" ")[0] || "there";
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
          Your consultation request is{" "}
          <span className="font-semibold text-ink">confirmed</span>.
        </p>
        <div className="mt-6 rounded-xl border-2 border-brand bg-brand/10 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xl shadow-md animate-pulse-glow">
              <PhoneCall className="h-5 w-5 text-brand-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold text-ink leading-snug">
                Our wellness advisor will call you within <strong>15–30 minutes</strong>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                A completely private, judgement-free conversation. They'll explain the right pack,
                dosage and offer for you.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3" />
          Your details are 100% safe.
        </p>
      </div>
    );
  }

  return (
    <div id={id} className="relative">
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand/40 via-brand-glow/30 to-brand/40 opacity-60 blur-lg"
        aria-hidden
      />

      {step === 1 && (
        <form
          onSubmit={step1.handleSubmit(onSubmitStep1)}
          className="relative rounded-2xl border border-rule bg-card shadow-2xl p-5 sm:p-7"
          noValidate
        >
          <div className="mb-3 flex items-center justify-center">
            <ScarcityChip />
          </div>

          <h3 className="text-center font-serif text-xl sm:text-2xl text-ink leading-tight">
            <span className="text-brand">Free call</span> — only 30 seconds
          </h3>
          <p className="mt-1.5 text-center text-xs sm:text-sm text-ink-muted">
            Just name + number. The advisor will call you.
          </p>

          {/* Honeypot — visually hidden, off-screen */}
          <div
            aria-hidden
            style={{ position: "absolute", left: "-9999px", top: 0 }}
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...step1.register("website")}
            />
          </div>

          <div className="mt-5 grid gap-3">
            <div>
              <Label htmlFor="mini-name" className="sr-only">
                Full name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  id="mini-name"
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
                  className="h-12 pl-10 text-base"
                  onFocus={onAnyFocus}
                  {...step1.register("name")}
                />
              </div>
              {step1.formState.errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {step1.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="mini-phone" className="sr-only">
                Mobile Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted border-r border-rule pr-2">
                  +91
                </span>
                <Input
                  id="mini-phone"
                  type="tel"
                  placeholder="9876543210"
                  autoComplete="tel"
                  maxLength={10}
                  className="h-12 pl-20 text-base"
                  onFocus={onAnyFocus}
                  {...step1.register("phone")}
                />
              </div>
              {step1.formState.errors.phone && (
                <p className="mt-1 text-xs text-destructive">
                  {step1.formState.errors.phone.message}
                </p>
              )}
            </div>



            <Button
              type="submit"
              disabled={step1.formState.isSubmitting}
              className="cta-premium relative h-14 w-full text-brand-foreground text-base font-bold tracking-wide rounded-md disabled:opacity-70 disabled:animate-none mt-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {step1.formState.isSubmitting ? (
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

            <div className="mt-1 space-y-1.5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-ink">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                Your info is safe · No spam · 1 call only
              </p>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
                <Lock className="h-3 w-3" />
                ₹0 cost · COD available · zero pressure
              </p>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={step2.handleSubmit(onSubmitStep2)}
          className="relative rounded-2xl border border-rule bg-card shadow-2xl p-5 sm:p-7 animate-fade-in-up"
          noValidate
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Step 1 done
            </span>
          </div>

          <h3 className="text-center font-serif text-xl sm:text-2xl text-ink leading-tight">
            A few details so the advisor is <span className="text-brand">better prepared</span>
          </h3>
          <p className="mt-1.5 text-center text-xs sm:text-sm text-ink-muted">
            Optional — even if you skip, the advisor will still call.
          </p>

          <div className="mt-5 grid gap-3">
            <div>
              <Label htmlFor="step2-age" className="text-sm font-semibold text-ink">
                Age
              </Label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input
                  id="step2-age"
                  type="number"
                  inputMode="numeric"
                  placeholder="32"
                  min={18}
                  max={99}
                  className="h-12 pl-10 text-base"
                  {...step2.register("age")}
                />
              </div>
              {step2.formState.errors.age && (
                <p className="mt-1 text-xs text-destructive">
                  {step2.formState.errors.age.message}
                </p>
              )}
            </div>



            <Button
              type="submit"
              disabled={step2.formState.isSubmitting}
              className="cta-premium relative h-14 w-full text-brand-foreground text-base font-bold tracking-wide rounded-md disabled:opacity-70 disabled:animate-none mt-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {step2.formState.isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Submit details
                  </>
                )}
              </span>
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-ink">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" />
              Your info is safe · No spam · 1 call only
            </p>

            <button
              type="button"
              onClick={skipStep2}
              className="text-center text-xs text-ink-muted underline hover:text-ink"
            >
              Skip — let the advisor call me now
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
