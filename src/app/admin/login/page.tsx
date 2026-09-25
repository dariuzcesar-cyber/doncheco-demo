"use client";

import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { NEGOCIO } from "@/data/catalog";
import { useSettings } from "@/context/SettingsContext";

type Tab = "admin" | "operador";
type PasoAdmin = "telefono" | "codigo";

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    usuario,
    hydrated,
    solicitarCodigoWhatsapp,
    confirmarCodigoWhatsapp,
    loginOperador,
    loginAdminDemo,
    loginOperadorDemo,
  } = useAuth();
  const { settings } = useSettings();

  const [tab, setTab] = useState<Tab>("operador");
  const [pasoAdmin, setPasoAdmin] = useState<PasoAdmin>("telefono");
  const [telefono, setTelefono] = useState(NEGOCIO.adminTelefono);
  const [codigoEnviado, setCodigoEnviado] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [email, setEmail] = useState(settings.operadorEmail);
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(settings.operadorEmail);
  }, [settings.operadorEmail]);

  useEffect(() => {
    if (hydrated && usuario && (usuario.rol === "admin" || usuario.rol === "operador")) {
      router.replace("/admin/pedidos");
    }
  }, [hydrated, usuario, router]);

  const handleSolicitarCodigo = () => {
    const r = solicitarCodigoWhatsapp(telefono, "admin");
    if (!r.ok) {
      setError(r.error ?? "No se pudo enviar el código.");
      return;
    }
    setCodigoEnviado(r.codigo ?? "");
    setError("");
    setPasoAdmin("codigo");
  };

  const handleConfirmarCodigo = () => {
    const r = confirmarCodigoWhatsapp(codigoIngresado);
    if (!r.ok) {
      setError(r.error ?? "Código incorrecto.");
      return;
    }
    router.replace("/admin/pedidos");
  };

  const handleOperadorSubmit = () => {
    const r = loginOperador(email);
    if (!r.ok) {
      setError(r.error ?? "No se pudo iniciar sesión.");
      return;
    }
    router.replace("/admin/pedidos");
  };

  const handleAdminDemo = () => {
    loginAdminDemo();
    router.replace("/admin/pedidos");
  };

  const handleOperadorDemo = () => {
    loginOperadorDemo();
    router.replace("/admin/pedidos");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pizarra px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/images/branding/logo_doncheco.png" alt="Don Checo Delicatessen" width={56} height={56} className="mb-2 h-14 w-14 object-contain" />
          <h1 className="font-display text-2xl font-bold text-pizarra">Acceso operativo</h1>
          <p className="text-xs text-pizarra/60">Panel para el equipo de Don Checo Delicatessen</p>
        </div>

        <div className="mb-5 flex rounded-full bg-papelDark p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => {
              setTab("operador");
              setError("");
            }}
            className={`flex-1 rounded-full py-1.5 transition ${tab === "operador" ? "bg-white text-tinto shadow" : "text-pizarra/50"}`}
          >
            Operador
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("admin");
              setError("");
            }}
            className={`flex-1 rounded-full py-1.5 transition ${tab === "admin" ? "bg-white text-tinto shadow" : "text-pizarra/50"}`}
          >
            Administrador
          </button>
        </div>

        {tab === "operador" && (
          <div className="space-y-3">
            <button type="button" onClick={handleOperadorDemo} className="btn-primary w-full bg-madera hover:bg-madera/90">
              <Zap className="h-4 w-4" /> Ingresar como Operador (Demo iPad)
            </button>
            <p className="text-center text-[11px] text-pizarra/40">
              Acceso inmediato de un clic para la demo, sin contraseña por ahora.
            </p>

            <div className="flex items-center gap-2 py-1 text-[11px] text-pizarra/30">
              <div className="h-px flex-1 bg-madera/15" /> o inicia con tu correo <div className="h-px flex-1 bg-madera/15" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Correo asignado</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
                placeholder="operador@doncheco.mx"
              />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <button type="button" onClick={handleOperadorSubmit} className="btn-outline w-full">
              Entrar como Operador
            </button>
            <p className="text-center text-[11px] text-pizarra/40">
              El correo del punto de venta lo asigna el Administrador.
            </p>
          </div>
        )}

        {tab === "admin" && pasoAdmin === "telefono" && (
          <div className="space-y-3">
            <button type="button" onClick={handleAdminDemo} className="btn-primary w-full bg-madera hover:bg-madera/90">
              <Zap className="h-4 w-4" /> Ingresar como Admin (Demo Alejandra)
            </button>
            <p className="text-center text-[11px] text-pizarra/40">
              Acceso inmediato de un clic para la demo, sin código por ahora.
            </p>

            <div className="flex items-center gap-2 py-1 text-[11px] text-pizarra/30">
              <div className="h-px flex-1 bg-madera/15" /> o confirma por WhatsApp <div className="h-px flex-1 bg-madera/15" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Teléfono de Administrador</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
                placeholder="10 dígitos"
              />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <button type="button" onClick={handleSolicitarCodigo} className="btn-outline w-full">
              Enviar código de confirmación
            </button>
          </div>
        )}

        {tab === "admin" && pasoAdmin === "codigo" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-papelDark p-3 text-xs text-pizarra/70">
              Código simulado: <span className="font-mono text-base font-bold text-tinto">{codigoEnviado}</span>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Código de confirmación</label>
              <input
                value={codigoIngresado}
                onChange={(e) => setCodigoIngresado(e.target.value)}
                inputMode="numeric"
                maxLength={4}
                className="w-full rounded-lg border border-madera/30 px-3 py-2 text-center text-lg tracking-[0.5em]"
                placeholder="0000"
              />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <button type="button" onClick={handleConfirmarCodigo} className="btn-primary w-full">
              Confirmar y entrar
            </button>
          </div>
        )}

        <Link href="/" className="mt-6 block text-center text-xs text-pizarra/40 hover:text-tinto">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
