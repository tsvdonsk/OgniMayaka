import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { Review } from '../../context/DataContext'

function Stars({ count }: { count: number }) {
  const { C } = useTheme()
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} style={{ color: n <= count ? C.accent : C.borderSoft, fontSize: 14 }}>★</span>
      ))}
    </div>
  )
}

export default function AdminReviews() {
  const { C } = useTheme()
  const { reviews, setReviews } = useData()

  const pending = reviews.filter(r => !r.approved)
  const approved = reviews.filter(r => r.approved)

  const approve = (id: string) => setReviews(reviews.map(r => r.id === id ? { ...r, approved: true } : r))
  const reject = (id: string) => setReviews(reviews.filter(r => r.id !== id))

  const ReviewCard = ({ review, isPending }: { review: Review; isPending: boolean }) => (
    <div style={{ background: C.surface, border: `1px solid ${isPending ? C.borderAccent : C.border}`, borderRadius: 6, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <p style={{ color: C.text, fontSize: 15, fontWeight: 600 }}>{review.userName}</p>
          <p style={{ color: C.ghost, fontSize: 12, marginTop: 2 }}>{review.date}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <Stars count={review.rating} />
          {isPending && (
            <span style={{ background: C.accentBg, border: `1px solid ${C.borderAccent}`, color: C.accent, fontSize: 11, padding: '2px 8px', borderRadius: 3, fontWeight: 700, letterSpacing: '0.08em' }}>
              НА МОДЕРАЦИИ
            </span>
          )}
          {!isPending && (
            <span style={{ background: 'rgba(40,120,60,0.12)', border: '1px solid rgba(40,180,80,0.3)', color: '#4caf70', fontSize: 11, padding: '2px 8px', borderRadius: 3, fontWeight: 700 }}>
              ОПУБЛИКОВАН
            </span>
          )}
        </div>
      </div>
      <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.65, fontStyle: 'italic' }}>«{review.text}»</p>
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        {isPending && (
          <button onClick={() => approve(review.id)}
            style={{ padding: '8px 18px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Опубликовать
          </button>
        )}
        <button onClick={() => reject(review.id)}
          style={{ padding: '8px 18px', background: 'none', border: '1px solid #e05050', borderRadius: 4, color: '#e05050', fontSize: 13, cursor: 'pointer' }}>
          {isPending ? 'Отклонить' : 'Удалить'}
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ color: C.text, fontSize: 26, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 6 }}>Отзывы</h1>
        <p style={{ color: C.faint, fontSize: 14 }}>Модерация отзывов пользователей</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
        {[
          { label: 'На модерации', count: pending.length, color: C.accent },
          { label: 'Опубликовано', count: approved.length, color: '#4caf70' },
          { label: 'Всего', count: reviews.length, color: C.muted },
        ].map(s => (
          <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 24px', minWidth: 140 }}>
            <p style={{ color: s.color, fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{s.count}</p>
            <p style={{ color: C.ghost, fontSize: 13 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: C.text2, fontSize: 16, fontWeight: 500, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ background: C.accentBg, border: `1px solid ${C.borderAccent}`, color: C.accent, padding: '2px 10px', borderRadius: 3, fontSize: 12 }}>{pending.length}</span>
            Ожидают проверки
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {pending.map(r => <ReviewCard key={r.id} review={r} isPending={true} />)}
          </div>
        </div>
      )}

      {pending.length === 0 && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '32px', textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: C.ghost, fontSize: 14 }}>Нет отзывов на модерации</p>
        </div>
      )}

      {/* Approved */}
      {approved.length > 0 && (
        <div>
          <h2 style={{ color: C.text2, fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Опубликованные</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {approved.map(r => <ReviewCard key={r.id} review={r} isPending={false} />)}
          </div>
        </div>
      )}
    </div>
  )
}
