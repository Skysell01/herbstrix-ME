import { useEffect, useState } from "react";
import { X, PhoneCall, Gift } from "lucide-react";
import { ScarcityChip } from "./ScarcityChip";
import { trackCTA, track } from "@/lib/analytics";

const DISMISS_KEY = "exit_popup_dismissed";

function isDismissed() {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Last-chance popup.
 * - Desktop: triggered by exit-intent (mouse leaves toward top of viewport).
 * - Mobile: triggered by sustained scroll-up after the user has scrolled at
 *   least 40% down the page.
 */
export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isDismissed()) return;

    const mobile = isMobile();
    let lastY = window.scrollY;
    let upDistance = 0;
    let triggered = false;

    const trigger = (source: string) => {
      if (triggered || isDismissed()) return;
      triggered = true;
      setOpen(true);
      track("ExitIntent", { source });
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 5) trigger("desktop_exit");
    };

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? y / max : 0;
      if (y < lastY) {
        upDistance += lastY - y;
        if (pct > 0.4 && upDistance > 400) trigger("mobile_scroll_up");
      } else {
        upDistance = 0;
      }
      lastY = y;
    };

    if (mobile) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* noop */
    }
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCTA("exit_popup", "Claim free callback");
    close();
    requestAnimationFrame(() => {
      const el = document.getElementById("claim");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        setTimeout(() => {
          const input = el.querySelector<HTMLInputElement>(
            'input[type="text"], input[type="tel"], input:not([type])',
          );
          input?.focus({ preventScroll: true });
        }, 500);
      }
    });
  };

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-3 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Last chance offer"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md animate-fade-in-up rounded-2xl border-2 border-brand bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-ink-muted hover:bg-ink/5 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/15">
          <Gift className="h-6 w-6 text-brand" />
        </div>

        <h3 className="mt-3 text-center font-serif text-2xl font-bold text-ink">
          One moment — don't leave yet
        </h3>
        <p className="mt-2 text-center text-sm text-ink-muted leading-relaxed">
          A free personal consultation call — <strong className="text-ink">₹0 cost</strong>,
          zero pressure. After speaking to the advisor, you decide whether to order.
        </p>

        <div className="mt-4 flex justify-center">
          <ScarcityChip />
        </div>

        <a
          href="#claim"
          onClick={handleClaim}
          className="cta-premium mt-5 flex h-12 items-center justify-center gap-2 rounded-md text-sm font-bold text-brand-foreground"
        >
          <PhoneCall className="h-4 w-4" />
          Get a free call
          <span className="text-base">→</span>
        </a>

        <button
          type="button"
          onClick={close}
          className="mt-3 block w-full text-center text-xs text-ink-muted underline hover:text-ink"
        >
          No, thanks
        </button>
      </div>
    </div>
  );
}
