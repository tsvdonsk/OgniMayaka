import { useState } from 'react'
import clsx from 'clsx'
import { useData } from '../../context/DataContext'
import type { Review } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import AuthModal from '../AuthModal'
import styles from './ReviewsSection.module.scss'

function Stars({ count, interactive, onSet }: { count: number; interactive?: boolean; onSet?: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          onClick={() => interactive && onSet?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          className={clsx(
            styles.star,
            interactive ? styles.starInteractive : styles.starDefault,
            n <= (hover || count) ? styles.starActive : styles.starInactive
          )}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewForm({ onSubmit }: { onSubmit: (r: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'approved'>) => void }) {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const { t } = useLanguage()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || rating === 0) return
    onSubmit({ rating, text: text.trim() })
    setDone(true)
  }

  if (done) return (
    <div className={styles.thankYou}>
      <p className={styles.thankYouEmoji}>🙏</p>
      <p className={styles.thankYouTitle}>Спасибо за отзыв!</p>
      <p className={styles.thankYouText}>Он появится на сайте после проверки администратором</p>
    </div>
  )

  return (
    <form onSubmit={submit} className={styles.reviewForm}>
      <div>
        <p className={styles.reviewLabel}>{t('reviews_ratingLabel')}</p>
        <Stars count={rating} interactive onSet={setRating} />
      </div>
      <div>
        <label className={styles.reviewLabel}>{t('reviews_textLabel')} *</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          placeholder={t('reviews_textPlaceholder')}
          className={styles.reviewTextarea}
        />
      </div>
      <button type="submit" disabled={!text.trim() || rating === 0} className={styles.reviewSubmit}>
        {t('reviews_submit')}
      </button>
    </form>
  )
}

const staticReviews = [
  { name: 'Юлия Федорова', text: 'Замечательная база отдыха! Дизайн необычный, номера тёплые, уютные. Беседки комфортные. Персонал приветливый!', rating: 5, date: '2025-08-10' },
  { name: 'Елена Корецкая', text: 'Отличная база! Чисто, очень красиво. Были первый раз — остались под впечатлением! Рекомендую!!!', rating: 5, date: '2025-09-22' },
  { name: 'Ольга М.', text: 'Невероятно красивая база! Тёплый, чистый бассейн. Вежливый персонал. Не пожалеете!', rating: 5, date: '2025-10-05' },
  { name: 'Валерия Б.', text: 'Классное место. Жили в люксе — свежий ремонт, своя терраса. Завтрак вкусный.', rating: 5, date: '2026-01-14' },
]

export default function ReviewsSection() {
  const { currentUser, reviews, setReviews, logout } = useData()
  const { t, lang } = useLanguage()
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [showForm, setShowForm] = useState(false)

  const approved = reviews.filter(r => r.approved)
  const allDisplayed = [
    ...staticReviews.map((r, i) => ({ ...r, id: `s${i}`, userId: '', userName: r.name, approved: true })),
    ...approved.map(r => ({ ...r, name: r.userName })),
  ]

  const hasUserReviewed = currentUser ? reviews.some(r => r.userId === currentUser.id) : false

  const submit = (data: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'approved'>) => {
    if (!currentUser) return
    const review: Review = { ...data, id: Date.now().toString(), userId: currentUser.id, userName: currentUser.name, date: new Date().toISOString().slice(0, 10), approved: false }
    setReviews([...reviews, review])
    setShowForm(false)
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div>
            <span className={styles.badge}>{t('reviews_badge')}</span>
            <h2 className={styles.heading}>{t('reviews_title')}</h2>
            <div className={styles.rating}>
              <span>★ 4.9 в Google</span>
              <span>★ 4.8 в 2ГИС</span>
            </div>
          </div>

          <div className={styles.authBlock}>
            {currentUser ? (
              <>
                <p className={styles.greeting}>
                  Привет, <strong className={styles.greetingName}>{currentUser.name}</strong> 👋
                </p>
                {!hasUserReviewed && !showForm && (
                  <button onClick={() => setShowForm(true)} className={styles.btnAccent}>
                    {t('reviews_leave')}
                  </button>
                )}
                {hasUserReviewed && <p className={styles.pending}>{t('reviews_pending')} ✓</p>}
                <button onClick={logout} className={styles.logoutBtn}>{t('header_signOut')}</button>
              </>
            ) : (
              <div className={styles.authBtns}>
                <button onClick={() => { setAuthMode('login'); setShowAuth(true) }} className={styles.btnOutline}>
                  {t('header_signIn')}
                </button>
                <button onClick={() => { setAuthMode('register'); setShowAuth(true) }} className={styles.btnAccent}>
                  {t('reviews_leave')}
                </button>
              </div>
            )}
          </div>
        </div>

        {showForm && currentUser && (
          <div className={styles.formWrap}>
            <div className={styles.formHeader}>
              <p className={styles.formTitle}>{t('reviews_textLabel')}</p>
              <button onClick={() => setShowForm(false)} className={styles.closeBtn}>×</button>
            </div>
            <ReviewForm onSubmit={submit} />
          </div>
        )}

        <div className={styles.grid}>
          {allDisplayed.map((review, i) => (
            <div key={review.id || i} className={styles.card}>
              <Stars count={review.rating} />
              <p className={styles.cardText}>«{review.text}»</p>
              <div className={styles.cardFooter}>
                <p className={styles.cardName}>{review.name}</p>
                <p className={styles.cardDate}>{new Date(review.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} initialMode={authMode} />}
    </section>
  )
}
