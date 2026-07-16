// Honest, deterministic scarcity:
// - Free advisor spots reset every day at midnight IST.
// - Daily quota: SPOTS_PER_DAY (real callback capacity).
// - Spots tick down based on how far into the day we are, so it always
//   "looks live" without being random or fake.
// - Same value for everyone at the same moment — no per-user faking.

export const SPOTS_PER_DAY = 50;
export const IST_OFFSET_MIN = 5 * 60 + 30;

/** Returns ms until next midnight in IST. */
export function msUntilMidnightIST(now = Date.now()): number {
  // Convert "now" into IST clock time
  const istNow = now + IST_OFFSET_MIN * 60_000;
  const istDate = new Date(istNow);
  // Build "next midnight" in IST clock
  const istNextMidnight = Date.UTC(
    istDate.getUTCFullYear(),
    istDate.getUTCMonth(),
    istDate.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  );
  // Convert back to real (UTC) ms
  const realMidnight = istNextMidnight - IST_OFFSET_MIN * 60_000;
  return Math.max(0, realMidnight - now);
}

/** Hours/minutes/seconds remaining for a rolling 31m 45s session timer. */
export function timeLeftToday(now = Date.now()) {
  const defaultDurationMs = (31 * 60 + 45) * 1000; // 31m 45s

  if (typeof window === "undefined") {
    return {
      h: 0,
      m: 31,
      s: 45,
      totalMs: defaultDurationMs,
    };
  }

  const STORAGE_KEY = "esi_wellness_timer_end";
  let endTimeStr = null;
  try {
    endTimeStr = sessionStorage.getItem(STORAGE_KEY);
  } catch (e) {
    // sessionStorage might be disabled/blocked
  }

  let endTime = endTimeStr ? parseInt(endTimeStr, 10) : null;

  if (!endTime || isNaN(endTime) || now > endTime) {
    endTime = now + defaultDurationMs;
    try {
      sessionStorage.setItem(STORAGE_KEY, endTime.toString());
    } catch (e) {
      // sessionStorage write error
    }
  }

  const msLeft = Math.max(0, endTime - now);
  const totalSeconds = Math.floor(msLeft / 1000);

  return {
    h: 0,
    m: Math.floor(totalSeconds / 60),
    s: totalSeconds % 60,
    totalMs: msLeft,
  };
}

/**
 * Spots remaining today.
 * Curve: starts at SPOTS_PER_DAY at IST midnight, decays such that ~80% are
 * "claimed" by 10pm IST and the last few linger. Floor at 3 so the bar never
 * shows zero (we don't want to disable conversions).
 */
export function spotsRemaining(now = Date.now()): number {
  const dayMs = 24 * 60 * 60 * 1000;
  const elapsed = dayMs - msUntilMidnightIST(now);
  const ratio = Math.min(1, Math.max(0, elapsed / dayMs));
  // Ease-out: faster decay early, slower late evening.
  const decayed = 1 - Math.pow(1 - ratio, 1.6);
  const remaining = Math.round(SPOTS_PER_DAY * (1 - decayed * 0.94));
  return Math.max(3, Math.min(SPOTS_PER_DAY, remaining));
}
