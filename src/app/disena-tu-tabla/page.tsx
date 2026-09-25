import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TablaBuilder from "@/components/TablaBuilder";

export const metadata: Metadata = {
  title: "Diseña tu Tabla | Don Checo Delicatessen",
};

export default function DisenaTuTablaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-pizarra">Diseña tu Tabla</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-pizarra/60">
            Arma tu tabla ideal en 4 pasos: elige el tamaño, tus quesos favoritos, la charcutería y
            los extras que la harán única.
          </p>
        </div>
        <TablaBuilder />
      </main>
      <Footer />
    </>
  );
}
