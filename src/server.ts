import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { settingsRoutes } from "./modules/businessSettings/settings.routes.js";
import { registerErrorHandler } from "./shared/error-handler.js";


export function buildServer(){
    const app = Fastify({
        logger: true,
    });

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    registerErrorHandler(app);

    app.register(authRoutes);
    app.register(settingsRoutes);


    return app;
}


// token

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNTFhNDIxNy0zYmQ5LTRlNDQtYmQyNC0xYzU2MWYyMjliNzgiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3ODk1MTIzOTYsImV4cCI6MTc5MDExNzE5Nn0.4vMNPe-kofBKnEVkZNx25INoyWec_o1LhmZhoagytJM
*/
