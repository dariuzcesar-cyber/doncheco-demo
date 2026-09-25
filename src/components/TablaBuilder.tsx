"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { CHARCUTERIA, EXTRAS, QUESOS, TAMANOS_TABLA } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { formatMXN } from "@/lib/format";

const MAX_QUESOS = 3;
const MAX_CHARCUTERIA = 2;

const PASOS = ["Tamaño", "Quesos", "Charcutería", "Extras"] as const;

function toggle(lista: string[], id: string, max: number): string[] {
  if (lista.includes(id)) return lista.filter((x) => x !== id);
  if (lista.length >= max) return lista;
  return [...lista, id];
}

export default function TablaBuilder() {
  const { addItem, openCart } = useCart();
  const [paso, setPaso] = useState(0);
  const [tamanoId, setTamanoId] = useState(TAMANOS_TABLA[3]?.id ?? TAMANOS_TABLA[0].id);
  const [quesos, setQuesos] = useState<string[]>([]);
  const [charcuteria, setCharcuteria] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [agregada, setAgregada] = useState(false);

  const tamano = useMemo(() => TAMANOS_TABLA.find((t) => t.id === tamanoId)!, [tamanoId]);
  const extrasSeleccionados = useMemo(() => EXTRAS.filter((e) => extras.includes(e.id)), [extras]);
  const totalExtras = extrasSeleccionados.reduce((s, e) => s + e.precio, 0);
  const total = tamano.precio + totalExtras;

  const puedeAvanzar =
    (paso === 0 && !!tamanoId) ||
    (paso === 1 && quesos.length === MAX_QUESOS) ||
    (paso === 2 && charcuteria.length > 0) ||
    paso === 3;

  const handleAgregar = () => {
    const nombresQuesos = quesos.map((id) => QUESOS.find((q) => q.id === id)?.nombre).join(", ");
    const nombresCharcuteria = charcuteria.map((id) => CHARCUTERIA.find((c) => c.id === id)?.nombre).join(", ");
    const nombresExtras = extrasSeleccionados.map((e) => e.nombre).join(", ");

    const detalle = [
      `Quesos: ${nombresQuesos}`,
      `Charcutería: ${nombresCharcuteria}`,
      nombresExtras ? `Extras: ${nombresExtras}` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    addItem(
      {
        id: `tabla-custom-${Date.now()}`,
        nombre: `Tabla Personalizada (${tamano.nombre})`,
        precioUnitario: total,
        detalle,
        imagen: tamano.imagen,
      },
      1,
    );
    setAgregada(true);
    setTimeout(() => {
      openCart();
      setAgregada(false);
      setPaso(0);
      setQuesos([]);
      setCharcuteria([]);
      setExtras([]);
    }, 700);
  };

  return (
    <div className="card mx-auto max-w-2xl p-6">
      <ol className="mb-8 flex items-center justify-between">
        {PASOS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= paso ? "bg-tinto text-white" : "bg-papelDark text-pizarra/40"
              }`}
            >
              {i < paso ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`ml-2 hidden text-xs font-medium sm:block ${i <= paso ? "text-pizarra" : "text-pizarra/40"}`}>
              {label}
            </span>
            {i < PASOS.length - 1 && <div className={`mx-2 h-px flex-1 ${i < paso ? "bg-tinto" : "bg-papelDark"}`} />}
          </li>
        ))}
      </ol>

      {paso === 0 && (
        <div>
          <h3 className="mb-4 font-display text-xl font-semibold">1. Elige el tamaño base</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {TAMANOS_TABLA.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTamanoId(t.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  tamanoId === t.id ? "border-tinto bg-tinto/5" : "border-madera/20 hover:border-madera/40"
                }`}
              >
                <p className="font-medium">{t.nombre}</p>
                <p className="text-xs text-pizarra/60">{t.porciones}</p>
                <p className="mt-1 font-display text-lg font-bold text-tinto">{formatMXN(t.precio)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {paso === 1 && (
        <div>
          <h3 className="mb-1 font-display text-xl font-semibold">2. Elige 3 quesos</h3>
          <p className="mb-4 text-xs text-pizarra/60">Seleccionados: {quesos.length}/{MAX_QUESOS}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {QUESOS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setQuesos((prev) => toggle(prev, q.id, MAX_QUESOS))}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  quesos.includes(q.id) ? "border-tinto bg-tinto/5 text-tinto" : "border-madera/20 hover:border-madera/40"
                }`}
              >
                {q.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {paso === 2 && (
        <div>
          <h3 className="mb-1 font-display text-xl font-semibold">3. Elige tu charcutería</h3>
          <p className="mb-4 text-xs text-pizarra/60">Selecciona hasta {MAX_CHARCUTERIA}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CHARCUTERIA.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCharcuteria((prev) => toggle(prev, c.id, MAX_CHARCUTERIA))}
                className={`rounded-lg border px-3 py-2 text-sm transition ${
                  charcuteria.includes(c.id) ? "border-tinto bg-tinto/5 text-tinto" : "border-madera/20 hover:border-madera/40"
                }`}
              >
                {c.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {paso === 3 && (
        <div>
          <h3 className="mb-1 font-display text-xl font-semibold">4. Extras (opcional)</h3>
          <p className="mb-4 text-xs text-pizarra/60">Súmale un toque especial a tu tabla</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {EXTRAS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setExtras((prev) => (prev.includes(e.id) ? prev.filter((x) => x !== e.id) : [...prev, e.id]))}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                  extras.includes(e.id) ? "border-tinto bg-tinto/5 text-tinto" : "border-madera/20 hover:border-madera/40"
                }`}
              >
                <span>{e.nombre}</span>
                <span className="text-xs">+{formatMXN(e.precio)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-madera/15 pt-4">
        <div>
          <p className="text-xs text-pizarra/60">Total estimado</p>
          <p className="font-display text-2xl font-bold text-tinto">{formatMXN(total)}</p>
        </div>
        <div className="flex gap-2">
          {paso > 0 && (
            <button type="button" onClick={() => setPaso((p) => p - 1)} className="btn-outline btn-sm">
              Atrás
            </button>
          )}
          {paso < PASOS.length - 1 ? (
            <button
              type="button"
              disabled={!puedeAvanzar}
              onClick={() => setPaso((p) => p + 1)}
              className="btn-primary btn-sm"
            >
              Siguiente
            </button>
          ) : (
            <button type="button" onClick={handleAgregar} className="btn-primary btn-sm">
              {agregada ? "¡Agregada!" : "Agregar al carrito"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
