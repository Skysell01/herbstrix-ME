// Lightweight analytics helpers built on top of the existing Meta Pixel.
// All events are no-ops if fbq isn't present (e.g. SSR).

type Props = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __lvFired?: Set<string>;
  }
}

function fired(key: string): boolean {
  if (typeof window === "undefined") return true;
  if (!window.__lvFired) window.__lvFired = new Set();
  if (window.__lvFired.has(key)) return true;
  window.__lvFired.add(key);
  return false;
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", event, props ?? {});
    }
    if (typeof console !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("[track]", event, props ?? {});
    }
  } catch {
    /* noop */
  }
}

export function trackOnce(event: string, props?: Props) {
  if (fired(`once:${event}`)) return;
  track(event, props);
}

/** Fire Scroll25/50/75/100 once per session. */
export function initScrollDepth() {
  if (typeof window === "undefined") return () => {};
  const thresholds = [25, 50, 75, 100];
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
    for (const t of thresholds) {
      if (pct >= t) trackOnce(`Scroll${t}`);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}

/** Fire a `ViewSection` event the first time a section enters the viewport. */
export function observeSection(el: Element | null, name: string) {
  if (typeof window === "undefined" || !el) return () => {};
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          trackOnce(`ViewSection:${name}`, { section: name });
          io.disconnect();
        }
      }
    },
    { threshold: 0.3 },
  );
  io.observe(el);
  return () => io.disconnect();
}

export function trackCTA(location: string, label?: string) {
  track("ClickCTA", { location, label });
}
