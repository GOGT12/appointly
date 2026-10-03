import { text } from "node:stream/consumers";
import { z } from "zod";

export const staffIdParamsSchema = z.object({
    id: z.string().uuid("ID invalido"),
})

export const addStaffBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    daysOff: z.string().array().optional(),
})

export const updateStaffBodySchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email("Email inválido").optional(),
    phone: z.string().optional(),
    daysOff: z.string().array().optional(),
    isActive: z.boolean().optional(),
})
