"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

type Paso = "elegir" | "google" | "whatsapp-numero" | "whatsapp-codigo";

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const { loginClienteGoogle, solicitarCodigoWhatsapp, confirmarCodigoWhatsapp } = useAuth();

  const [paso, setPaso] = useState<Paso>("elegir");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const cerrar = () => {
    setPaso("elegir");
    setNombre("");
    setEmail("");
    setTelefono("");
    setCodigoIngresado("");
    setError("");
    closeAuthModal();
  };

  const handleGoogleSubmit = () => {
    if (!nombre.trim() || !email.trim()) {
      setError("Completa tu nombre y correo.");
      return;
    }
    loginClienteGoogle(nombre.trim(), email.trim());
    cerrar();
  };

  const handleSolicitarCodigo = () => {
    const r = solicitarCodigoWhatsapp(telefono, "cliente");
    if (!r.ok) {
      setError(r.error ?? "No se pudo enviar el código.");
      return;
    }
    setCodigoEnviado(r.codigo ?? "");
    setError("");
    setPaso("whatsapp-codigo");
  };

  const handleConfirmarCodigo = () => {
    const r = confirmarCodigoWhatsapp(codigoIngresado);
    if (!r.ok) {
      setError(r.error ?? "Código incorrecto.");
      return;
    }
    cerrar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-pizarra/50 p-0 sm:items-center sm:p-4">
      <div className="w-full max-w-sm rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-pizarra">
            {paso === "elegir" && "Inicia sesión"}
            {paso === "google" && "Continuar con Google"}
            {paso === "whatsapp-numero" && "Continuar con WhatsApp"}
            {paso === "whatsapp-codigo" && "Confirma tu código"}
          </h2>
          <button type="button" onClick={cerrar} aria-label="Cerrar" className="rounded-full p-1 hover:bg-papelDark">
            <X className="h-5 w-5" />
          </button>
        </div>

        {paso === "elegir" && (
          <div className="space-y-3">
            <p className="text-sm text-pizarra/60">
              Guarda tus datos para agilizar tus pedidos y recibir promociones.
            </p>
            <button type="button" onClick={() => setPaso("google")} className="btn-outline w-full">
              <svg viewBox="0 0 48 48" className="h-4 w-4"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.5-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 16 3 9 7.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.5C29.6 36 27 37 24 37c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9 40.5 16 45 24 45z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.5l6.6 5.5C41.8 35.9 45 30.5 45 24c0-1.4-.1-2.5-.4-3.5z"/></svg>
              Continuar con Google
            </button>
            <button type="button" onClick={() => setPaso("whatsapp-numero")} className="btn-whatsapp w-full">
              <MessageCircle className="h-4 w-4" /> Continuar con WhatsApp
            </button>
          </div>
        )}

        {paso === "google" && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Correo</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm" placeholder="tu@correo.com" />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <p className="text-[11px] text-pizarra/40">Simulación de Google Login para esta demo — no se conecta a tu cuenta real.</p>
            <button type="button" onClick={handleGoogleSubmit} className="btn-primary w-full">Continuar</button>
          </div>
        )}

        {paso === "whatsapp-numero" && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Número de WhatsApp</label>
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} inputMode="numeric" className="w-full rounded-lg border border-madera/30 px-3 py-2 text-sm" placeholder="10 dígitos" />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <button type="button" onClick={handleSolicitarCodigo} className="btn-whatsapp w-full">Enviar código</button>
          </div>
        )}

        {paso === "whatsapp-codigo" && (
          <div className="space-y-3">
            <div className="rounded-lg bg-papelDark p-3 text-xs text-pizarra/70">
              Código de confirmación simulado: <span className="font-mono text-base font-bold text-tinto">{codigoEnviado}</span>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-pizarra/70">Ingresa el código</label>
              <input value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} inputMode="numeric" maxLength={4} className="w-full rounded-lg border border-madera/30 px-3 py-2 text-center text-lg tracking-[0.5em]" placeholder="0000" />
            </div>
            {error && <p className="text-xs text-tinto">{error}</p>}
            <button type="button" onClick={handleConfirmarCodigo} className="btn-primary w-full">Confirmar</button>
          </div>
        )}
      </div>
    </div>
  );
}
