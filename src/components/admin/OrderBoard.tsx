"use client";

import { MessageCircle, PackageCheck, PackageSearch, ShoppingBag } from "lucide-react";
import { useOrders } from "@/context/OrdersContext";
import { formatMXN } from "@/lib/format";
import { buildStatusUpdateMessage, normalizeMxPhone, whatsappLink } from "@/lib/whatsapp";
import type { EstadoPedido, Pedido } from "@/data/types";

const COLUMNAS: { estado: EstadoPedido; label: string; icon: typeof ShoppingBag }[] = [
  { estado: "pendiente", label: "Pendiente", icon: ShoppingBag },
  { estado: "preparacion", label: "En Preparación", icon: PackageSearch },
  { estado: "listo", label: "Listo para Pickup/Camino", icon: PackageCheck },
];

const SIGUIENTE: Partial<Record<EstadoPedido, { estado: EstadoPedido; label: string }>> = {
  pendiente: { estado: "preparacion", label: "Iniciar preparación" },
  preparacion: { estado: "listo", label: "Marcar listo" },
};

function OrderCard({ pedido }: { pedido: Pedido }) {
  const { actualizarEstado } = useOrders();
  const siguiente = SIGUIENTE[pedido.estado];

  const handleAvisar = () => {
    if (!pedido.clienteTelefono) return;
    const mensaje = buildStatusUpdateMessage(pedido);
    const numero = normalizeMxPhone(pedido.clienteTelefono);
    window.open(whatsappLink(numero, mensaje), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-xs text-pizarra/50">{pedido.folio}</p>
        <p className="text-[11px] text-pizarra/40">
          {new Date(pedido.fecha).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      <p className="mb-1 font-display text-lg font-semibold text-pizarra">{pedido.clienteNombre}</p>
      {pedido.clienteTelefono && <p className="mb-2 text-xs text-pizarra/50">{pedido.clienteTelefono}</p>}

      <ul className="mb-3 space-y-1 text-xs text-pizarra/70">
        {pedido.items.map((it, i) => (
          <li key={i}>
            • {it.cantidad} x {it.nombre}
          </li>
        ))}
      </ul>

      <p className="mb-3 font-display text-lg font-bold text-tinto">{formatMXN(pedido.total)}</p>

      <div className="flex flex-col gap-2">
        {siguiente && (
          <button
            type="button"
            onClick={() => actualizarEstado(pedido.id, siguiente.estado)}
            className="btn-primary btn-sm"
          >
            {siguiente.label}
          </button>
        )}
        <button
          type="button"
          onClick={handleAvisar}
          disabled={!pedido.clienteTelefono}
          className="btn-whatsapp btn-sm"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Avisar al cliente
        </button>
        {!pedido.clienteTelefono && (
          <p className="text-center text-[11px] text-pizarra/40">Sin teléfono registrado</p>
        )}
      </div>
    </div>
  );
}

export default function OrderBoard() {
  const { pedidos, hydrated } = useOrders();

  if (!hydrated) return <p className="text-sm text-pizarra/50">Cargando pedidos…</p>;

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold text-pizarra">Pedidos</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        {COLUMNAS.map((col) => {
          const items = pedidos.filter((p) => p.estado === col.estado);
          return (
            <div key={col.estado}>
              <div className="mb-3 flex items-center gap-2">
                <col.icon className="h-4 w-4 text-madera" />
                <h2 className="font-display text-base font-semibold text-pizarra">{col.label}</h2>
                <span className="ml-auto rounded-full bg-papelDark px-2 py-0.5 text-xs text-pizarra/60">
                  {items.length}
                </span>
              </div>
              <div className="space-y-3">
                {items.length === 0 && (
                  <p className="rounded-xl border border-dashed border-madera/20 p-4 text-center text-xs text-pizarra/40">
                    Sin pedidos aquí
                  </p>
                )}
                {items.map((p) => (
                  <OrderCard key={p.id} pedido={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
