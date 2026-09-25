"use client";

import { Lock, Menu, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/disena-tu-tabla", label: "Diseña tu Tabla" },
  { href: "/eventos", label: "Eventos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const { usuario, logout } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-madera/15 bg-papel/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/branding/logo_doncheco.png" alt="Don Checo Delicatessen" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="font-display text-xl font-bold leading-none text-tinto">
            Don Checo
            <span className="block text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-madera">Delicatessen</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-pizarra/80 hover:text-tinto">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => (usuario?.rol === "cliente" ? setUserMenuOpen((v) => !v) : openAuthModal())}
              className="flex items-center gap-2 rounded-full border border-madera/30 px-3 py-1.5 text-sm hover:bg-papelDark"
            >
              {usuario?.rol === "cliente" && usuario.avatar ? (
                <Image src={usuario.avatar} alt={usuario.nombre} width={22} height={22} className="h-5 w-5 rounded-full" />
              ) : (
                <User className="h-4 w-4" />
              )}
              {usuario?.rol === "cliente" ? usuario.nombre.split(" ")[0] : "Ingresar"}
            </button>
            {userMenuOpen && usuario?.rol === "cliente" && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-madera/15 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-papelDark"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          <button type="button" onClick={openCart} aria-label="Carrito" className="relative rounded-full border border-madera/30 p-2 hover:bg-papelDark">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-tinto px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/admin"
            aria-label="Acceso operativo"
            title="Acceso operativo"
            className="hidden rounded-full p-2 text-pizarra/30 hover:bg-papelDark hover:text-tinto sm:block"
          >
            <Lock className="h-4 w-4" />
          </Link>

          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-label="Menú" className="rounded-full border border-madera/30 p-2 md:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-madera/15 bg-papel px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-pizarra/80">
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                if (usuario?.rol === "cliente") logout();
                else openAuthModal();
              }}
              className="text-left text-sm font-medium text-tinto"
            >
              {usuario?.rol === "cliente" ? "Cerrar sesión" : "Ingresar"}
            </button>
            <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 text-xs font-medium text-pizarra/40">
              <Lock className="h-3.5 w-3.5" /> Acceso operativo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
