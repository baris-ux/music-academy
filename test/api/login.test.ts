import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/login/route";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

// Mock Argon2
vi.mock("argon2", () => ({
  default: {
    verify: vi.fn(),
  },
}));

import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

const mockFindUnique = vi.mocked(prisma.user.findUnique);
const mockVerify = vi.mocked(argon2.verify);

function makeRequest(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  return new Request("http://localhost/api/login", {
    method: "POST",
    body: formData,
  });
}

describe("POST /api/login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne 400 si email manquant", async () => {
    const req = makeRequest({ email: "", password: "secret" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Email et mot de passe requis.");
  });

  it("retourne 400 si mot de passe manquant", async () => {
    const req = makeRequest({ email: "test@test.com", password: "" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Email et mot de passe requis.");
  });

  it("retourne 401 si utilisateur introuvable", async () => {
    mockFindUnique.mockResolvedValue(null);
    const req = makeRequest({ email: "inconnu@test.com", password: "secret" });
    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Identifiants invalides.");
  });

  it("retourne 401 si mot de passe incorrect", async () => {
    mockFindUnique.mockResolvedValue({
      id: 1,
      email: "admin@test.com",
      passwordHash: "hashedpwd",
      role: "ADMIN",
    } as any);
    mockVerify.mockResolvedValue(false);

    const req = makeRequest({ email: "admin@test.com", password: "mauvais" });
    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Identifiants invalides.");
  });

  it("retourne 200 et pose le cookie si identifiants valides", async () => {
    mockFindUnique.mockResolvedValue({
      id: 1,
      email: "admin@test.com",
      passwordHash: "hashedpwd",
      role: "ADMIN",
    } as any);
    mockVerify.mockResolvedValue(true);

    const req = makeRequest({ email: "admin@test.com", password: "correct" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.role).toBe("ADMIN");
    expect(res.headers.get("set-cookie")).toContain("session_v3");
  });

  it("retourne 500 en cas d'erreur inattendue", async () => {
    mockFindUnique.mockRejectedValue(new Error("DB crash"));
    const req = makeRequest({ email: "admin@test.com", password: "correct" });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Une erreur est survenue.");
  });
});