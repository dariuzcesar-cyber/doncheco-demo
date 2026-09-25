"use client";

import Image from "next/image";
import { useState } from "react";
import type { Producto } from "@/data/types";
import { formatMXN } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addItem } = useCart();
  const { openCheckout } = useCheckout();
  const [cantidad, setCantidad] = useState(producto.minimo ?? 1);

  const handleAgregar = () => {
    addItem(
      {
        id: producto.id,
        nombre: producto.nombre,
        precioUnitario: producto.precio,
        imagen: producto.imagen,
      },
      cantidad,
    );
  };

  const handleComprarAhora = () => {
    openCheckout({
      items: [{ nombre: producto.nombre, cantidad, precioUnitario: producto.precio }],
      origen: "compra-directa",
    });
  };

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-papelDark">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="badge-arte absolute bottom-2 left-2 backdrop-blur-sm bg-papelDark/90">
          Propuesta de presentación artística | Arte conceptual para catálogo
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {producto.destacado && <span className="badge-destacado">{producto.destacado}</span>}
          {producto.envioNacional && (
            <span className="badge-envio">📦 Envío nacional por Mercado Libre</span>
          )}
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug text-pizarra">
          {producto.nombre}
        </h3>
        {producto.porciones && (
          <p className="text-xs font-medium uppercase tracking-wide text-madera">
            {producto.porciones}
          </p>
        )}
        <p className="flex-1 text-sm text-pizarra/70">{producto.descripcion}</p>

        <div className="flex items-baseline justify-between pt-1">
          <span className="font-display text-2xl font-bold text-tinto">
            {formatMXN(producto.precio)}
          </span>
          {producto.minimo && (
            <span className="text-xs text-pizarra/60">Mín. {producto.minimo} pzas</span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <label className="text-xs text-pizarra/60" htmlFor={`qty-${producto.id}`}>
            Cant.
          </label>
          <input
            id={`qty-${producto.id}`}
            type="number"
            min={producto.minimo ?? 1}
            max={99}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(producto.minimo ?? 1, Number(e.target.value) || 1))}
            className="w-16 rounded-lg border border-madera/30 px-2 py-1 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={handleAgregar}
            className="btn-outline btn-sm"
          >
            Agregar al carrito
          </button>
          <button
            type="button"
            onClick={handleComprarAhora}
            className="btn-whatsapp btn-sm"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
