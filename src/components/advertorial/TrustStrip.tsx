import { Star, Users, Lock, Leaf } from "lucide-react";

const SHORT_TESTIMONIALS = [
  {
    name: "Karthik, 34",
    city: "Madurai",
    quote:
      "The advisor called and explained everything in detail. Zero pressure.",
  },
  {
    name: "Suresh, 41",
    city: "Coimbatore",
    quote: "It arrived in discreet packaging. I could buy it safely without family knowing.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-rule bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Badges row */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-ink">
          <li className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-brand" />
            <span>
              Trusted by <strong className="text-ink">10,000+</strong> Indian men
            </span>
          </li>
          <li className="hidden sm:block h-4 w-px bg-rule" />
          <li className="flex items-center gap-1.5">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-brand text-brand"
                />
              ))}
            </span>
            <strong className="text-ink">4.7</strong>
            <span className="text-ink-muted">(2,400+ reviews)</span>
          </li>
          <li className="hidden sm:block h-4 w-px bg-rule" />
          <li className="flex items-center gap-1.5">
            <Leaf className="h-4 w-4 text-brand" />
            <span>Ayurveda Certified</span>
          </li>
          <li className="hidden sm:block h-4 w-px bg-rule" />
          <li className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-brand" />
            <span>100% confidential</span>
          </li>
        </ul>

        {/* 2 short testimonials */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SHORT_TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border border-rule bg-paper p-4 shadow-sm"
            >
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-brand text-brand" />
                ))}
              </div>
              <blockquote className="mt-1.5 text-sm text-ink leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-2 text-xs text-ink-muted">
                — {t.name}, {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
