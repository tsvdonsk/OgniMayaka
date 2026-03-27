import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

// Legacy Colors type for Admin pages (not yet migrated)
export type Colors = {
  bg: string; bgAlt: string; surface: string; surface2: string
  text: string; text2: string; muted: string; faint: string
  ghost: string; ghost2: string; border: string; borderSoft: string
  borderAccent: string; headerBg: string; accent: string; accentLight: string
  accentBg: string; accentBg2: string; isDark: boolean
}

const dark: Colors = {
  bg: '#080806', bgAlt: '#050504', surface: '#0c0b09', surface2: '#100d08',
  text: '#e8e0d4', text2: '#c8bfaf', muted: '#8a8070', faint: '#6a6058',
  ghost: '#4a4038', ghost2: '#3a3028',
  border: 'rgba(42,36,32,0.55)', borderSoft: 'rgba(42,36,32,0.3)',
  borderAccent: 'rgba(212,136,26,0.2)', headerBg: 'rgba(8,8,6,0.96)',
  accent: '#d4881a', accentLight: '#f0a832',
  accentBg: 'rgba(212,136,26,0.07)', accentBg2: 'rgba(212,136,26,0.13)',
  isDark: true,
}

const light: Colors = {
  bg: '#f7f2e9', bgAlt: '#ede8de', surface: '#ffffff', surface2: '#faf7f2',
  text: '#1a1208', text2: '#3a2e1e', muted: '#7a6a58', faint: '#9a8a78',
  ghost: '#b8a898', ghost2: '#d0c4b8',
  border: 'rgba(100,80,60,0.22)', borderSoft: 'rgba(100,80,60,0.12)',
  borderAccent: 'rgba(180,110,10,0.3)', headerBg: 'rgba(247,242,233,0.96)',
  accent: '#b8720e', accentLight: '#d4881a',
  accentBg: 'rgba(180,114,14,0.08)', accentBg2: 'rgba(180,114,14,0.14)',
  isDark: false,
}

type ThemeCtx = {
  theme: Theme
  isDark: boolean
  toggle: () => void
  /** @deprecated Use CSS custom properties instead. Kept for Admin pages. */
  C: Colors
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  isDark: true,
  toggle: () => {},
  C: dark,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('om_theme') as Theme) || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('om_theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const C = theme === 'dark' ? dark : light

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggle, C }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
