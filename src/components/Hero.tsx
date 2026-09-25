import Image from "next/image";
import Link from "next/link";
import { NEGOCIO } from "@/data/catalog";
import { negocioWhatsappLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/banner_principal_sketch.jpeg"
          alt="Tabla de quesos y charcutería Don Checo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pizarra/85 via-pizarra/50 to-pizarra/20" />
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end gap-5 px-4 pb-16 pt-32 sm:min-h-[70vh]">
        <span className="badge-arte w-fit bg-white/10 text-white/80">
          Propuesta de presentación artística | Arte conceptual para catálogo
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          Tablas de quesos y charcutería, hechas para compartir
        </h1>
        <p className="max-w-xl text-base text-white/80 sm:text-lg">
          Delicatessen artesanal en {NEGOCIO.ciudad}. Tablas gourmet, cléricot casero y catering
          para tus eventos — pide en línea y confirma directo por WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/#catalogo" className="btn-primary">Ver catálogo</Link>
          <Link href="/disena-tu-tabla" className="btn-light">Diseña tu tabla</Link>
          <a
            href={negocioWhatsappLink(`Hola ${NEGOCIO.nombre}, quiero más información 🧀`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
