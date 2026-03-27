import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useData } from '../context/DataContext'
import type { NewsItem } from '../context/DataContext'

function NewsCard({ item, expanded, onToggle }: { item: NewsItem; expanded: boolean; onToggle: () => void }) {
  const { C } = useTheme()
  const paragraphs = item.content.split('\n').filter(Boolean)

  return (
    <article style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden', transition: 'border-color 0.3s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = C.borderAccent}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = C.border}
    >
      {/* Image (first media item) */}
      {item.media.length > 0 && item.media[0].type === 'image' && (
        <div style={{ height: 200, overflow: 'hidden' }}>
          <img src={item.media[0].url} alt={item.media[0].caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      )}
      {item.media.length > 0 && item.media[0].type === 'video' && (
        <div style={{ height: 200, overflow: 'hidden', background: C.surface2 }}>
          <video src={item.media[0].url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ padding: '22px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 22 }}>{item.emoji}</span>
            <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{item.title}</h3>
          </div>
        </div>
        <p style={{ color: C.ghost, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
          {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, overflow: 'hidden', maxHeight: expanded ? 'none' : '4.5em', transition: 'max-height 0.3s' }}>
          {paragraphs.map((p, i) => <p key={i} style={{ marginBottom: 10 }}>{p}</p>)}
        </div>

        {/* Extra media */}
        {expanded && item.media.length > 1 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
            {item.media.slice(1).map(m => (
              <div key={m.id} style={{ flex: '0 0 auto', width: 120, height: 80, borderRadius: 3, overflow: 'hidden' }}>
                {m.type === 'image'
                  ? <img src={m.url} alt={m.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <video src={m.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                }
              </div>
            ))}
          </div>
        )}

        <button onClick={onToggle} style={{ marginTop: 14, background: 'none', border: 'none', cursor: 'pointer', color: C.accent, fontSize: 13, fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
          {expanded ? 'Свернуть' : 'Читать далее'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default function NewsSection() {
  const { C } = useTheme()
  const { news } = useData()
  const [expanded, setExpanded] = useState<string | null>(null)

  const published = news.filter(n => n.published)
  if (published.length === 0) return null

  return (
    <section id="news" style={{ background: C.bg, padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ display: 'block', color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              Новости
            </span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 200, letterSpacing: '-0.02em', color: C.text }}>
              Жизнь на базе
            </h2>
          </div>
          <p style={{ color: C.ghost, fontSize: 13 }}>Последние события и истории</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {published.map(item => (
            <NewsCard
              key={item.id}
              item={item}
              expanded={expanded === item.id}
              onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
