import { ShieldCheck, Languages, GraduationCap, PhoneCall, Clock } from "lucide-react";
import advisorPhoto from "@/assets/advisor-doctor.jpg";

/**
 * Trust card placed next to the lead form. Reduces "who is calling me?" anxiety.
 * Text-only by request — no photos.
 */
export function AdvisorCard() {
  return (
    <div className="rounded-2xl border border-rule bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
          <PhoneCall className="h-3 w-3" />
          Who will call you
        </span>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <img
          src={advisorPhoto}
          alt="Dr. Rakesh K., Senior Wellness Advisor"
          loading="lazy"
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-brand/30 shadow-md"
        />
        <div className="min-w-0">
          <div className="font-serif text-lg font-bold text-ink leading-tight">
            Dr. Rakesh K. <span className="text-sm font-semibold text-ink-muted">(BAMS)</span>
          </div>
          <div className="text-xs text-ink-muted">
            Senior Wellness Advisor · Intimacy Schools
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-2 text-sm text-ink">
        <li className="flex items-start gap-2">
          <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>35+ years</strong> of experience — men's wellness counselling
          </span>
        </li>
        <li className="flex items-start gap-2">
          <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>English, Tamil, हिंदी</strong> — speak in the language you prefer
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>100% confidential</strong> — no judgement, no sales pressure
          </span>
        </li>
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            Average call duration <strong>15–20 minutes</strong>
          </span>
        </li>
      </ul>

      <p className="mt-4 border-t border-rule pt-3 text-[11px] text-ink-muted italic leading-relaxed">
        "My job isn't to sell a product — it's to give you the right guidance.
        If it isn't right for you, I'll tell you not to buy."
      </p>
    </div>
  );
}
