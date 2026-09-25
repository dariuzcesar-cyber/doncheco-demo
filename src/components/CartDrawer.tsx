"use client";

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { formatMXN } from "@/lib/format";

export default function CartDrawer() {
  const { lines, total, isOpen, closeCart, updateQty, removeItem, clearCart } = useCart();
  const { openCheckout } = useCheckout();

  if (!isOpen) return null;

  const handleConfirmar = () => {
    openCheckout({
      items: lines.map((l) => ({
        nombre: l.nombre,
        cantidad: l.cantidad,
        precioUnitario: l.precioUnitario,
        detalle: l.detalle,
      })),
      origen: "carrito",
      onConfirmed: clearCart,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-pizarra/50">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-madera/15 p-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <ShoppingBag className="h-5 w-5" /> Tu carrito
          </h2>
          <button type="button" onClick={closeCart} aria-label="Cerrar" className="rounded-full p-1 hover:bg-papelDark">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center text-pizarra/60">
            <ShoppingBag className="h-10 w-10 text-madera/40" />
            <p>Tu carrito está vacío. ¡Agrega una tabla o un cléricot!</p>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto p-4">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-3">
                {l.imagen && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-papelDark">
                    <Image src={l.imagen} alt={l.nombre} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{l.nombre}</p>
                  {l.detalle && <p className="text-xs text-pizarra/60">{l.detalle}</p>}
                  <p className="text-sm font-semibold text-tinto">{formatMXN(l.precioUnitario)}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <button type="button" onClick={() => updateQty(l.id, l.cantidad - 1)} className="rounded-full border border-madera/30 p-1 hover:bg-papelDark">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{l.cantidad}</span>
                    <button type="button" onClick={() => updateQty(l.id, l.cantidad + 1)} className="rounded-full border border-madera/30 p-1 hover:bg-papelDark">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button type="button" onClick={() => removeItem(l.id)} aria-label="Eliminar" className="ml-auto rounded-full p-1 text-tinto/70 hover:bg-papelDark">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="border-t border-madera/15 p-4">
            <div className="mb-3 flex justify-between font-display text-lg font-bold text-tinto">
              <span>Total</span>
              <span>{formatMXN(total)}</span>
            </div>
            <button type="button" onClick={handleConfirmar} className="btn-whatsapp w-full">
              Confirmar pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
