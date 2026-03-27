import { useState } from 'react'
import { useData } from '../../context/DataContext'
import styles from './AuthModal.module.scss'

type Mode = 'login' | 'register'

interface Props {
  onClose: () => void
  initialMode?: Mode
}

export default function AuthModal({ onClose, initialMode = 'login' }: Props) {
  const { login, register } = useData()
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'register') {
      if (!name.trim()) { setError('Введите имя'); return }
      if (!email.includes('@')) { setError('Некорректный email'); return }
      if (password.length < 6) { setError('Пароль минимум 6 символов'); return }
      const ok = register(name.trim(), email.trim(), password)
      if (!ok) { setError('Email уже зарегистрирован'); return }
      setSuccess(true)
      setTimeout(onClose, 1500)
    } else {
      const ok = login(email.trim(), password)
      if (!ok) { setError('Неверный email или пароль'); return }
      onClose()
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        {success ? (
          <div className={styles.success}>
            <p className={styles.successEmoji}>✅</p>
            <p className={styles.successTitle}>Добро пожаловать!</p>
            <p className={styles.successText}>Вы успешно зарегистрировались</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} className={styles.closeBtn}>×</button>
            <div className={styles.header}>
              <h2 className={styles.title}>{mode === 'login' ? 'Войти' : 'Регистрация'}</h2>
              <p className={styles.subtitle}>
                {mode === 'login' ? 'Войдите, чтобы оставить отзыв' : 'Создайте аккаунт, это займёт минуту'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === 'register' && (
                <div>
                  <label className={styles.label}>Имя</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" className={styles.input} />
                </div>
              )}
              <div>
                <label className={styles.label}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className={styles.input} />
              </div>
              <div>
                <label className={styles.label}>Пароль</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'register' ? 'Минимум 6 символов' : 'Ваш пароль'} className={styles.input} />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.submitBtn}>
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
            <p className={styles.switchText}>
              {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
                className={styles.switchBtn}
              >
                {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
