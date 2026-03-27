import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'
import type { Lang, TranslationKey } from './translations'

function detectLang(): Lang {
  const saved = localStorage.getItem('om_lang') as Lang | null
  if (saved && ['ru', 'en', 'zh'].includes(saved)) return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('ru')) return 'ru'
  return 'en'
}

type LangCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LangCtx>({} as LangCtx)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('om_lang', l)
  }, [])

  const t = useCallback((key: TranslationKey): string => {
    return translations[lang][key] ?? translations.ru[key] ?? key
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
