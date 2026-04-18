import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGet = vi.hoisted(() => vi.fn());
const mockDelete = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    get: mockGet,
    delete: mockDelete,
  }),
}));

import { getSession, clearSession } from "@/lib/session";

describe("lib/session", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSession", () => {
    it("retourne null si le cookie est absent", async () => {
      mockGet.mockReturnValue(undefined);
      const session = await getSession();
      expect(session).toBeNull();
    });

    it("retourne null si le cookie est invalide (JSON corrompu)", async () => {
      mockGet.mockReturnValue({ value: "json_invalide{{" });
      const session = await getSession();
      expect(session).toBeNull();
    });

    it("retourne la session si le cookie est valide (role ADMIN)", async () => {
      const payload = { userId: "1", role: "ADMIN", email: "admin@test.com" };
      mockGet.mockReturnValue({ value: JSON.stringify(payload) });
      const session = await getSession();
      expect(session).toEqual(payload);
    });

    it("retourne la session si le cookie est valide (role STUDENT)", async () => {
      const payload = { userId: "2", role: "STUDENT", email: "student@test.com" };
      mockGet.mockReturnValue({ value: JSON.stringify(payload) });
      const session = await getSession();
      expect(session).toEqual(payload);
    });
  });

  describe("clearSession", () => {
    it("supprime le cookie de session", async () => {
      await clearSession();
      expect(mockDelete).toHaveBeenCalledWith("session_v3");
    });
  });
});