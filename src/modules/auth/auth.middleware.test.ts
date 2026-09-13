import { describe, it, expect, vi } from "vitest";
import { requireAuth } from "./auth.middleware.js";
import { signToken } from "../../shared/jwt.js";
import type { FastifyRequest, FastifyReply } from "fastify";

function mockReply() {
  const reply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  } as unknown as FastifyReply;
  return reply;
}

describe("requireAuth middleware", () => {
  it("rechaza si no hay header de autorización", async () => {
    const request = { headers: {} } as FastifyRequest;
    const reply = mockReply();

    await requireAuth(request, reply);

    expect(reply.status).toHaveBeenCalledWith(401);
  });

  it("rechaza si el token es inválido", async () => {
    const request = {
      headers: { authorization: "Bearer token_invalido" },
    } as FastifyRequest;
    const reply = mockReply();

    await requireAuth(request, reply);

    expect(reply.status).toHaveBeenCalledWith(401);
  });

  it("deja pasar y setea request.user con un token válido", async () => {
    const token = signToken({ userId: "cbt-123", role: "owner" });
    const request = {
      headers: { authorization: `Bearer ${token}` },
    } as FastifyRequest;
    const reply = mockReply();

    await requireAuth(request, reply);

    expect(reply.status).not.toHaveBeenCalled();
    expect(request.user).toMatchObject({ userId: "cbt-123", role: "owner" });
  });
});
