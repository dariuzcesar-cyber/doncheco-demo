export type CategoriaId =
  | "tablas"
  | "bebidas"
  | "combos"
  | "gourmet"
  | "eventos";

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaId;
  precio: number;
  descripcion: string;
  imagen: string;
  /** Ej. "4-5 personas" */
  porciones?: string;
  /** Texto tipo "Producto Estrella", "Ahorra $30" */
  destacado?: string;
  /** Badge de envío nacional para envasados */
  envioNacional?: boolean;
  /** Cantidad mínima de pedido (ej. vasitos de evento) */
  minimo?: number;
}

export interface QuesoOpcion {
  id: string;
  nombre: string;
}

export interface CharcuteriaOpcion {
  id: string;
  nombre: string;
}

export interface ExtraOpcion {
  id: string;
  nombre: string;
  precio: number;
}

export interface TablaPersonalizada {
  tamanoId: string;
  quesos: string[];
  charcuteria: string[];
  extras: string[];
}

export type EstadoPedido = "pendiente" | "preparacion" | "listo";

export interface ItemPedido {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  detalle?: string;
}

export interface Pedido {
  id: string;
  folio: string;
  fecha: string;
  clienteNombre: string;
  clienteTelefono?: string;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  origen: "carrito" | "compra-directa" | "cotizacion-evento" | "tabla-personalizada";
}

export type RolUsuario = "cliente" | "operador" | "admin";

export interface UsuarioCliente {
  rol: "cliente";
  nombre: string;
  email?: string;
  telefono?: string;
  avatar?: string;
  metodo: "google" | "whatsapp";
}

export interface UsuarioStaff {
  rol: "operador" | "admin";
  nombre: string;
  email?: string;
  telefono?: string;
}

export type Usuario = UsuarioCliente | UsuarioStaff;
