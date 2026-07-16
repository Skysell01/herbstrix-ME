import { useEffect, useState } from "react";
import { Flame, X } from "lucide-react";
import { spotsRemaining, timeLeftToday, SPOTS_PER_DAY } from "@/lib/scarcity";
import { trackCTA } from "@/lib/analytics";

const DISMISS_KEY = "urgency_bar_dismissed_at";

function isDismissedThisSession() {
  if (typeof window === "undefined") return false;
  try {
    const v = sessionStorage.getItem(DISMISS_KEY);
    return v === "1";
  } catch {
    return false;
  }
}

export function UrgencyBar() {
  const [dismissed, setDismissed] = useState(true); // SSR-safe default
  const [t, setT] = useState(() => timeLeftToday());
  const [spots, setSpots] = useState(() => spotsRemaining());

  useEffect(() => {
    setDismissed(isDismissedThisSession());
    const id = setInterval(() => {
      setT(timeLeftToday());
      setSpots(spotsRemaining());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTA("urgency_bar", "Claim free spot");
    const el = document.getElementById("claim");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const handleDismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* noop */
    }
    setDismissed(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const lowSpots = spots <= 10;

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-brand to-brand-glow text-brand-foreground shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:px-4">
        <Flame className="h-4 w-4 flex-shrink-0 animate-pulse" />
        <a
          href="#claim"
          onClick={handleClick}
          className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-semibold leading-snug"
        >
          <span>Today only — {SPOTS_PER_DAY} free consultations</span>
          <span
            className={`inline-flex items-center gap-1 rounded-full bg-paper/20 px-2 py-0.5 text-[11px] sm:text-xs ${
              lowSpots ? "ring-1 ring-paper" : ""
            }`}
          >
            <span className="font-bold tabular-nums">{spots}</span>
            <span className="opacity-90">spots left</span>
          </span>
          <span className="hidden sm:inline opacity-90">·</span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <span className="opacity-90">Ends in:</span>
            <span className="font-bold">
              {pad(t.m)}:{pad(t.s)}
            </span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-paper/15 px-2 py-1 text-[11px] sm:text-xs font-bold underline-offset-2 hover:underline">
            Claim →
          </span>
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="flex-shrink-0 rounded-md p-1 hover:bg-paper/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
