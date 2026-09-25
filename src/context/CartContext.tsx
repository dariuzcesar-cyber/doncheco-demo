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

const STORAGE_KEY = "doncheco:carrito:v1";
const MAX_CANTIDAD = 99;

export interface CartLine {
  /** id del producto de catálogo, o un id generado para líneas personalizadas */
  id: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  detalle?: string;
  imagen?: string;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  addItem: (line: Omit<CartLine, "cantidad">, cantidad?: number) => void;
  updateQty: (id: string, cantidad: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function clamp(cantidad: number, min = 1): number {
  return Math.min(MAX_CANTIDAD, Math.max(min, Math.round(cantidad)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* localStorage no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* sin persistencia */
    }
  }, [hydrated, lines]);

  const addItem = useCallback((line: Omit<CartLine, "cantidad">, cantidad = 1) => {
    setLines((prev) => {
      const existente = prev.find((l) => l.id === line.id);
      if (existente) {
        return prev.map((l) =>
          l.id === line.id ? { ...l, cantidad: clamp(l.cantidad + cantidad) } : l,
        );
      }
      return [...prev, { ...line, cantidad: clamp(cantidad) }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id: string, cantidad: number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, cantidad: clamp(cantidad) } : l)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = useMemo(
    () => lines.reduce((suma, l) => suma + l.precioUnitario * l.cantidad, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((n, l) => n + l.cantidad, 0),
      total,
      isOpen,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [lines, total, isOpen, addItem, updateQty, removeItem, clearCart, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
