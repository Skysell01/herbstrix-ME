// Append leads to a Google Sheet via the Lovable connector gateway or direct Apps Script Webhook.
import { getEnvVar } from "./env";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "158cljYadRPfbUE3E-94bzrhdj61n4qSOWGI9DPHhQqc";
const APPEND_RANGE = "Leads!A:K";

export type LeadRow = {
  name: string;
  phone: string;
  age: number | null;
  city: string | null;
  concern: string | null;
  bestTime: string | null;
  sourcePage: string;
  leadId: string;
  herbstrixOrderId?: string | null;
  herbstrixStatus?: string | null;
};

function authHeaders() {
  const LOVABLE_API_KEY = getEnvVar("LOVABLE_API_KEY");
  const GOOGLE_SHEETS_API_KEY = getEnvVar("GOOGLE_SHEETS_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
    "Content-Type": "application/json",
  };
}

function istTimestamp(d = new Date()): string {
  // Format: YYYY-MM-DD HH:mm:ss IST (Asia/Kolkata, UTC+5:30)
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")} IST`;
}

function rowValues(row: LeadRow): (string | number)[] {
  return [
    istTimestamp(),
    row.name,
    row.phone,
    row.age ?? "",
    row.city ?? "",
    row.concern ?? "",
    row.bestTime ?? "",
    row.sourcePage,
    row.leadId,
    row.herbstrixOrderId ?? "",
    row.herbstrixStatus ?? "",
  ];
}

/** Append a new row. Returns the updated range, e.g. "Leads!A7:I7". */
export async function appendLeadToSheet(row: LeadRow): Promise<string | null> {
  const webhookUrl = getEnvVar("GOOGLE_SHEET_WEBHOOK_URL");
  console.log(`[Google Sheets] Webhook URL is: ${webhookUrl ? webhookUrl.slice(0, 45) + "..." : "undefined"}`);
  if (webhookUrl) {
    console.log("[Apps Script] Appending lead via Webhook...");
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "append",
        ...row,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Apps Script append failed [${res.status}]: ${body}`);
    }
    const json = (await res.json()) as { ok: boolean; sheetRange?: string; error?: string };
    if (!json.ok) {
      throw new Error(json.error || "Apps Script failed to append lead");
    }
    return json.sheetRange ?? null;
  }

  // Fallback to Connector Gateway
  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${APPEND_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ values: [rowValues(row)] }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets append failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { updates?: { updatedRange?: string } };
  return json.updates?.updatedRange ?? null;
}

/** Overwrite an existing row by range, e.g. "Leads!A7:I7". */
export async function updateLeadRowInSheet(
  range: string,
  row: LeadRow,
): Promise<void> {
  const webhookUrl = getEnvVar("GOOGLE_SHEET_WEBHOOK_URL");
  console.log(`[Google Sheets] Update Webhook URL is: ${webhookUrl ? webhookUrl.slice(0, 45) + "..." : "undefined"}`);
  if (webhookUrl) {
    console.log("[Apps Script] Updating lead via Webhook...");
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        ...row,
        sheetRange: range, // Can pass it to locate directly, though the leadId search is backup
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Apps Script update failed [${res.status}]: ${body}`);
    }
    const json = (await res.json()) as { ok: boolean; error?: string };
    if (!json.ok) {
      throw new Error(json.error || "Apps Script failed to update lead");
    }
    return;
  }

  // Fallback to Connector Gateway
  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ values: [rowValues(row)], range }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets update failed [${res.status}]: ${body}`);
  }
}

/** Fetch all leads from Google Sheets. */
export async function getLeadsFromSheet(): Promise<any[]> {
  const webhookUrl = getEnvVar("GOOGLE_SHEET_WEBHOOK_URL");
  if (webhookUrl) {
    console.log("[Apps Script] Listing leads via Webhook...");
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "list",
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Apps Script list failed [${res.status}]: ${body}`);
    }
    const json = (await res.json()) as { ok: boolean; leads?: any[]; error?: string };
    if (!json.ok) {
      throw new Error(json.error || "Apps Script failed to list leads");
    }
    return json.leads ?? [];
  }

  // Fallback to Connector Gateway
  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/Leads!A2:K`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets fetch failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { values?: (string | number)[][] };
  const rows = json.values ?? [];
  return rows.map((row, idx) => {
    // Columns mapping:
    // A: Timestamp, B: Name, C: Phone, D: Age, E: City, F: Concern, G: BestTime, H: SourcePage, I: LeadId, J: HerbstrixOrderId, K: HerbstrixStatus
    const rawTimestamp = row[0] ? String(row[0]) : "";
    let timestamp = new Date().toISOString();
    if (rawTimestamp) {
      // e.g. "2026-05-21 12:03:33 IST" -> replace spaces and strip IST to parse reliably
      const cleaned = rawTimestamp.replace(/\s+IST$/i, "").trim();
      try {
        // Try converting "2026-05-21 12:03:33" to "2026-05-21T12:03:33"
        const isoLike = cleaned.replace(" ", "T");
        const d = new Date(isoLike);
        if (!isNaN(d.getTime())) {
          timestamp = d.toISOString();
        }
      } catch {}
    }

    const name = row[1] ? String(row[1]) : "";
    const phone = row[2] ? String(row[2]) : "";
    const email = `lead-${idx}@nomail.local`;
    const concern = row[5] ? String(row[5]) : null;
    
    const meta = {
      page: row[7] ? String(row[7]) : "advertorial-alphamen",
      age: row[3] ? Number(row[3]) || null : null,
      city: row[4] ? String(row[4]) : null,
      bestTime: row[6] ? String(row[6]) : null,
      herbstrixOrderId: row[9] ? String(row[9]) : null,
      herbstrixStatus: row[10] ? String(row[10]) : null,
    };
    
    return {
      id: row[8] ? String(row[8]) : `row-${idx + 2}`,
      name,
      email,
      phone,
      concern,
      source: JSON.stringify(meta),
      created_at: timestamp,
    };
  });
}
