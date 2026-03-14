"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createOrder(eventId: string, formData: FormData) {
  const emailValue = formData.get("email");
  const quantityValue = formData.get("quantity");

  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const quantity = Number(quantityValue);

  if (!email || !email.includes("@")) {
    throw new Error("Adresse e-mail invalide.");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantité invalide.");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      price: true,
      title: true,
    },
  });

  if (!event) {
    throw new Error("Événement introuvable.");
  }

  const amount = event.price * quantity;

  const order = await prisma.order.create({
    data: {
      email,
      amount,
      status: "PENDING",
      eventId: event.id,
    },
  });

  redirect(`/event/${event.id}/checkout/success?orderId=${order.id}`);
}