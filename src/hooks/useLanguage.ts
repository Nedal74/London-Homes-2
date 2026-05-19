import { useState, useCallback } from 'react';
import type { Language } from '../types';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('ar');

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const isRTL = lang === 'ar';

  return { lang, toggleLanguage, isRTL };
}
