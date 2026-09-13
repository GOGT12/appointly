import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../../shared/jwt.js";


export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return reply.status(401).send({ error: "Token no proporcionado"});
    }

    const token = authHeader.slice("Bearer ".length);

    try{
        const payload = verifyToken(token);
        request.user = payload;
    }catch {
        return reply.status(401).send({ error: "Token inválido o expirado"});
    }
}
