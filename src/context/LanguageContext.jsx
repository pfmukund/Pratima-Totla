import { createContext, useContext, useEffect, useState } from 'react';

const STRINGS = {
  en: {
    'hero.tagline': 'Leadership with Purpose. Empowerment through Action.',
    'hero.eyebrow': 'The Official Portfolio',
    'manifesto.title': 'Seven pillars for a New India.',
    'manifesto.subtitle': 'My Dream of a New India',
    'manifesto.subtitle.script': 'मेरा नए भारत का सपना',
    'cta.enter': 'Enter the Portfolio',
    'cta.read': 'Read Her Story',
    'cta.connect': 'Visit The Office',
    'press.eyebrow': 'As Featured On',
    'lang.toggle': 'हिं',
    'lang.label': 'Hindi',
  },
  hi: {
    'hero.tagline': 'उद्देश्य के साथ नेतृत्व। कार्य के माध्यम से सशक्तिकरण।',
    'hero.eyebrow': 'आधिकारिक पोर्टफोलियो',
    'manifesto.title': 'नए भारत के सात स्तंभ।',
    'manifesto.subtitle': 'मेरा नए भारत का सपना',
    'manifesto.subtitle.script': 'My Dream of a New India',
    'cta.enter': 'पोर्टफोलियो में प्रवेश करें',
    'cta.read': 'उनकी कहानी पढ़ें',
    'cta.connect': 'कार्यालय जाएँ',
    'press.eyebrow': 'जैसा कि देखा गया',
    'lang.toggle': 'EN',
    'lang.label': 'English',
  },
};

const Ctx = createContext({ lang: 'en', t: (k) => k, toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('pt:lang') || 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pt:lang', lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  const t = (k) => (STRINGS[lang] && STRINGS[lang][k]) || STRINGS.en[k] || k;
  const toggle = () => setLang((l) => (l === 'en' ? 'hi' : 'en'));
  return <Ctx.Provider value={{ lang, t, toggle }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
