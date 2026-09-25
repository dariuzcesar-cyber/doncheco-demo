"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

/** Redirige a Pedidos si el usuario en sesión no es Administrador (ej. un Operador entra por URL directa). */
export function useRequireAdmin() {
  const { usuario, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (usuario?.rol !== "admin") router.replace("/admin/pedidos");
  }, [hydrated, usuario, router]);

  return usuario?.rol === "admin";
}
