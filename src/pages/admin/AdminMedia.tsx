import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { MediaItem } from '../../context/DataContext'

export default function AdminMedia() {
  const { C } = useTheme()
  const { siteMedia, setSiteMedia } = useData()
  const [heroImage, setHeroImage] = useState(siteMedia.heroImage)
  const [heroVideo, setHeroVideo] = useState(siteMedia.heroVideo)
  const [saved, setSaved] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [newType, setNewType] = useState<'image' | 'video'>('image')

  const inp = { background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, padding: '9px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }

  const saveHero = () => {
    setSiteMedia({ ...siteMedia, heroImage, heroVideo })
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const addGallery = () => {
    if (!newUrl.trim()) return
    const item: MediaItem = { id: Date.now().toString(), type: newType, url: newUrl.trim(), caption: newCaption.trim() }
    setSiteMedia({ ...siteMedia, galleryImages: [...siteMedia.galleryImages, item] })
    setNewUrl(''); setNewCaption('')
  }

  const removeGallery = (id: string) => setSiteMedia({ ...siteMedia, galleryImages: siteMedia.galleryImages.filter(x => x.id !== id) })

  const moveGallery = (id: string, dir: -1 | 1) => {
    const arr = [...siteMedia.galleryImages]
    const i = arr.findIndex(x => x.id === id)
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    setSiteMedia({ ...siteMedia, galleryImages: arr })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Hero */}
      <div>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Главный экран (Hero)</h1>
        <p style={{ color: C.ghost, fontSize: 13, marginBottom: 20 }}>Фото или видео на фоне первого экрана главной страницы. Если указано видео — оно приоритетнее фото.</p>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Фоновое фото (URL)</label>
            <input value={heroImage} onChange={e => setHeroImage(e.target.value)} placeholder="https://..." style={{ ...inp, width: '100%' }} />
            {heroImage && <img src={heroImage} alt="" style={{ marginTop: 10, height: 100, borderRadius: 4, objectFit: 'cover', maxWidth: 300 }} />}
          </div>
          <div>
            <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Фоновое видео (URL, приоритет)</label>
            <input value={heroVideo} onChange={e => setHeroVideo(e.target.value)} placeholder="https://... (mp4, webm)" style={{ ...inp, width: '100%' }} />
            {heroVideo && (
              <video src={heroVideo} muted autoPlay loop style={{ marginTop: 10, height: 100, borderRadius: 4, objectFit: 'cover', maxWidth: 300 }} />
            )}
            {heroVideo && (
              <button onClick={() => setHeroVideo('')} style={{ display: 'block', marginTop: 6, background: 'none', border: 'none', color: '#c84040', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                Удалить видео (использовать фото)
              </button>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={saveHero} style={{ padding: '10px 24px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {saved ? '✓ Сохранено' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h2 style={{ color: C.text, fontSize: 20, fontWeight: 400, marginBottom: 6 }}>Галерея на главной</h2>
        <p style={{ color: C.ghost, fontSize: 13, marginBottom: 20 }}>Горизонтальная полоса фото/видео под секцией «Проживание»</p>

        {/* Add */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, fontWeight: 500 }}>+ Добавить медиа</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <select value={newType} onChange={e => setNewType(e.target.value as 'image' | 'video')}
              style={{ ...inp, padding: '9px 10px' }}>
              <option value="image">Изображение</option>
              <option value="video">Видео</option>
            </select>
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="URL файла" style={{ ...inp, flex: 1, minWidth: 200 }} />
            <input value={newCaption} onChange={e => setNewCaption(e.target.value)} placeholder="Подпись (необязательно)" style={{ ...inp, width: 180 }} />
            <button onClick={addGallery} style={{ padding: '9px 18px', background: C.accentBg2, border: `1px solid ${C.borderAccent}`, borderRadius: 4, color: C.accent, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
              Добавить
            </button>
          </div>
        </div>

        {siteMedia.galleryImages.length === 0 && <p style={{ color: C.ghost, fontSize: 14 }}>Галерея пуста.</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {siteMedia.galleryImages.map((item, i) => (
            <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
              {item.type === 'image'
                ? <img src={item.url} alt={item.caption} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                : <video src={item.url} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} muted />
              }
              <div style={{ padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <p style={{ color: C.ghost, fontSize: 10 }}>{item.type === 'video' ? '🎬' : '🖼'} {item.type}</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => moveGallery(item.id, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', color: i === 0 ? C.ghost2 : C.muted, cursor: i === 0 ? 'default' : 'pointer', fontSize: 14, padding: '0 2px' }}>←</button>
                    <button onClick={() => moveGallery(item.id, 1)} disabled={i === siteMedia.galleryImages.length - 1} style={{ background: 'none', border: 'none', color: i === siteMedia.galleryImages.length - 1 ? C.ghost2 : C.muted, cursor: i === siteMedia.galleryImages.length - 1 ? 'default' : 'pointer', fontSize: 14, padding: '0 2px' }}>→</button>
                  </div>
                </div>
                {item.caption && <p style={{ color: C.faint, fontSize: 12, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.caption}</p>}
                <button onClick={() => removeGallery(item.id)} style={{ width: '100%', padding: '5px', background: 'none', border: `1px solid rgba(200,60,60,0.3)`, borderRadius: 3, color: '#c84040', fontSize: 11, cursor: 'pointer' }}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
