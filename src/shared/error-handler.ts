import type { FastifyInstance } from "fastify";
import {
    InvalidCredentialsError,
    NotFoundError,
} from "./errors.js";


export function registerErrorHandler(app: FastifyInstance){
    app.setErrorHandler((error, request, reply) => {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ error: error.message});
        }

        if (error instanceof NotFoundError){
            return reply.status(404).send({ error: error.message});
        }

        if (error.validation) {
            return reply.status(400).send({ error: "Datos inválidos", details: error.validation });
        }

        request.log.error(error);
        return reply.status(500).send({error: "Algo salió mal"})
    })
}
