import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS_DESTACADAS } from "@/data/catalog";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 font-display text-3xl font-bold text-pizarra">Explora por categoría</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CATEGORIAS_DESTACADAS.map((cat) => (
          <Link
            key={cat.id}
            href={`/#cat-${cat.id}`}
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            <Image
              src={cat.imagen}
              alt={cat.nombre}
              fill
              sizes="(min-width: 640px) 25vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pizarra/80 via-pizarra/10 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 font-display text-lg font-semibold text-white">
              {cat.nombre}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
