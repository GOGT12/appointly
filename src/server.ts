import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { registerErrorHandler } from "./shared/error-handler.js";
import { requireAuth } from "./modules/auth/auth.middleware.js";


export function buildServer(){
    const app = Fastify({
        logger: true,
    });

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    registerErrorHandler(app);

    app.register(authRoutes);


    return app;
}
