import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/ticket/validate/[qrCode]/route";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    ticket: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma";

const mockFindUnique = vi.mocked(prisma.ticket.findUnique);
const mockUpdate = vi.mocked(prisma.ticket.update);

function makeRequest(qrCode: string) {
  return {
    request: new Request(`http://localhost/api/ticket/validate/${qrCode}`),
    context: { params: Promise.resolve({ qrCode }) },
  };
}

const mockTicket = {
  id: 1,
  qrCode: "ABC123",
  usedAt: null,
  event: { id: 10, title: "Concert de printemps" },
  order: { email: "client@test.com" },
};

describe("GET /api/ticket/validate/[qrCode]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne 404 si le billet est introuvable", async () => {
    mockFindUnique.mockResolvedValue(null);

    const { request, context } = makeRequest("INCONNU");
    const res = await GET(request, context);

    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.status).toBe("INVALID");
    expect(body.message).toBe("Billet introuvable.");
  });

  it("retourne 409 si le billet a déjà été utilisé", async () => {
    mockFindUnique.mockResolvedValue({
      ...mockTicket,
      usedAt: new Date("2025-01-01T10:00:00Z"),
    } as any);

    const { request, context } = makeRequest("ABC123");
    const res = await GET(request, context);

    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.status).toBe("ALREADY_USED");
    expect(body.ticket.qrCode).toBe("ABC123");
    expect(body.ticket.event.title).toBe("Concert de printemps");
    expect(body.ticket.order.email).toBe("client@test.com");
  });

  it("retourne 200 et marque le billet comme utilisé si valide", async () => {
    mockFindUnique.mockResolvedValue(mockTicket as any);
    mockUpdate.mockResolvedValue({
      ...mockTicket,
      usedAt: new Date("2026-04-18T09:00:00Z"),
    } as any);

    const { request, context } = makeRequest("ABC123");
    const res = await GET(request, context);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.status).toBe("VALID");
    expect(body.ticket.qrCode).toBe("ABC123");
    expect(body.ticket.usedAt).toBeTruthy();
    expect(body.ticket.event.title).toBe("Concert de printemps");
    expect(body.ticket.order.email).toBe("client@test.com");
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ where: { qrCode: "ABC123" } })
    );
  });

  it("retourne 500 en cas d'erreur inattendue", async () => {
    mockFindUnique.mockRejectedValue(new Error("DB crash"));

    const { request, context } = makeRequest("ABC123");
    const res = await GET(request, context);

    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.status).toBe("ERROR");
  });
});