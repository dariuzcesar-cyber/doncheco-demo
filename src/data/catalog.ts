import type {
  CategoriaId,
  CharcuteriaOpcion,
  ExtraOpcion,
  Producto,
  QuesoOpcion,
} from "./types";

export const NEGOCIO = {
  nombre: "Don Checo Delicatessen",
  ciudad: "Colima, Col.",
  whatsapp: "523121076740",
  whatsappDisplay: "+52 312 107 6740",
  adminTelefono: "3121139761",
  instagram: "@doncheco.deli",
};

export const CATEGORIAS: { id: CategoriaId; nombre: string; imagen: string }[] = [
  { id: "tablas", nombre: "Tablas & Cajas", imagen: "/images/categorias/cat_tablas_quesos.jpeg" },
  { id: "bebidas", nombre: "Bebidas & Maridaje", imagen: "/images/categorias/cat_clericot_garrafa.jpeg" },
  { id: "combos", nombre: "Combos & Promos", imagen: "/images/categorias/cat_clericot_garrafa.jpeg" },
  { id: "gourmet", nombre: "Complementos Gourmet", imagen: "/images/categorias/cat_dips_jaleas.jpeg" },
  { id: "eventos", nombre: "Eventos & Banquetes", imagen: "/images/categorias/cat_eventos_bodas.jpeg" },
];

/** Subconjunto usado en la grilla de portada (evita repetir la imagen de combos). */
export const CATEGORIAS_DESTACADAS = CATEGORIAS.filter((c) => c.id !== "combos");

export const PRODUCTOS: Producto[] = [
  // Tablas & Cajas
  {
    id: "tabla-mini",
    nombre: "Tabla / Caja Mini",
    categoria: "tablas",
    precio: 150,
    descripcion: "~120g de quesos y charcutería selecta + frutos, ideal para consentirte a ti.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "1 persona",
  },
  {
    id: "tabla-chica",
    nombre: "Tabla / Caja Chica",
    categoria: "tablas",
    precio: 290,
    descripcion: "Selección de quesos, charcutería y frutos para compartir en pareja.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "2-3 personas",
  },
  {
    id: "tabla-corazon",
    nombre: "Tabla Corazón de Madera",
    categoria: "tablas",
    precio: 400,
    descripcion: "Presentación en corazón de madera, perfecta para regalo o aniversario.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "Regalo / Aniversario",
    destacado: "Ideal para regalo",
  },
  {
    id: "tabla-mediana",
    nombre: "Tabla Mediana",
    categoria: "tablas",
    precio: 425,
    descripcion: "Nuestra tabla más pedida: equilibrio perfecto de quesos, charcutería, dips y frutos.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "4-5 personas",
    destacado: "Producto Estrella",
  },
  {
    id: "tabla-amistad",
    nombre: "Tabla de la Amistad",
    categoria: "tablas",
    precio: 670,
    descripcion: "Para reunir a los tuyos: variedad generosa de quesos, charcutería y complementos.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "8 personas",
    destacado: "$83 MXN / persona",
  },
  {
    id: "tabla-grande",
    nombre: "Tabla Grande",
    categoria: "tablas",
    precio: 920,
    descripcion: "La opción para celebraciones grandes: máxima variedad de sabores y presentación.",
    imagen: "/images/categorias/cat_tablas_quesos.jpeg",
    porciones: "10-12 personas",
  },

  // Bebidas & Maridaje
  {
    id: "clericot-1l",
    nombre: "Cléricot de 1 Litro",
    categoria: "bebidas",
    precio: 180,
    descripcion: "Nuestro cléricot artesanal con fruta fresca de temporada, receta de la casa.",
    imagen: "/images/productos/prod_clericot_1l.jpeg",
    porciones: "Rinde 4 copas aprox.",
  },
  {
    id: "clericot-4l",
    nombre: "Garrafa de Cléricot 4 Litros",
    categoria: "bebidas",
    precio: 650,
    descripcion: "Garrafa grande de cléricot artesanal, perfecta para fiestas y reuniones.",
    imagen: "/images/categorias/cat_clericot_garrafa.jpeg",
    porciones: "Rinde 16 copas aprox.",
  },

  // Combos & Promos
  {
    id: "promo-mediana-clericot1l",
    nombre: "Promo Mediana + Cléricot 1L",
    categoria: "combos",
    precio: 575,
    descripcion: "Tabla Mediana (4-5 pers) + Cléricot de 1 Litro. El combo perfecto para una tarde entre amigos.",
    imagen: "/images/categorias/cat_clericot_garrafa.jpeg",
    porciones: "4-5 personas",
    destacado: "Ahorras $30 MXN",
  },
  {
    id: "promo-amistad-garrafa4l",
    nombre: "Promo Amistad + Garrafa Cléricot 4L",
    categoria: "combos",
    precio: 1285,
    descripcion: "Tabla de la Amistad (8 pers) + Garrafa de Cléricot 4L. Para que la reunión no falte de nada.",
    imagen: "/images/categorias/cat_clericot_garrafa.jpeg",
    porciones: "8 personas",
    destacado: "Ahorras $35 MXN",
  },
  {
    id: "promo-grande-garrafa4l",
    nombre: "Promo Grande + Garrafa Cléricot 4L",
    categoria: "combos",
    precio: 1495,
    descripcion: "Tabla Grande (10-12 pers) + Garrafa de Cléricot 4L. La opción estrella para celebraciones.",
    imagen: "/images/categorias/cat_clericot_garrafa.jpeg",
    porciones: "10-12 personas",
    destacado: "Ahorras $75 MXN",
  },

  // Complementos Gourmet — Dips
  {
    id: "dip-cebolla-caramelizada",
    nombre: "Dip de Cebolla Caramelizada",
    categoria: "gourmet",
    precio: 150,
    descripcion: "Dip artesanal envasado, cremoso y dulce, ideal para untar en tus tablas.",
    imagen: "/images/categorias/cat_dips_jaleas.jpeg",
    envioNacional: true,
  },
  {
    id: "dip-cilantro",
    nombre: "Dip de Cilantro",
    categoria: "gourmet",
    precio: 150,
    descripcion: "Dip fresco y herbal, envasado, perfecto para botanas y tablas.",
    imagen: "/images/categorias/cat_dips_jaleas.jpeg",
    envioNacional: true,
  },
  {
    id: "dip-alcachofa",
    nombre: "Dip de Alcachofa",
    categoria: "gourmet",
    precio: 150,
    descripcion: "Dip cremoso de alcachofa, envasado, un clásico gourmet irresistible.",
    imagen: "/images/categorias/cat_dips_jaleas.jpeg",
    envioNacional: true,
  },

  // Complementos Gourmet — Jaleas & Chutneys
  {
    id: "jalea-merlot",
    nombre: "Jalea de Merlot",
    categoria: "gourmet",
    precio: 160,
    descripcion: "Jalea artesanal a base de vino Merlot, el maridaje perfecto para quesos maduros.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "chutney-jalapeno",
    nombre: "Chutney de Jalapeño",
    categoria: "gourmet",
    precio: 160,
    descripcion: "Chutney con un toque picante, ideal para contrastar con quesos suaves.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "chutney-mango",
    nombre: "Chutney de Mango",
    categoria: "gourmet",
    precio: 160,
    descripcion: "Chutney dulce y tropical de mango, envasado artesanalmente.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },

  // Complementos Gourmet — Productos envasados
  {
    id: "pesto-genovese",
    nombre: "Pesto Genovese",
    categoria: "gourmet",
    precio: 140,
    descripcion: "Pesto artesanal de albahaca fresca, piñones y parmesano.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "mermelada-higo",
    nombre: "Mermelada de Higo",
    categoria: "gourmet",
    precio: 150,
    descripcion: "Mermelada artesanal de higo, clásico compañero de quesos añejos.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "cherries-gourmet",
    nombre: "Cherries Gourmet",
    categoria: "gourmet",
    precio: 160,
    descripcion: "Cherries en conserva gourmet, un toque elegante para cualquier tabla.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "parmesano-trozo",
    nombre: "Parmesano en Trozo",
    categoria: "gourmet",
    precio: 160,
    descripcion: "Queso parmesano añejado, en trozo, para rallar fresco en casa.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },
  {
    id: "mantequilla-ajo",
    nombre: "Mantequilla de Ajo",
    categoria: "gourmet",
    precio: 95,
    descripcion: "Mantequilla artesanal de ajo, perfecta para pan y carnes a la parrilla.",
    imagen: "/images/productos/prod_frascos_gourmet.jpeg",
    envioNacional: true,
  },

  // Eventos
  {
    id: "vasitos-evento",
    nombre: "Vasitos Individuales de Papel para Eventos",
    categoria: "eventos",
    precio: 95,
    descripcion: "Porción individual en vasito de papel, ideal para bodas y eventos. Pedido mínimo 15 piezas.",
    imagen: "/images/categorias/cat_vasitos_papel.jpeg",
    minimo: 15,
  },
];

export const PRODUCTOS_POR_ID = new Map(PRODUCTOS.map((p) => [p.id, p]));

// ---- Módulo "Diseña tu Tabla" ----

export const TAMANOS_TABLA = PRODUCTOS.filter((p) => p.categoria === "tablas");

export const QUESOS: QuesoOpcion[] = [
  { id: "manchego", nombre: "Manchego" },
  { id: "gouda-ahumado", nombre: "Gouda Ahumado" },
  { id: "brie", nombre: "Brie" },
  { id: "cabra", nombre: "Queso de Cabra" },
  { id: "provolone", nombre: "Provolone" },
  { id: "panela", nombre: "Panela" },
  { id: "oaxaca", nombre: "Oaxaca" },
];

export const CHARCUTERIA: CharcuteriaOpcion[] = [
  { id: "jamon-serrano", nombre: "Jamón Serrano" },
  { id: "salami", nombre: "Salami" },
  { id: "chorizo-espanol", nombre: "Chorizo Español" },
  { id: "prosciutto", nombre: "Prosciutto" },
  { id: "pepperoni-gourmet", nombre: "Pepperoni Gourmet" },
];

export const EXTRAS: ExtraOpcion[] = [
  { id: "nueces", nombre: "Nueces Garapiñadas", precio: 40 },
  { id: "miel", nombre: "Miel de Abeja", precio: 35 },
  { id: "uvas", nombre: "Uvas Frescas", precio: 30 },
  { id: "frutos-secos", nombre: "Mix de Frutos Secos", precio: 45 },
  { id: "mermelada-extra", nombre: "Mermelada de Higo", precio: 50 },
];

// ---- Módulo Cotizador de Eventos ----

export interface PaqueteEvento {
  producto: Producto;
  minPersonas: number;
  maxPersonas: number;
}

export const PAQUETES_EVENTO: PaqueteEvento[] = [
  { producto: PRODUCTOS_POR_ID.get("tabla-chica")!, minPersonas: 1, maxPersonas: 3 },
  { producto: PRODUCTOS_POR_ID.get("tabla-mediana")!, minPersonas: 4, maxPersonas: 5 },
  { producto: PRODUCTOS_POR_ID.get("tabla-amistad")!, minPersonas: 6, maxPersonas: 8 },
  { producto: PRODUCTOS_POR_ID.get("tabla-grande")!, minPersonas: 9, maxPersonas: 12 },
];
