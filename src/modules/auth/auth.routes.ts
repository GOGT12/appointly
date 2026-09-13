import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginBodySchema } from "./auth.schemas.js";
import { login } from "./auth.service.js";

export async function authRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/auth/login",
        {
            schema: {
                body: loginBodySchema
            },
        },
        async(request, reply) => {
            const {email, password} = request.body;
            const result = await login({email, password});
            return reply.status(200).send(result);
        }
    );

}
