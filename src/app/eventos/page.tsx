import type { Metadata } from "next";
import Image from "next/image";
import EventQuoter from "@/components/EventQuoter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { PRODUCTOS } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Eventos & Banquetes | Don Checo Delicatessen",
};

export default function EventosPage() {
  const vasitos = PRODUCTOS.find((p) => p.id === "vasitos-evento")!;

  return (
    <>
      <Header />
      <main>
        <section className="relative">
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src="/images/categorias/cat_eventos_bodas.jpeg"
              alt="Eventos y banquetes Don Checo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-pizarra/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="font-display text-4xl font-bold">Eventos & Banquetes</h1>
              <p className="mt-2 max-w-lg text-sm text-white/80">
                Bodas, cumpleaños y reuniones corporativas: llevamos nuestras tablas y catering a tu
                celebración.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <EventQuoter />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="mb-4 font-display text-2xl font-semibold text-tinto">
            Vasitos individuales para eventos
          </h2>
          <div className="max-w-sm">
            <ProductCard producto={vasitos} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
