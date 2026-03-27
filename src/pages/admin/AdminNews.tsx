import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { NewsItem, MediaItem } from '../../context/DataContext'

const emptyNews = (): NewsItem => ({ id: Date.now().toString(), title: '', content: '', date: new Date().toISOString().slice(0, 10), emoji: '📰', published: false, media: [] })

function MediaEditor({ media, onChange }: { media: MediaItem[]; onChange: (m: MediaItem[]) => void }) {
  const { C } = useTheme()
  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [type, setType] = useState<'image' | 'video'>('image')

  const add = () => {
    if (!url.trim()) return
    onChange([...media, { id: Date.now().toString(), type, url: url.trim(), caption: caption.trim() }])
    setUrl(''); setCaption('')
  }

  return (
    <div>
      <p style={{ color: C.faint, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Фото / Видео</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <select value={type} onChange={e => setType(e.target.value as 'image' | 'video')}
          style={{ padding: '8px 10px', background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text2, fontSize: 13 }}>
          <option value="image">Изображение</option>
          <option value="video">Видео</option>
        </select>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL файла" style={{ flex: 1, minWidth: 200, padding: '8px 10px', background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, fontSize: 13 }} />
        <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Подпись (необязательно)" style={{ width: 160, padding: '8px 10px', background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, fontSize: 13 }} />
        <button onClick={add} style={{ padding: '8px 16px', background: C.accentBg2, border: `1px solid ${C.borderAccent}`, borderRadius: 4, color: C.accent, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>+ Добавить</button>
      </div>
      {media.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {media.map(m => (
            <div key={m.id} style={{ position: 'relative', width: 110, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
              {m.type === 'image' ? <img src={m.url} alt="" style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }} /> : <video src={m.url} style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }} />}
              <div style={{ padding: '4px 8px 6px', background: C.surface2 }}>
                <p style={{ color: C.ghost, fontSize: 10, marginBottom: 2 }}>{m.type === 'video' ? '🎬 Видео' : '🖼 Фото'}</p>
                {m.caption && <p style={{ color: C.faint, fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.caption}</p>}
              </div>
              <button onClick={() => onChange(media.filter(x => x.id !== m.id))}
                style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: 3, color: '#fff', fontSize: 12, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const EMOJI_LIST = [
  '📰','📢','📣','🔔','ℹ️','⭐','🌟','✨','💫','🎉',
  '🎊','🎁','🏆','🥇','🎵','🎶','🎭','🎿','⛷️','🏊',
  '🌊','🏖️','🌅','🌄','🏔️','🌲','🌿','🍃','🌸','🌺',
  '🌻','🌞','⛅','❄️','🔥','🍽️','🍷','🍵','☕','🛁',
  '🛌','🏡','🚀','🌈','🌙','🧖','🧘','💆','⚡','🦋',
]

function NewsForm({ item, onSave, onCancel }: { item: NewsItem; onSave: (n: NewsItem) => void; onCancel: () => void }) {
  const { C } = useTheme()
  const [form, setForm] = useState<NewsItem>(item)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const set = (k: keyof NewsItem, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const inp = { background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 10 }}>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Эмодзи</label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(p => !p)}
              style={{ ...inp, padding: '7px 0', fontSize: 24, textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {form.emoji}
            </button>
            {showEmojiPicker && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 200,
                background: C.isDark ? 'rgba(12,11,9,0.98)' : 'rgba(255,253,248,0.98)',
                border: `1px solid ${C.border}`, borderRadius: 8,
                padding: 10, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)', width: 310,
              }}>
                {EMOJI_LIST.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => { set('emoji', e); setShowEmojiPicker(false) }}
                    style={{
                      background: form.emoji === e ? C.accentBg2 : 'transparent',
                      border: 'none', borderRadius: 4, fontSize: 20,
                      cursor: 'pointer', padding: '4px 2px', lineHeight: 1.3,
                      transition: 'background 0.1s',
                    }}
                    title={e}
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Заголовок *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Заголовок новости" style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Дата</label>
          <input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inp} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Текст новости *</label>
        <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={8} placeholder="Текст новости. Разделяйте абзацы пустой строкой." style={{ ...inp, resize: 'vertical' }} />
      </div>

      <MediaEditor media={form.media} onChange={m => set('media', m)} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
          <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} style={{ width: 16, height: 16, accentColor: C.accent }} />
          <span style={{ color: C.text2, fontSize: 14 }}>Опубликовано (видно на сайте)</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8, borderTop: `1px solid ${C.borderSoft}` }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, fontSize: 13, cursor: 'pointer' }}>Отмена</button>
        <button onClick={() => form.title && onSave(form)} style={{ padding: '10px 24px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default function AdminNews() {
  const { C } = useTheme()
  const { news, setNews } = useData()
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [isNew, setIsNew] = useState(false)

  const save = (n: NewsItem) => {
    if (isNew) setNews([n, ...news])
    else setNews(news.map(x => x.id === n.id ? n : x))
    setEditing(null); setIsNew(false)
  }
  const remove = (id: string) => { if (confirm('Удалить новость?')) setNews(news.filter(x => x.id !== id)) }
  const togglePub = (id: string) => setNews(news.map(x => x.id === id ? { ...x, published: !x.published } : x))

  if (editing) return (
    <div>
      <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400, marginBottom: 28 }}>{isNew ? 'Новая новость' : 'Редактировать новость'}</h1>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '28px 32px' }}>
        <NewsForm item={editing} onSave={save} onCancel={() => { setEditing(null); setIsNew(false) }} />
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400 }}>Новости</h1>
        <button onClick={() => { setEditing(emptyNews()); setIsNew(true) }}
          style={{ padding: '10px 20px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em' }}>
          + Добавить новость
        </button>
      </div>

      {news.length === 0 && <p style={{ color: C.ghost, fontSize: 14 }}>Новостей пока нет.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {news.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>{item.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: C.text, fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{item.title || 'Без заголовка'}</p>
              <p style={{ color: C.ghost, fontSize: 12 }}>{new Date(item.date).toLocaleDateString('ru-RU')} · {item.media.length > 0 ? `${item.media.length} медиа` : 'без медиа'}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <button onClick={() => togglePub(item.id)} style={{ padding: '5px 12px', background: item.published ? C.accentBg2 : C.isDark ? 'rgba(42,36,32,0.3)' : 'rgba(100,80,60,0.07)', border: `1px solid ${item.published ? C.borderAccent : C.border}`, borderRadius: 20, color: item.published ? C.accent : C.ghost, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                {item.published ? '● Опубликовано' : '○ Черновик'}
              </button>
              <button onClick={() => setEditing(item)} style={{ padding: '7px 14px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, fontSize: 13, cursor: 'pointer' }}>
                Изменить
              </button>
              <button onClick={() => remove(item.id)} style={{ padding: '7px 12px', background: 'none', border: `1px solid rgba(200,60,60,0.3)`, borderRadius: 4, color: '#c84040', fontSize: 13, cursor: 'pointer' }}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
