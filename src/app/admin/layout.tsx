"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { usuario, hydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const esLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!hydrated || esLogin) return;
    if (!usuario || usuario.rol === "cliente") {
      router.replace("/admin/login");
    }
  }, [hydrated, usuario, esLogin, router]);

  if (esLogin) return children;

  if (!hydrated || !usuario || usuario.rol === "cliente") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-papel text-sm text-pizarra/50">
        Cargando…
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
