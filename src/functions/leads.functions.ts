import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLeadToSheet, updateLeadRowInSheet, getLeadsFromSheet } from "../server/sheets.server";
import { getEnvVar } from "../server/env";

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

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      // Check for duplicate leads in the sheet using phone number
      const existingLeads = await getLeadsFromSheet().catch((e) => {
        console.error("Failed to fetch existing leads for duplicate check:", e);
        return [];
      });

      const normalizedPhone = data.phone.trim().replace(/\D/g, "");
      const isDuplicate = existingLeads.some((lead) => {
        const leadPhone = lead.phone ? String(lead.phone).trim().replace(/\D/g, "") : "";
        return leadPhone === normalizedPhone;
      });

      if (isDuplicate) {
        return { ok: false as const, error: "आप पहले ही फॉर्म सबमिट कर चुके हैं।" };
      }

      const meta = {
        page: "advertorial-alphamen",
        age: data.age ?? null,
        city: data.city ?? null,
        bestTime: data.bestTime ?? null,
      };

      // Generate a unique lead ID locally without database dependencies
      const leadId = crypto.randomUUID();

      const sheetRange = await appendLeadToSheet({
        name: data.name,
        phone: data.phone,
        age: data.age ?? null,
        city: data.city ?? null,
        concern: data.concern ?? null,
        bestTime: data.bestTime ?? null,
        sourcePage: meta.page,
        leadId,
        herbstrixOrderId: null,
        herbstrixStatus: "pending",
      }).catch((e) => {
        console.error("Google Sheets mirror failed:", e);
        return null;
      });

      return { ok: true as const, leadId, sheetRange, herbstrixOrderId: null };
    } catch (err: any) {
      console.error("Submit lead error:", err);
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
