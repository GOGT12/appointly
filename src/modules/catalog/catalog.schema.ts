import z from "zod";

export const serviceIdParamsSchema = z.object({
    id: z.string().uuid("ID invalido"),
})

export const createServiceBodySchema = z.object({

    name: z.string().min(1),
    description: z.string().min(1),
    durationMinutes: z.number().int().min(0),
    price: z.number().int().positive(),
    imageUrl: z.string().url(),
})

export const updateServiceBodySchema = z.object({

    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    durationMinutes: z.number().int().min(0).optional(),
    price: z.number().int().positive().optional(),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().optional(),

})
