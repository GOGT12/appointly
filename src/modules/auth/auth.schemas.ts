import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
