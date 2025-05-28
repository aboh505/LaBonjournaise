"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const defaultLang = typeof window !== "undefined" && localStorage.getItem("lang") ? localStorage.getItem("lang") : "fr";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const value = { lang, setLang };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
