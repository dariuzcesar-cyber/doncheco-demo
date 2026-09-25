"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EstadoPedido, ItemPedido, Pedido } from "@/data/types";
import { formatFolio } from "@/lib/format";

const STORAGE_KEY = "doncheco:pedidos:v1";

interface OrdersContextValue {
  pedidos: Pedido[];
  hydrated: boolean;
  crearPedido: (input: {
    clienteNombre: string;
    clienteTelefono?: string;
    items: ItemPedido[];
    total: number;
    origen: Pedido["origen"];
  }) => Pedido;
  actualizarEstado: (id: string, estado: EstadoPedido) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

/**
 * Este demo no tiene backend real: los pedidos viven en localStorage del navegador,
 * lo que basta para simular el flujo cliente → operador en una sola sesión/dispositivo.
 */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPedidos(JSON.parse(raw) as Pedido[]);
    } catch {
      /* localStorage no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
    } catch {
      /* sin persistencia */
    }
  }, [hydrated, pedidos]);

  const crearPedido = useCallback<OrdersContextValue["crearPedido"]>((input) => {
    const fecha = new Date();
    const pedido: Pedido = {
      id: `${fecha.getTime()}`,
      folio: formatFolio(fecha),
      fecha: fecha.toISOString(),
      estado: "pendiente",
      ...input,
    };
    setPedidos((prev) => [pedido, ...prev]);
    return pedido;
  }, []);

  const actualizarEstado = useCallback((id: string, estado: EstadoPedido) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
  }, []);

  const value = useMemo<OrdersContextValue>(
    () => ({ pedidos, hydrated, crearPedido, actualizarEstado }),
    [pedidos, hydrated, crearPedido, actualizarEstado],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de <OrdersProvider>");
  return ctx;
}
