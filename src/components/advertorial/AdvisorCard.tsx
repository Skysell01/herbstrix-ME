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
          आपको कौन कॉल करेगा
        </span>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <img
          src={advisorPhoto}
          alt="डॉ. राकेश के., सीनियर वेलनेस एडवाइजर"
          loading="lazy"
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-brand/30 shadow-md"
        />
        <div className="min-w-0">
          <div className="font-serif text-lg font-bold text-ink leading-tight">
            Dr. Rakesh K. <span className="text-sm font-semibold text-ink-muted">(BAMS)</span>
          </div>
          <div className="text-xs text-ink-muted">
            सीनियर वेलनेस एडवाइजर · इंटीमेसी स्कूल्स
          </div>
        </div>
      </div>

      <ul className="mt-4 grid gap-2 text-sm text-ink">
        <li className="flex items-start gap-2">
          <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>35+ वर्षों</strong> का अनुभव — पुरुषों की सेहत और परामर्श में
          </span>
        </li>
        <li className="flex items-start gap-2">
          <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>अंग्रेजी, तमिल, हिंदी</strong> — अपनी पसंद की भाषा में बात करें
          </span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            <strong>100% गोपनीय (Confidential)</strong> — कोई जजमेंट नहीं, कोई दबाव नहीं
          </span>
        </li>
        <li className="flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
          <span>
            औसत कॉल का समय <strong>15-20 मिनट</strong>
          </span>
        </li>
      </ul>

      <p className="mt-4 border-t border-rule pt-3 text-[11px] text-ink-muted italic leading-relaxed">
        "मेरा काम केवल प्रोडक्ट बेचना नहीं है — आपको सही सलाह देना है। अगर यह आपके लिए सही नहीं है, तो मैं खुद आपको न खरीदने की सलाह दूंगा।"
      </p>
    </div>
  );
}
