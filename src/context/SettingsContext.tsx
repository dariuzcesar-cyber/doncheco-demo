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

const STORAGE_KEY = "doncheco:settings:v1";

interface Settings {
  operadorEmail: string;
  operadorPassword: string;
  adminPassword: string;
}

const DEFAULT_SETTINGS: Settings = {
  operadorEmail: "dariuzcesar@gmail.com",
  operadorPassword: "",
  adminPassword: "",
};

interface SettingsContextValue {
  settings: Settings;
  hydrated: boolean;
  setOperadorEmail: (email: string) => void;
  setOperadorPassword: (password: string) => void;
  setAdminPassword: (password: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      /* localStorage no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* sin persistencia */
    }
  }, [hydrated, settings]);

  const setOperadorEmail = useCallback((email: string) => {
    setSettings((prev) => ({ ...prev, operadorEmail: email.trim().toLowerCase() }));
  }, []);

  const setOperadorPassword = useCallback((password: string) => {
    setSettings((prev) => ({ ...prev, operadorPassword: password }));
  }, []);

  const setAdminPassword = useCallback((password: string) => {
    setSettings((prev) => ({ ...prev, adminPassword: password }));
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, hydrated, setOperadorEmail, setOperadorPassword, setAdminPassword }),
    [settings, hydrated, setOperadorEmail, setOperadorPassword, setAdminPassword],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings debe usarse dentro de <SettingsProvider>");
  return ctx;
}
