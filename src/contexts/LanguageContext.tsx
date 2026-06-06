// src/contexts/LanguageContext.tsx
//import { createContext, useContext, useState, useEffect, ReactNode } from "react";
//  La solution : on sépare le code (en haut) et le type (juste en dessous)
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "fr" | "en";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  // Charge la langue sauvegardée au montage
  //  Version sécurisée pour TanStack Start / SSR en vérifiant qu'on est dans le navigateur
useEffect(() => {
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang === "fr" || savedLang === "en") {
      setLang(savedLang);
    }
  }
}, []);

  // Sauvegarde la langue dans localStorage
  useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang);
  }
}, [lang]);

  const toggleLang = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}