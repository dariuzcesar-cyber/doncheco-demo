"use client";

import { CATEGORIAS, PRODUCTOS } from "@/data/catalog";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";
import { formatMXN } from "@/lib/format";

export default function AdminCatalogoPage() {
  const esAdmin = useRequireAdmin();
  if (!esAdmin) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-pizarra">Catálogo</h1>
        <span className="rounded-full bg-madera/15 px-3 py-1 text-xs font-medium text-madera">
          Vista de solo lectura en esta demo
        </span>
      </div>

      <div className="space-y-8">
        {CATEGORIAS.map((cat) => {
          const productos = PRODUCTOS.filter((p) => p.categoria === cat.id);
          if (productos.length === 0) return null;
          return (
            <div key={cat.id} className="card overflow-hidden">
              <div className="border-b border-madera/15 bg-papelDark px-4 py-2">
                <h2 className="font-display text-base font-semibold text-tinto">{cat.nombre}</h2>
              </div>
              <ul className="divide-y divide-madera/10">
                {productos.map((p) => (
                  <li key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div>
                      <p className="font-medium text-pizarra">{p.nombre}</p>
                      {p.porciones && <p className="text-xs text-pizarra/50">{p.porciones}</p>}
                    </div>
                    <span className="font-display text-base font-bold text-tinto">{formatMXN(p.precio)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
