import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import type { Lang } from '../../i18n'
import AuthModal from '../AuthModal'
import styles from './Header.module.scss'

const LOGO_URL = '/img/logo.webp'

function ThemeToggle() {
  const { theme, isDark, toggle } = useTheme()
  const { t } = useLanguage()
  return (
    <button
      onClick={toggle}
      title={isDark ? t('header_lightTheme') : t('header_darkTheme')}
      className={clsx(styles.themeToggle, !isDark && styles.themeToggleLight)}
    >
      <span className={styles.themeToggleKnob} style={{ left: isDark ? 2 : 20 }}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  )
}

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中' },
]

function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className={styles.langSwitcher}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={clsx(styles.langBtn, lang === l.code && styles.langBtnActive)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const location = useLocation()
  const { isDark } = useTheme()
  const { currentUser, logout } = useData()
  const { t } = useLanguage()

  const navLinks = [
    { label: t('nav_about'), href: '/' },
    {
      label: t('nav_rooms'),
      href: '/gostinichnye-nomera',
      children: [
        { label: t('nav_allRooms'), href: '/gostinichnye-nomera' },
        { label: t('nav_pool'), href: '/bassejn' },
        { label: t('nav_sauna'), href: '/sauna' },
      ],
    },
    {
      label: t('nav_services'),
      href: '/uslugi',
      children: [
        { label: t('nav_spaPool'), href: '/bassejn' },
        { label: t('nav_sauna'), href: '/sauna' },
        { label: t('nav_smallGazebos'), href: '/malye-besedki' },
        { label: t('nav_bigGazebos'), href: '/bolshie-besedki' },
        { label: t('nav_igluGazebos'), href: '/iglu-besedki-u-bassejna' },
        { label: t('nav_allServices'), href: '/uslugi' },
      ],
    },
    { label: t('nav_news'), href: '/novosti' },
    { label: t('nav_contacts'), href: '/kontakty' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location])

  const openLogin = () => { setAuthMode('login'); setShowAuth(true) }
  const openRegister = () => { setAuthMode('register'); setShowAuth(true) }

  const navVars = !scrolled ? {
    '--nav-color': 'rgba(255,255,255,0.92)',
    '--nav-border': 'rgba(255,255,255,0.22)',
  } as React.CSSProperties : {}

  return (
    <header className={clsx(styles.header, scrolled && styles.scrolled)}>
      <div className={styles.inner} style={navVars}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src={LOGO_URL}
            alt="Огни Маяка"
            className={styles.logo}
            style={{ filter: isDark ? 'brightness(1.1)' : 'brightness(0.85) sepia(0.2)' }}
          />
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map(link => (
            <div
              key={link.href}
              className={styles.navItem}
              onMouseEnter={() => link.children && setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={clsx(styles.navLink, location.pathname === link.href && styles.navLinkActive)}
              >
                {link.label}
                {link.children && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className={styles.dropdownArrow}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
              {link.children && openDropdown === link.href && (
                <div className={clsx(styles.dropdown, isDark ? styles.dropdownDark : styles.dropdownLight)}>
                  {link.children.map(child => (
                    <Link key={child.href} to={child.href} className={styles.dropdownLink}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.desktopRight}>
          <a href="tel:+79287733550" className={styles.phone}>
            {t('header_phone')}
          </a>
          <LangSwitcher />
          <ThemeToggle />

          {currentUser ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser.name}</span>
              <button onClick={logout} className={styles.btnOutline}>
                {t('header_signOut')}
              </button>
            </div>
          ) : (
            <div className={styles.authBtnGroup}>
              <button onClick={openLogin} className={styles.btnOutline}>
                {t('header_signIn')}
              </button>
              <button onClick={openRegister} className={styles.btnAccent}>
                {t('header_register')}
              </button>
            </div>
          )}

          <a
            href="https://xn----8sbajzomfh0p.xn--p1ai"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            {t('header_book')}
          </a>
        </div>

        <div className={styles.mobileRight}>
          <LangSwitcher />
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className={styles.burger}>
            <div className={styles.burgerInner}>
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={styles.burgerLine}
                  style={{
                    top: mobileOpen ? 7 : i * 7,
                    transform: mobileOpen
                      ? (i === 0 ? 'translateY(-50%) rotate(45deg)' : i === 2 ? 'translateY(-50%) rotate(-45deg)' : 'none')
                      : 'none',
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={clsx(styles.mobileMenu, isDark ? styles.mobileMenuDark : styles.mobileMenuLight)}>
          {navLinks.map(link => (
            <div key={link.href}>
              <Link
                to={link.href}
                className={clsx(styles.mobileNavLink, location.pathname === link.href && styles.mobileNavLinkActive)}
              >
                {link.label}
                {link.children && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
              {link.children?.map(child => (
                <Link key={child.href} to={child.href} className={styles.mobileChildLink}>
                  — {child.label}
                </Link>
              ))}
            </div>
          ))}

          <div className={styles.mobileActions}>
            {currentUser ? (
              <div className={styles.mobileUserRow}>
                <div>
                  <p className={styles.mobileUserLabel}>{t('header_loggedAs')}</p>
                  <p className={styles.mobileUserName}>{currentUser.name}</p>
                </div>
                <button onClick={logout} className={styles.mobileLogoutBtn}>
                  {t('header_signOut')}
                </button>
              </div>
            ) : (
              <div className={styles.mobileAuthRow}>
                <button onClick={() => { setMobileOpen(false); openLogin() }} className={styles.mobileAuthBtn}>
                  {t('header_signIn')}
                </button>
                <button onClick={() => { setMobileOpen(false); openRegister() }} className={styles.mobileAuthBtnAccent}>
                  {t('header_register')}
                </button>
              </div>
            )}

            <a href="tel:+79287733550" className={styles.mobileContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.1 2.18a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 6.83a16 16 0 006.26 6.26l1.21-1.21a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              +7 (928) 77-33-550
            </a>
            <a href="https://wa.me/79287733550" target="_blank" rel="noopener noreferrer" className={styles.mobileContactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://xn----8sbajzomfh0p.xn--p1ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileBookBtn}
            >
              {t('header_book')}
            </a>
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode={authMode} />}
    </header>
  )
}
