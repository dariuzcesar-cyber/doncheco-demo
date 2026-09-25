import { Instagram, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NEGOCIO } from "@/data/catalog";
import { negocioWhatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer id="contacto" className="mt-16 bg-pizarra text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <Image src="/images/branding/logo_doncheco.png" alt="Don Checo Delicatessen" width={56} height={56} className="mb-3 h-14 w-14 object-contain" />
          <p className="font-display text-xl font-semibold">{NEGOCIO.nombre}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4" /> {NEGOCIO.ciudad}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Explora</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/#catalogo">Catálogo</Link></li>
            <li><Link href="/disena-tu-tabla">Diseña tu Tabla</Link></li>
            <li><Link href="/eventos">Eventos & Banquetes</Link></li>
            <li><Link href="/admin/login">Acceso operativo</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Contáctanos</h3>
          <a
            href={negocioWhatsappLink(`Hola ${NEGOCIO.nombre}, quiero más información 🧀`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mb-3"
          >
            <MessageCircle className="h-4 w-4" /> {NEGOCIO.whatsappDisplay}
          </a>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Instagram className="h-4 w-4" /> {NEGOCIO.instagram}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {NEGOCIO.nombre} · Demo interactiva
      </div>
    </footer>
  );
}
