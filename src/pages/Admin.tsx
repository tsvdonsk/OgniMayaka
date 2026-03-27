import { useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import AdminNews from './admin/AdminNews'
import AdminRooms from './admin/AdminRooms'
import AdminServices from './admin/AdminServices'
import AdminMedia from './admin/AdminMedia'
import AdminReviews from './admin/AdminReviews'

const ADMIN_PASSWORD = 'ogni2026'

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { C } = useTheme()
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin() }
    else { setError(true); setTimeout(() => setError(false), 1800) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, paddingTop: 72 }}>
      <div style={{ width: '100%', maxWidth: 380, padding: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 32 }}>🏮</span>
          <h2 style={{ color: C.text, fontSize: 22, fontWeight: 300, marginTop: 10, marginBottom: 4 }}>Админ-панель</h2>
          <p style={{ color: C.faint, fontSize: 13 }}>Огни Маяка</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Пароль</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Введите пароль"
              style={{ width: '100%', padding: '11px 14px', background: C.isDark ? 'rgba(42,36,32,0.3)' : 'rgba(100,80,60,0.06)', border: `1px solid ${error ? '#e05050' : C.border}`, borderRadius: 4, color: C.text, fontSize: 15, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
            />
          </div>
          {error && <p style={{ color: '#e05050', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Неверный пароль</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, color: '#080806', border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Войти
          </button>
        </form>
        <p style={{ color: C.ghost, fontSize: 11, textAlign: 'center', marginTop: 20 }}>Подсказка: ogni2026</p>
      </div>
    </div>
  )
}

function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const { C } = useTheme()
  const location = useLocation()

  const navItems = [
    { href: '/admin/news', label: 'Новости', icon: '📰' },
    { href: '/admin/rooms', label: 'Номера', icon: '🛏' },
    { href: '/admin/services', label: 'Услуги', icon: '⚙️' },
    { href: '/admin/media', label: 'Медиа / Фото', icon: '🖼' },
    { href: '/admin/reviews', label: 'Отзывы', icon: '⭐' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 72, background: C.bg }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: C.surface, borderRight: `1px solid ${C.border}`, padding: '32px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 20px 24px', borderBottom: `1px solid ${C.borderSoft}`, marginBottom: 8 }}>
          <p style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Управление сайтом</p>
        </div>
        <nav style={{ padding: '8px 0' }}>
          {navItems.map(item => (
            <Link key={item.href} to={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 20px',
              color: location.pathname === item.href ? C.accent : C.muted,
              textDecoration: 'none', fontSize: 14,
              background: location.pathname === item.href ? C.accentBg : 'transparent',
              borderLeft: location.pathname === item.href ? `2px solid ${C.accent}` : '2px solid transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (location.pathname !== item.href) { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.background = C.isDark ? 'rgba(42,36,32,0.2)' : 'rgba(100,80,60,0.05)' } }}
              onMouseLeave={e => { if (location.pathname !== item.href) { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.background = 'transparent' } }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', marginTop: 'auto', borderTop: `1px solid ${C.borderSoft}`, position: 'absolute', bottom: 0, width: 220, boxSizing: 'border-box' }}>
          <Link to="/" style={{ display: 'block', color: C.faint, textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>← На сайт</Link>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: C.ghost, fontSize: 13, cursor: 'pointer', padding: 0 }}>Выйти</button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', minHeight: 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/news" replace />} />
          <Route path="/news" element={<AdminNews />} />
          <Route path="/rooms" element={<AdminRooms />} />
          <Route path="/services" element={<AdminServices />} />
          <Route path="/media" element={<AdminMedia />} />
          <Route path="/reviews" element={<AdminReviews />} />
        </Routes>
      </main>
    </div>
  )
}

export default function Admin() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('om_admin') === '1')
  const login = () => { sessionStorage.setItem('om_admin', '1'); setAuth(true) }
  const logout = () => { sessionStorage.removeItem('om_admin'); setAuth(false) }
  if (!auth) return <LoginScreen onLogin={login} />
  return <AdminLayout onLogout={logout} />
}
