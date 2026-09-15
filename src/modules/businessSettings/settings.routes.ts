import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { getSettings, updateSettings } from "./settings.service.js";
import { updateSettingsBodySchema } from "./settings.schema.js";
import { requireAuth } from "../auth/auth.middleware.js";


export async function settingsRoutes(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get(
        "/business-settings",
        {preHandler: requireAuth},
        async (request, reply) => {
            const settings = await getSettings();
            return reply.status(200).send(settings);
        }
    );

    app.withTypeProvider<ZodTypeProvider>().put(
        "/business-settings",
        {
            preHandler: requireAuth,
            schema: {body: updateSettingsBodySchema},
        },

        async (request, reply) => {
            const updated = await updateSettings(request.body);
            return reply.status(200).send(updated);
        }

    )

}
