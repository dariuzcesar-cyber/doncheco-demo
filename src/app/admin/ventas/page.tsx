"use client";

import { useMemo } from "react";
import { useOrders } from "@/context/OrdersContext";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";
import { formatMXN } from "@/lib/format";

export default function AdminVentasPage() {
  const esAdmin = useRequireAdmin();
  const { pedidos, hydrated } = useOrders();

  const stats = useMemo(() => {
    const total = pedidos.reduce((s, p) => s + p.total, 0);
    const ticketPromedio = pedidos.length ? total / pedidos.length : 0;
    const porOrigen = pedidos.reduce<Record<string, number>>((acc, p) => {
      acc[p.origen] = (acc[p.origen] ?? 0) + 1;
      return acc;
    }, {});
    return { total, ticketPromedio, porOrigen, cantidad: pedidos.length };
  }, [pedidos]);

  if (!esAdmin || !hydrated) return null;

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold text-pizarra">Ventas</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-pizarra/50">Ingresos registrados</p>
          <p className="mt-1 font-display text-3xl font-bold text-tinto">{formatMXN(stats.total)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-pizarra/50">Pedidos totales</p>
          <p className="mt-1 font-display text-3xl font-bold text-tinto">{stats.cantidad}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-pizarra/50">Ticket promedio</p>
          <p className="mt-1 font-display text-3xl font-bold text-tinto">{formatMXN(stats.ticketPromedio)}</p>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="mb-3 font-display text-lg font-semibold">Pedidos por origen</h2>
        <ul className="space-y-2 text-sm">
          {Object.entries(stats.porOrigen).map(([origen, n]) => (
            <li key={origen} className="flex justify-between border-b border-madera/10 py-1 last:border-0">
              <span className="capitalize text-pizarra/70">{origen.replace(/-/g, " ")}</span>
              <span className="font-semibold">{n}</span>
            </li>
          ))}
          {stats.cantidad === 0 && <p className="text-pizarra/40">Aún no hay pedidos registrados en esta demo.</p>}
        </ul>
      </div>
    </div>
  );
}
