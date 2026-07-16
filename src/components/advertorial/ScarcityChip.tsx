import { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";
import { spotsRemaining, timeLeftToday, SPOTS_PER_DAY } from "@/lib/scarcity";

interface ScarcityChipProps {
  variant?: "chip" | "card";
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ScarcityChip({ variant = "chip", className = "" }: ScarcityChipProps) {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(() => timeLeftToday());
  const [spots, setSpots] = useState(() => spotsRemaining());

  useEffect(() => {
    setMounted(true);
    setT(timeLeftToday());
    setSpots(spotsRemaining());
    const id = setInterval(() => {
      setT(timeLeftToday());
      setSpots(spotsRemaining());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  if (variant === "card") {
    return (
      <div
        className={`rounded-xl border-2 border-brand/40 bg-brand-soft/60 p-4 text-center ${className}`}
      >
        <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
          <Flame className="h-3.5 w-3.5" />
          Today's free consultation spots
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <div>
            <div className="font-serif text-2xl font-bold text-ink tabular-nums">
              {spots}
              <span className="text-sm text-ink-muted"> / {SPOTS_PER_DAY}</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">
              spots left
            </div>
          </div>
          <div className="h-10 w-px bg-rule" />
          <div>
            <div className="font-serif text-2xl font-bold text-ink tabular-nums">
              {pad(t.m)}:{pad(t.s)}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">
              ends in
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand ${className}`}
    >
      <Clock className="h-3.5 w-3.5" />
      <span className="tabular-nums">
        {pad(t.m)}:{pad(t.s)}
      </span>
      <span className="opacity-80">·</span>
      <span className="tabular-nums">{spots}</span>
      <span className="opacity-80">spots left</span>
    </span>
  );
}
