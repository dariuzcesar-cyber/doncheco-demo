import { CATEGORIAS, PRODUCTOS } from "@/data/catalog";
import ProductCard from "./ProductCard";

export default function Catalog() {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-2 font-display text-3xl font-bold text-pizarra">Nuestro catálogo</h2>
      <p className="mb-8 max-w-xl text-sm text-pizarra/60">
        Precios en pesos mexicanos. Todos los productos se confirman por WhatsApp antes de
        preparar tu pedido.
      </p>

      <div className="space-y-14">
        {CATEGORIAS.map((cat) => {
          const productos = PRODUCTOS.filter((p) => p.categoria === cat.id);
          if (productos.length === 0) return null;
          return (
            <div key={cat.id} id={`cat-${cat.id}`}>
              <h3 className="mb-4 font-display text-2xl font-semibold text-tinto">{cat.nombre}</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {productos.map((p) => (
                  <ProductCard key={p.id} producto={p} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
