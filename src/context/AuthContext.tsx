"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NEGOCIO } from "@/data/catalog";
import type { Usuario } from "@/data/types";
import { useSettings } from "./SettingsContext";

const STORAGE_KEY = "doncheco:usuario:v1";

interface PendingCode {
  destino: string;
  codigo: string;
  rol: "cliente" | "admin";
}

interface AuthContextValue {
  usuario: Usuario | null;
  hydrated: boolean;
  /** Simula el flujo de Google OAuth: solo captura el perfil, no hay backend real. */
  loginClienteGoogle: (nombre: string, email: string) => void;
  /** Paso 1 del login por WhatsApp: genera y "envía" un código simulado. Devuelve el código para mostrarlo en pantalla. */
  solicitarCodigoWhatsapp: (telefono: string, rol: "cliente" | "admin") => { ok: boolean; codigo?: string; error?: string };
  /** Paso 2: valida el código simulado y completa el login. */
  confirmarCodigoWhatsapp: (codigo: string) => { ok: boolean; error?: string };
  loginOperador: (email: string) => { ok: boolean; error?: string };
  /** Acceso directo de un clic para la demo: entra como Alejandra sin pedir código. */
  loginAdminDemo: () => void;
  /** Acceso directo de un clic para la demo: entra como el Operador asignado sin pedir contraseña. */
  loginOperadorDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function generarCodigo(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [pending, setPending] = useState<PendingCode | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUsuario(JSON.parse(raw) as Usuario);
    } catch {
      /* localStorage no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (usuario) localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* sin persistencia */
    }
  }, [hydrated, usuario]);

  const loginClienteGoogle = useCallback((nombre: string, email: string) => {
    const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(nombre)}&backgroundColor=800020&textColor=ffffff`;
    setUsuario({ rol: "cliente", nombre, email, avatar, metodo: "google" });
  }, []);

  const solicitarCodigoWhatsapp = useCallback(
    (telefono: string, rol: "cliente" | "admin") => {
      const digitos = telefono.replace(/\D/g, "");
      if (digitos.length < 10) {
        return { ok: false, error: "Ingresa un número de 10 dígitos." };
      }
      if (rol === "admin" && digitos !== NEGOCIO.adminTelefono) {
        return { ok: false, error: "Este número no tiene acceso de Administrador." };
      }
      const codigo = generarCodigo();
      setPending({ destino: digitos, codigo, rol });
      return { ok: true, codigo };
    },
    [],
  );

  const confirmarCodigoWhatsapp = useCallback(
    (codigo: string) => {
      if (!pending) return { ok: false, error: "Solicita un código primero." };
      if (codigo.trim() !== pending.codigo) {
        return { ok: false, error: "Código incorrecto." };
      }
      if (pending.rol === "admin") {
        setUsuario({ rol: "admin", nombre: "Alejandra (Admin)", telefono: pending.destino });
      } else {
        setUsuario({ rol: "cliente", nombre: `Cliente ${pending.destino.slice(-4)}`, telefono: pending.destino, metodo: "whatsapp" });
      }
      setPending(null);
      return { ok: true };
    },
    [pending],
  );

  const loginOperador = useCallback(
    (email: string) => {
      const normalizado = email.trim().toLowerCase();
      if (normalizado !== settings.operadorEmail.trim().toLowerCase()) {
        return { ok: false, error: "Este correo no está asignado como Operador. Contacta al Administrador." };
      }
      setUsuario({ rol: "operador", nombre: "Operador de Sucursal", email: normalizado });
      return { ok: true };
    },
    [settings.operadorEmail],
  );

  const loginAdminDemo = useCallback(() => {
    setUsuario({ rol: "admin", nombre: "Alejandra (Admin)", telefono: NEGOCIO.adminTelefono });
  }, []);

  const loginOperadorDemo = useCallback(() => {
    setUsuario({ rol: "operador", nombre: "Operador de Sucursal", email: settings.operadorEmail });
  }, [settings.operadorEmail]);

  const logout = useCallback(() => setUsuario(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      hydrated,
      loginClienteGoogle,
      solicitarCodigoWhatsapp,
      confirmarCodigoWhatsapp,
      loginOperador,
      loginAdminDemo,
      loginOperadorDemo,
      logout,
    }),
    [
      usuario,
      hydrated,
      loginClienteGoogle,
      solicitarCodigoWhatsapp,
      confirmarCodigoWhatsapp,
      loginOperador,
      loginAdminDemo,
      loginOperadorDemo,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
