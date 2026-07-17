import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLeadToSheet, updateLeadRowInSheet, getLeadsFromSheet } from "../server/sheets.server";
import { getEnvVar } from "../server/env";
import { pushLeadToESIWellness } from "../server/esiwellness.server";

const ConcernEnum = z.enum([
  "stamina",
  "energy",
  "confidence",
  "wellness",
  "guidance",
  "stress",
  "immunity",
  "general",
]);
const TimeEnum = z.enum(["morning", "afternoon", "evening", "anytime"]);

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(100).regex(/^[a-zA-Z\s]+$/, "Only alphabetic characters are allowed"),
  email: z.string().trim().max(255).optional().or(z.literal("")),
  phone: z.string().trim().regex(/^\d{10}$/, "invalid number the reuired 10 digit number"),
  concern: ConcernEnum.optional(),
  age: z.coerce.number().int().min(18).max(99).optional(),
  city: z.string().trim().max(80).optional(),
  bestTime: TimeEnum.optional(),
  source: z.string().trim().max(2000).optional(),
});

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      console.log("\n--- [submitLead Server Function Started] ---");
      console.log("Received data:", data);

      const normalizedPhone = data.phone.trim().replace(/\D/g, "");
      console.log("Normalized Phone:", normalizedPhone);

      // Check for duplicate leads in the sheet using phone number
      console.log("Fetching existing leads from Google Sheet to check duplicates...");
      const existingLeads = await getLeadsFromSheet().catch((e) => {
        console.error("Failed to fetch existing leads for duplicate check:", e);
        return [];
      });
      console.log(`Fetched ${existingLeads.length} existing leads.`);

      const isDev = getEnvVar("NODE_ENV") === "development";
      console.log("Is Dev Environment?", isDev);

      const isDuplicate = !isDev && existingLeads.some((lead) => {
        const leadPhone = lead.phone ? String(lead.phone).trim().replace(/\D/g, "") : "";
        return leadPhone === normalizedPhone;
      });
      console.log("Is duplicate phone number?", isDuplicate);

      if (isDev) {
        console.log("Bypassing duplicate check for local development.");
      }

      if (isDuplicate) {
        console.warn(`Duplicate lead submission blocked for phone: ${normalizedPhone}`);
        return { ok: false as const, error: "आप पहले ही फॉर्म सबमिट कर चुके हैं।" };
      }

      const meta = {
        page: "advertorial-alphamen",
        age: data.age ?? null,
        city: data.city ?? null,
        bestTime: data.bestTime ?? null,
      };

      // Generate a unique lead ID locally without database dependencies
      const leadId = generateUUID();
      console.log("Generated Lead ID:", leadId);

      // Forward lead to Herbstrix CRM
      let herbstrixOrderId: string | null = null;
      let herbstrixStatus = "pending";
      
      console.log("Pushing lead to Herbstrix CRM...");
      try {
        const crmResult = await pushLeadToESIWellness({
          name: data.name,
          phone: data.phone,
          city: data.city ?? null,
        });
        console.log("Herbstrix CRM result:", crmResult);
        if (crmResult.ok && crmResult.orderId) {
          herbstrixOrderId = crmResult.orderId;
          herbstrixStatus = "success";
        } else {
          herbstrixStatus = "failed";
        }
      } catch (crmErr) {
        console.error("Herbstrix CRM push failed:", crmErr);
        herbstrixStatus = "failed";
      }

      console.log("Appending lead to Google Sheet...");
      const sheetRange = await appendLeadToSheet({
        name: data.name,
        phone: data.phone,
        age: data.age ?? null,
        city: data.city ?? null,
        concern: data.concern ?? null,
        bestTime: data.bestTime ?? null,
        sourcePage: meta.page,
        leadId,
        herbstrixOrderId,
        herbstrixStatus,
      });
      console.log("Google Sheet append completed. Range:", sheetRange);
      console.log("--- [submitLead Server Function Completed] ---\n");

      return { ok: true as const, leadId, sheetRange, herbstrixOrderId };
    } catch (err: any) {
      console.error("Submit lead error inside handler:", err);
      return { ok: false as const, error: err?.message || "Could not save your details. Please try again." };
    }
  });

const UpdateSchema = z.object({
  leadId: z.string().uuid(),
  sheetRange: z.string().max(64).optional().nullable(),
  name: z.string().trim().min(1).max(100).regex(/^[a-zA-Z\s]+$/, "Only alphabetic characters are allowed"),
  phone: z.string().trim().regex(/^\d{10}$/, "invalid number the reuired 10 digit number"),
  age: z.coerce.number().int().min(18).max(99).optional(),
  city: z.string().trim().max(80).optional(),
  concern: ConcernEnum.optional(),
  bestTime: TimeEnum.optional(),
});

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => UpdateSchema.parse(input))
  .handler(async ({ data }) => {
    const meta = {
      page: "advertorial-alphamen",
      age: data.age ?? null,
      city: data.city ?? null,
      bestTime: data.bestTime ?? null,
      step: 2,
    };

    if (data.sheetRange) {
      try {
        await updateLeadRowInSheet(data.sheetRange, {
          name: data.name,
          phone: data.phone,
          age: data.age ?? null,
          city: data.city ?? null,
          concern: data.concern ?? null,
          bestTime: data.bestTime ?? null,
          sourcePage: meta.page,
          leadId: data.leadId,
        });
      } catch (e) {
        console.error("Google Sheets row update failed:", e);
        return { ok: false as const, error: "Could not save the extra details to Google Sheets." };
      }
    }

    return { ok: true as const };
  });

const ListSchema = z.object({ token: z.string().min(1) });

export const listLeads = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ListSchema.parse(input))
  .handler(async ({ data }) => {
    const expected = getEnvVar("LEADS_ADMIN_TOKEN");
    if (!expected || data.token !== expected) {
      return { ok: false as const, error: "Invalid access token." };
    }

    try {
      const rows = await getLeadsFromSheet();
      // Sort newest first
      rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return { ok: true as const, leads: rows };
    } catch (error) {
      console.error("Google Sheets lead retrieval failed:", error);
      return { ok: false as const, error: "Could not load leads from Google Sheets." };
    }
  });
