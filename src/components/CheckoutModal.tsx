"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useOrders } from "@/context/OrdersContext";
import { formatMXN } from "@/lib/format";
import { buildOrderMessage, negocioWhatsappLink } from "@/lib/whatsapp";

export default function CheckoutModal() {
  const { request, closeCheckout } = useCheckout();
  const { usuario } = useAuth();
  const { crearPedido } = useOrders();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (!request) return;
    setNombre(usuario?.nombre && usuario.rol === "cliente" ? usuario.nombre : "");
    setTelefono(usuario?.rol === "cliente" ? usuario.telefono ?? "" : "");
  }, [request, usuario]);

  if (!request) return null;

  const total = request.items.reduce((s, it) => s + it.precioUnitario * it.cantidad, 0);

  const handleConfirmar = () => {
    if (!nombre.trim()) return;
    crearPedido({
      clienteNombre: nombre.trim(),
      clienteTelefono: telefono.trim() || undefined,
      items: request.items,
      total,
      origen: request.origen,
    });
    const mensaje = buildOrderMessage({ clienteNombre: nombre.trim(), items: request.items, total });
    window.open(negocioWhatsappLink(mensaje), "_blank", "noopener,noreferrer");
    request.onConfirmed?.();
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-pizarra/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-pizarra">Confirmar pedido</h2>
          <button type="button" onClick={closeCheckout} aria-label="Cerrar" className="rounded-full p-1 hover:bg-papelDark">
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="mb-4 space-y-2 border-b border-madera/15 pb-4">
          {request.items.map((it, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>
                {it.cantidad} x {it.nombre}
                {it.detalle && <span className="block text-xs text-pizarra/60">{it.detalle}</span>}
              </span>
              <span className="font-medium">{formatMXN(it.precioUnitario * it.cantidad)}</span>
            </li>
          ))}
        </ul>

        <div className="mb-4 flex justify-between font-display text-xl font-bold text-tinto">
          <span>Total</span>
          <span>{formatMXN(total)}</span>
        </div>

        <div className="mb-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-pizarra/70">Tu nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-pizarra/70">Teléfono (opcional)</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="10 dígitos"
              className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirmar}
          disabled={!nombre.trim()}
          className="btn-whatsapp w-full"
        >
          Confirmar y enviar por WhatsApp
        </button>
        <p className="mt-2 text-center text-xs text-pizarra/50">
          Se abrirá WhatsApp con tu pedido para confirmar inventario y forma de pago.
        </p>
      </div>
    </div>
  );
}
