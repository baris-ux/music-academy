import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { randomUUID  } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante." },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Erreur de signature webhook Stripe :", error);

    return NextResponse.json(
      { error: "Signature webhook invalide." },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error("orderId absent dans les metadata Stripe.");

        return NextResponse.json(
          { error: "orderId absent des metadata." },
          { status: 400 }
        );
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          tickets: true,
        },
      });

      if (!order) {
        return NextResponse.json(
          { error: "Commande introuvable." },
          { status: 404 }
        );
      }

      if (order.status === "PAID" && order.tickets.length > 0) {
        console.log(`Commande ${orderId} déjà traitée.`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      await prisma.$transaction(async (tx) => {
        if (order.status !== "PAID") {
          await tx.order.update({
            where: { id: orderId },
            data: {
              status: "PAID",
            },
          });
        }

        if (order.tickets.length === 0) {
          await tx.ticket.create({
            data: {
              qrCode: randomUUID(),
              orderId: order.id,
              eventId: order.eventId,
            },
          });
        }
      });

      console.log(`Commande ${orderId} marquée comme PAID et ticket créé.`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur traitement webhook Stripe :", error);

    return NextResponse.json(
      { error: "Erreur pendant le traitement du webhook." },
      { status: 500 }
    );
  }
}