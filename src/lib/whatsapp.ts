import { NEGOCIO } from "@/data/catalog";
import type { EstadoPedido, ItemPedido, Pedido } from "@/data/types";
import { formatMXN } from "./format";

export function whatsappLink(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Normaliza un teléfono capturado a 10 dígitos al formato E.164 sin "+" para México. */
export function normalizeMxPhone(telefono: string): string {
  const digitos = telefono.replace(/\D/g, "");
  if (digitos.length === 10) return `52${digitos}`;
  return digitos;
}

export function negocioWhatsappLink(mensaje: string): string {
  return whatsappLink(NEGOCIO.whatsapp, mensaje);
}

interface OrderMessageInput {
  clienteNombre: string;
  items: ItemPedido[];
  total: number;
}

/** Mensaje estructurado enviado al negocio al confirmar un pedido. */
export function buildOrderMessage({ clienteNombre, items, total }: OrderMessageInput): string {
  const lista = items
    .map((it) => {
      const detalle = it.detalle ? ` (${it.detalle})` : "";
      return `• ${it.cantidad} x ${it.nombre}${detalle} — ${formatMXN(it.precioUnitario * it.cantidad)}`;
    })
    .join("\n");

  return [
    `Hola ${NEGOCIO.nombre}, quiero confirmar mi pedido 🧀`,
    ``,
    `👤 Nombre: ${clienteNombre}`,
    ``,
    `🛒 Pedido:`,
    lista,
    ``,
    `💰 Total: ${formatMXN(total)}`,
    ``,
    `Quedo al pendiente de confirmación de inventario y datos/link de pago. ¡Gracias!`,
  ].join("\n");
}

const ESTADO_LABEL: Record<EstadoPedido, string> = {
  pendiente: "Pendiente",
  preparacion: "En Preparación",
  listo: "Listo para Pickup/Camino",
};

const ESTADO_MENSAJE: Record<EstadoPedido, string> = {
  pendiente: "Hemos recibido tu pedido y lo confirmaremos en un momento.",
  preparacion: "Tu pedido ya está en preparación en nuestra cocina. ¡Pronto estará listo!",
  listo: "¡Tu pedido está listo! Ya puedes pasar por él o está en camino, según lo acordado.",
};

/** Mensaje pre-redactado que el operador envía al cliente al cambiar el estado del pedido. */
export function buildStatusUpdateMessage(pedido: Pedido): string {
  return [
    `Hola ${pedido.clienteNombre} 👋, te escribimos de ${NEGOCIO.nombre}.`,
    ``,
    `Tu pedido ${pedido.folio} cambió de estado a: *${ESTADO_LABEL[pedido.estado]}*.`,
    ESTADO_MENSAJE[pedido.estado],
    ``,
    `💰 Total: ${formatMXN(pedido.total)}`,
  ].join("\n");
}

interface QuoteMessageInput {
  clienteNombre: string;
  personas: number;
  paqueteNombre: string;
  estimado: number;
}

export function buildEventQuoteMessage({ clienteNombre, personas, paqueteNombre, estimado }: QuoteMessageInput): string {
  return [
    `Hola ${NEGOCIO.nombre}, quiero cotizar un evento 🎉`,
    ``,
    `👤 Nombre: ${clienteNombre}`,
    `👥 Número de personas: ${personas}`,
    `📦 Paquete recomendado: ${paqueteNombre}`,
    `💰 Estimado: ${formatMXN(estimado)}`,
    ``,
    `Me gustaría confirmar disponibilidad y datos de pago. ¡Gracias!`,
  ].join("\n");
}
