import { useEffect, useState } from "react";

// Honest countdown: pinned end date. Does NOT reset on refresh.
// Edit this constant to set your real sale end date.
const SALE_END_ISO = "2026-05-11T23:59:59+05:30";

function diff(target: number) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    over: ms === 0,
  };
}

export function Countdown() {
  const target = new Date(SALE_END_ISO).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t || t.over) return null;

  const Cell = ({ n, l }: { n: number; l: string }) => (
    <div className="flex flex-col items-center rounded-md bg-ink/90 px-3 py-2 text-paper min-w-[56px]">
      <span className="font-serif text-2xl tabular-nums">{String(n).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-80">{l}</span>
    </div>
  );

  return (
    <aside className="my-10 rounded-xl border border-rule bg-brand-soft p-5 text-center">
      <p className="text-xs uppercase tracking-widest text-brand font-semibold">
        Introductory offer ends
      </p>
      <p className="mt-1 font-serif text-xl text-ink">
        Free shipping + Buy 1 Get 1 — while stock lasts
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Cell n={t.m} l="min" />
        <Cell n={t.s} l="sec" />
      </div>
    </aside>
  );
}
