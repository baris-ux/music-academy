"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOrder, type CheckoutState } from "./actions";

type Props = {
  event: {
    id: string;
    title: string;
    location: string;
    startAt: Date | string;
    price: number;
  };
};

const initialState: CheckoutState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
      inline-flex items-center justify-center 
      rounded-xl bg-slate-900 
      px-4 py-2.5 text-sm font-medium text-white 
      transition hover:bg-slate-800 
      cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Traitement..." : "Continuer vers le paiement"}
    </button>
  );
}

export default function CheckoutForm({ event }: Props) {
  const [quantity, setQuantity] = useState(1);

  const createOrderWithEventId = createOrder.bind(null, event.id);
  const [state, formAction] = useActionState(createOrderWithEventId, initialState);

  const unitPrice = event.price / 100;
  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  function decrement() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function increment() {
    setQuantity((prev) => Math.min(10, prev + 1));
  }

  function handleQuantityChange(value: string) {
    const parsed = Number(value);

    if (!Number.isInteger(parsed)) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.min(10, Math.max(1, parsed)));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="vous@example.com"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">
            Le billet sera lié à cette adresse e-mail.
          </p>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-1.5 block text-sm font-medium text-slate-800"
          >
            Quantité
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrement}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-lg font-medium text-slate-900 transition hover:bg-slate-50"
              aria-label="Diminuer la quantité"
            >
              -
            </button>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              required
              className="w-24 rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />

            <button
              type="button"
              onClick={increment}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-lg font-medium text-slate-900 transition hover:bg-slate-50"
              aria-label="Augmenter la quantité"
            >
              +
            </button>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Maximum 10 billets par commande.
          </p>
        </div>
      </div>

      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Récapitulatif</h3>

        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Prix unitaire</span>
            <span className="font-medium text-slate-900">
              {unitPrice.toFixed(2)} €
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Quantité</span>
            <span className="font-medium text-slate-900">{quantity}</span>
          </div>

          <div className="border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">Total</span>
              <span className="text-base font-semibold text-slate-950">
                {total.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Le total final est recalculé côté serveur avant création de la commande.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Link
          href={`/event/${event.id}`}
          className="inline-flex rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
        >
          Retour
        </Link>

        <SubmitButton />
      </div>
    </form>
  );
}