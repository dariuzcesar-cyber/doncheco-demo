"use client";

import { ClipboardList, LogOut, Settings, ShoppingBasket, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

const NAV = [
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList, staffOnly: false },
  { href: "/admin/ventas", label: "Ventas", icon: TrendingUp, staffOnly: true },
  { href: "/admin/catalogo", label: "Catálogo", icon: ShoppingBasket, staffOnly: true },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings, staffOnly: true },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const { usuario, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!usuario || usuario.rol === "cliente") return null;
  const esAdmin = usuario.rol === "admin";

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-papel">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-madera/15 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/images/branding/logo_doncheco.png" alt="Don Checo" width={32} height={32} className="h-8 w-8 object-contain" />
          <div>
            <p className="font-display text-sm font-bold leading-none text-tinto">Don Checo · Panel</p>
            <p className="text-[11px] text-pizarra/50">{esAdmin ? "Administrador General" : "Operador / Punto de Venta"}</p>
          </div>
        </div>
        <button type="button" onClick={handleLogout} className="flex items-center gap-1 rounded-full border border-madera/30 px-3 py-1.5 text-xs font-medium hover:bg-papelDark">
          <LogOut className="h-3.5 w-3.5" /> Salir
        </button>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <nav className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-48 shrink-0 flex-col gap-1 border-r border-madera/15 p-4 sm:flex">
          {NAV.filter((item) => !item.staffOnly || esAdmin).map((item) => {
            const activo = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activo ? "bg-tinto text-white" : "text-pizarra/70 hover:bg-papelDark"
                }`}
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-madera/15 bg-white sm:hidden">
        {NAV.filter((item) => !item.staffOnly || esAdmin).map((item) => {
          const activo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                activo ? "text-tinto" : "text-pizarra/50"
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
