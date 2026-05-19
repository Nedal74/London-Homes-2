import React, { createContext, useContext } from 'react';
import { translations } from '../lib/translations';
import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../types';

interface LanguageContextValue {
  lang: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: typeof translations.ar;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { lang, toggleLanguage, isRTL } = useLanguage();
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
