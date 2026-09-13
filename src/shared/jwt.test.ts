import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "./jwt.js";

describe("jwt", () => {
  it("genera un token que se puede verificar correctamente", () => {
    const token = signToken({ userId: "abc-123", role: "owner" });
    const decoded = verifyToken(token);

    expect(decoded.userId).toBe("abc-123");
    expect(decoded.role).toBe("owner");
  });

  it("rechaza un token alterado", () => {
    const token = signToken({ userId: "abc-123", role: "owner" });
    const tamperedToken = token + "algo_random";

    expect(() => verifyToken(tamperedToken)).toThrow();
  });
});
