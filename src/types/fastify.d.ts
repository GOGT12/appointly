import type { JwtPayload } from "../shared/jwt.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
