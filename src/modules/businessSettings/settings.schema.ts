import { z } from "zod";

export const updateSettingsBodySchema = z.object({
  name: z.string().min(1).optional(),
  logoUrl: z.string().url().optional(),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un color hex válido").optional(),
  timezone: z.string().optional(),
  qrImageUrl: z.string().url().optional(),
  openDays: z.array(z.enum(["mon","tue","wed","thu","fri","sat","sun"])).optional(),
  openTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato debe ser HH:MM").optional(),
  closeTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato debe ser HH:MM").optional(),
  minBookingNoticeHours: z.number().int().min(0).optional(),
});
