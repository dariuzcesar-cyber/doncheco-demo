"use client";

import { useMemo, useState } from "react";
import { NEGOCIO, PAQUETES_EVENTO } from "@/data/catalog";
import { formatMXN } from "@/lib/format";
import { buildEventQuoteMessage, negocioWhatsappLink } from "@/lib/whatsapp";

function recomendarPaquete(personas: number) {
  const match = PAQUETES_EVENTO.find((p) => personas >= p.minPersonas && personas <= p.maxPersonas);
  if (match) return match;

  if (personas > PAQUETES_EVENTO[PAQUETES_EVENTO.length - 1].maxPersonas) {
    const ultimo = PAQUETES_EVENTO[PAQUETES_EVENTO.length - 1];
    const multiplo = Math.ceil(personas / ultimo.maxPersonas);
    return { producto: ultimo.producto, minPersonas: personas, maxPersonas: personas, multiplo };
  }
  return null;
}

export default function EventQuoter() {
  const [personas, setPersonas] = useState(10);
  const [nombre, setNombre] = useState("");

  const recomendacion = useMemo(() => recomendarPaquete(personas), [personas]);
  const multiplo = (recomendacion as { multiplo?: number } | null)?.multiplo ?? 1;
  const estimado = recomendacion ? recomendacion.producto.precio * multiplo : 0;

  const esGrande = personas > PAQUETES_EVENTO[PAQUETES_EVENTO.length - 1].maxPersonas;

  const handleCotizar = () => {
    if (!recomendacion) return;
    const mensaje = esGrande
      ? [
          `Hola ${NEGOCIO.nombre}, quiero cotizar un evento grande 🎉`,
          ``,
          `👤 Nombre: ${nombre || "Sin especificar"}`,
          `👥 Número de personas: ${personas}`,
          `📦 Me interesa: Capelos & Mesas Grazing (cotización personalizada)`,
          `📊 Referencia estimada: ${multiplo} x ${recomendacion.producto.nombre} ≈ ${formatMXN(estimado)}`,
        ].join("\n")
      : buildEventQuoteMessage({
          clienteNombre: nombre || "Sin especificar",
          personas,
          paqueteNombre: recomendacion.producto.nombre,
          estimado,
        });
    window.open(negocioWhatsappLink(mensaje), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card mx-auto max-w-xl p-6">
      <h3 className="mb-1 font-display text-xl font-semibold">Cotizador de Eventos</h3>
      <p className="mb-6 text-sm text-pizarra/60">
        Dinos cuántas personas asistirán y te recomendamos el paquete ideal con un estimado al instante.
      </p>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-pizarra/70">Tu nombre (opcional)</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
          placeholder="Para personalizar tu cotización"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 flex justify-between text-xs font-medium text-pizarra/70">
          <span>Número de personas</span>
          <span className="font-display text-lg font-bold text-tinto">{personas}</span>
        </label>
        <input
          type="range"
          min={1}
          max={60}
          value={personas}
          onChange={(e) => setPersonas(Number(e.target.value))}
          className="w-full accent-tinto"
        />
      </div>

      {recomendacion && (
        <div className="mb-6 rounded-xl border border-madera/20 bg-papelDark p-4">
          {esGrande ? (
            <>
              <p className="text-sm font-medium text-pizarra">
                Para {personas} personas te recomendamos nuestro módulo de{" "}
                <span className="font-semibold text-tinto">Capelos & Mesas Grazing</span>, con cotización
                personalizada.
              </p>
              <p className="mt-1 text-xs text-pizarra/60">
                Referencia: {multiplo} x {recomendacion.producto.nombre} ≈ {formatMXN(estimado)}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-pizarra">
                Paquete recomendado: <span className="font-semibold text-tinto">{recomendacion.producto.nombre}</span>
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-tinto">{formatMXN(estimado)}</p>
            </>
          )}
        </div>
      )}

      <button type="button" onClick={handleCotizar} className="btn-whatsapp w-full">
        Solicitar esta cotización por WhatsApp
      </button>
    </div>
  );
}
