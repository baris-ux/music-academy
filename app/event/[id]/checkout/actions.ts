"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export type CheckoutState = {
  error?: string;
};

export async function createOrder(
  eventId: string,
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const emailValue = formData.get("email");
  const quantityValue = formData.get("quantity");

  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const quantity = Number(quantityValue);

  if (!email || !email.includes("@")) {
    return { error: "Veuillez entrer une adresse e-mail valide." };
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return { error: "La quantité doit être comprise entre 1 et 10." };
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      price: true,
    },
  });

  if (!event) {
    return { error: "Cet événement est introuvable." };
  }

  const amount = event.price * quantity;

  let order;

  try {
    order = await prisma.order.create({
      data: {
        email,
        amount,
        status: "PENDING",
        eventId: event.id,
      },
    });
  } catch (error) {
    console.error("Erreur createOrder:", error);

    return {
      error:
        "Une erreur est survenue pendant la création de la commande. Veuillez réessayer.",
    };
  }

  redirect(`/event/${event.id}/checkout/success?orderId=${order.id}`);
}