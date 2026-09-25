"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ItemPedido, Pedido } from "@/data/types";

export interface CheckoutRequest {
  items: ItemPedido[];
  origen: Pedido["origen"];
  /** Se ejecuta tras confirmar y abrir WhatsApp (ej. vaciar el carrito). */
  onConfirmed?: () => void;
}

interface CheckoutContextValue {
  request: CheckoutRequest | null;
  openCheckout: (request: CheckoutRequest) => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<CheckoutRequest | null>(null);

  const openCheckout = useCallback((req: CheckoutRequest) => setRequest(req), []);
  const closeCheckout = useCallback(() => setRequest(null), []);

  const value = useMemo<CheckoutContextValue>(
    () => ({ request, openCheckout, closeCheckout }),
    [request, openCheckout, closeCheckout],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout debe usarse dentro de <CheckoutProvider>");
  return ctx;
}
