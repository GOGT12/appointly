import { describe, it, expect, beforeAll } from "vitest";
import { db } from "../../db/client.js";
import { users } from "../../db/schema.js";
import { hashPassword } from "../../shared/bcrypt.js";
import { login } from "./auth.service.js";
import { InvalidCredentialsError } from "../../shared/errors.js";

describe("auth.service login()", () => {

  beforeAll(async () => {
    const passwordHash = await hashPassword("owner123");
    await db
      .insert(users)
      .values({
        email: "owner@gmail.com",
        passwordHash,
        role: "owner"
      });
  });

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
