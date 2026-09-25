"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { NEGOCIO } from "@/data/catalog";
import { useSettings } from "@/context/SettingsContext";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";

export default function AdminAjustesPage() {
  const esAdmin = useRequireAdmin();
  const { settings, setOperadorEmail, setOperadorPassword, setAdminPassword } = useSettings();

  const [nuevoEmail, setNuevoEmail] = useState(settings.operadorEmail);
  const [nuevaPasswordOperador, setNuevaPasswordOperador] = useState("");
  const [nuevaPasswordAdmin, setNuevaPasswordAdmin] = useState("");
  const [guardadoOperador, setGuardadoOperador] = useState(false);
  const [guardadoAdmin, setGuardadoAdmin] = useState(false);

  if (!esAdmin) return null;

  const handleGuardarOperador = () => {
    if (!nuevoEmail.trim()) return;
    setOperadorEmail(nuevoEmail);
    if (nuevaPasswordOperador.trim()) setOperadorPassword(nuevaPasswordOperador.trim());
    setGuardadoOperador(true);
    setTimeout(() => setGuardadoOperador(false), 2000);
  };

  const handleGuardarAdmin = () => {
    if (!nuevaPasswordAdmin.trim()) return;
    setAdminPassword(nuevaPasswordAdmin.trim());
    setGuardadoAdmin(true);
    setNuevaPasswordAdmin("");
    setTimeout(() => setGuardadoAdmin(false), 2000);
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 font-display text-3xl font-bold text-pizarra">Ajustes de Cuenta</h1>

      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-madera" />
        <h2 className="font-display text-xl font-semibold text-pizarra">Seguridad y Accesos</h2>
      </div>
      <p className="mb-6 text-sm text-pizarra/60">
        Administra las credenciales de acceso al panel operativo. En esta demo las contraseñas se
        guardan solo para ilustrar el flujo; el acceso rápido sigue disponible sin fricción desde{" "}
        <span className="font-medium text-pizarra">/admin/login</span>.
      </p>

      <div className="card mb-6 p-5">
        <h3 className="mb-1 font-display text-lg font-semibold">Configuración Admin</h3>
        <p className="mb-4 text-sm text-pizarra/60">
          Alejandra puede asignar o cambiar la contraseña vinculada a su número de Administrador.
        </p>
        <div className="mb-3 rounded-lg bg-papelDark px-3 py-2 text-sm">
          Teléfono vinculado: <span className="font-semibold">{NEGOCIO.adminTelefono}</span>
        </div>
        <label className="mb-1 block text-xs font-medium text-pizarra/70">
          {settings.adminPassword ? "Nueva contraseña" : "Crear contraseña"}
        </label>
        <input
          value={nuevaPasswordAdmin}
          onChange={(e) => setNuevaPasswordAdmin(e.target.value)}
          type="password"
          className="mb-3 w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
          placeholder={settings.adminPassword ? "••••••••" : "Define una contraseña"}
        />
        <button type="button" onClick={handleGuardarAdmin} className="btn-primary">
          {guardadoAdmin ? "¡Contraseña actualizada!" : "Guardar contraseña"}
        </button>
      </div>

      <div className="card p-5">
        <h3 className="mb-1 font-display text-lg font-semibold">Configuración Operador</h3>
        <p className="mb-4 text-sm text-pizarra/60">
          Este correo da acceso al panel simplificado de Pedidos desde el iPad de la sucursal.
          Transfiérelo cuando cambie la persona a cargo del punto de venta.
        </p>
        <div className="mb-3 rounded-lg bg-papelDark px-3 py-2 text-sm">
          Correo actual: <span className="font-semibold">{settings.operadorEmail}</span>
        </div>
        <label className="mb-1 block text-xs font-medium text-pizarra/70">Correo asignado</label>
        <input
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
          type="email"
          className="mb-3 w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
          placeholder="nuevo-operador@doncheco.mx"
        />
        <label className="mb-1 block text-xs font-medium text-pizarra/70">
          {settings.operadorPassword ? "Nueva contraseña" : "Crear contraseña"}
        </label>
        <input
          value={nuevaPasswordOperador}
          onChange={(e) => setNuevaPasswordOperador(e.target.value)}
          type="password"
          className="mb-3 w-full rounded-lg border border-madera/30 px-3 py-2 text-sm"
          placeholder={settings.operadorPassword ? "••••••••" : "Define una contraseña (opcional)"}
        />
        <button type="button" onClick={handleGuardarOperador} className="btn-primary">
          {guardadoOperador ? "¡Datos actualizados!" : "Guardar y transferir acceso"}
        </button>
      </div>
    </div>
  );
}
