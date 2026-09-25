export function formatMXN(valor: number): string {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export function formatFolio(fecha: Date): string {
  const y = fecha.getFullYear().toString().slice(-2);
  const m = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const d = fecha.getDate().toString().padStart(2, "0");
  const rand = Math.floor(Math.random() * 900 + 100);
  return `DC-${y}${m}${d}-${rand}`;
}
