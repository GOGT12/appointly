import { describe, it, expect } from "vitest";
import { login } from "./auth.service.js";
import { InvalidCredentialsError } from "../../shared/errors.js";

describe("auth.service login()", () => {
  it("devuelve un token válido con credenciales correctas", async () => {
    const result = await login({
      email: "owner@gmail.com",
      password: "owner123",
    });

    expect(result.token).toBeTypeOf("string");
    expect(result.user.email).toBe("owner@gmail.com");
    expect(result.user.role).toBe("owner");
  });

  it("lanza InvalidCredentialsError con password incorrecto", async () => {
    await expect(
      login({ email: "owner@gmail.com", password: "password_incorrecto" })
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it("lanza InvalidCredentialsError con email que no existe", async () => {
    await expect(
      login({ email: "no-existe@gmail.com", password: "cualquiera" })
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
