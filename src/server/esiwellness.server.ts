// Forward leads to the ESI Wellness advertiser API.
// Docs: GET https://herbstrix.com/apileads/leads.php?name=&number=&channel_id=&token=&product_id=...
const ENDPOINT = process.env.CRM_API_URL || "https://herbstrix.com/apileads/leads.php";
const PRODUCT_ID = "93";
const CHANNEL_ID = "AJN-TM-SKM";

export type ESIWellnessPayload = {
  name: string;
  phone: string;
  city?: string | null;
  state?: string | null;
  address1?: string | null;
  clickid?: string | null;
  affiliateId?: string | null;
};

export type ESIWellnessResult = {
  ok: boolean;
  orderId: string | null;
  raw: string;
  status: number;
};

function extractOrderId(raw: string): string | null {
  const m = raw.match(/orderid\s*[:=]?\s*([A-Za-z0-9_-]+)/i);
  return m ? m[1] : null;
}

export async function pushLeadToESIWellness(
  payload: ESIWellnessPayload,
): Promise<ESIWellnessResult> {
  const token = process.env.HERBSTRIX_TOKEN;
  if (!token) throw new Error("HERBSTRIX_TOKEN is not configured");

  const params = new URLSearchParams({
    name: payload.name,
    number: payload.phone,
    channel_id: CHANNEL_ID,
    token,
    product_id: PRODUCT_ID,
  });
  if (payload.address1) params.set("address1", payload.address1);
  if (payload.city) params.set("city", payload.city);
  if (payload.state) params.set("state", payload.state);
  if (payload.affiliateId) params.set("affiliate_id", payload.affiliateId);
  if (payload.clickid) params.set("clickid", payload.clickid);

  const url = `${ENDPOINT}?${params.toString()}`;
  const safeUrl = url.replace(token, "***REDACTED***");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3000);

  // Browser-style headers — Cloudflare bypass
  const browserHeaders: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Referer: "https://tamil.intimacyschools.in/",
  };

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: ctrl.signal,
      headers: browserHeaders,
      redirect: "follow",
    });
    const raw = await res.text();
    const orderId = extractOrderId(raw);
    const ok = res.ok && !!orderId;
    const rayId = res.headers.get("cf-ray") ?? "n/a";
    if (ok) {
      console.log(
        `[ESI Wellness] lead forwarded, orderId=${orderId} (cf-ray=${rayId})`,
      );
    } else {
      const blocked = /Sorry, you have been blocked|Attention Required/i.test(
        raw,
      );
      console.error(
        `[ESI Wellness] forward failed [${res.status}] cf-ray=${rayId} blocked=${blocked} url=${safeUrl} body=${raw.slice(0, 300)}`,
      );
    }
    return { ok, orderId, raw: raw.slice(0, 500), status: res.status };
  } catch (e) {
    console.error("[ESI Wellness] request failed:", e);
    return { ok: false, orderId: null, raw: String(e).slice(0, 500), status: 0 };
  } finally {
    clearTimeout(timer);
  }
}
