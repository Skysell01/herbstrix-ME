import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { spotsRemaining } from "@/lib/scarcity";
import { trackCTA } from "@/lib/analytics";

export function StickyCTA() {
  const [mounted, setMounted] = useState(false);
  const [spots, setSpots] = useState(() => spotsRemaining());

  useEffect(() => {
    setMounted(true);
    setSpots(spotsRemaining());
    const id = setInterval(() => setSpots(spotsRemaining()), 30_000);
    return () => clearInterval(id);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTA("sticky_bottom", "Free advisor call");
    const el = document.getElementById("claim");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      // Auto-focus the first input after scroll completes
      setTimeout(() => {
        const input = el.querySelector<HTMLInputElement>(
          'input[type="text"], input[type="tel"], input:not([type])',
        );
        input?.focus({ preventScroll: true });
      }, 500);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="text-xs leading-tight">
          <div className="font-semibold text-ink">मुफ़्त वेलनेस परामर्श</div>
          <div className="text-ink-muted">
            <span className="font-semibold text-brand tabular-nums">{mounted ? spots : "—"}</span>{" "}
            सीटें बची हैं आज
          </div>
        </div>
        <a
          href="#claim"
          onClick={handleClick}
          className="cta-premium flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-bold text-brand-foreground animate-pulse-glow"
        >
          <PhoneCall className="h-4 w-4" />
          मुफ़्त कॉल
        </a>
      </div>
    </div>
  );
}
