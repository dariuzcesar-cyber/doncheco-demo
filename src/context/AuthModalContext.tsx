"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface AuthModalContextValue {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openAuthModal = useCallback(() => setIsOpen(true), []);
  const closeAuthModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openAuthModal, closeAuthModal }), [isOpen, openAuthModal, closeAuthModal]);

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal debe usarse dentro de <AuthModalProvider>");
  return ctx;
}
