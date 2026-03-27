import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { RoomItem } from '../../context/DataContext'

function RoomForm({ item, onSave, onCancel }: { item: RoomItem; onSave: (r: RoomItem) => void; onCancel: () => void }) {
  const { C } = useTheme()
  const [form, setForm] = useState<RoomItem>(item)
  const [featStr, setFeatStr] = useState(item.features.join(', '))
  const set = (k: keyof RoomItem, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const inp = { background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, padding: '9px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  const handleSave = () => {
    const features = featStr.split(',').map(s => s.trim()).filter(Boolean)
    onSave({ ...form, features })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { k: 'name', l: 'Название *' },
          { k: 'category', l: 'Категория' },
          { k: 'area', l: 'Площадь' },
          { k: 'capacity', l: 'Вместимость' },
          { k: 'bed', l: 'Тип кровати' },
          { k: 'floor', l: 'Этаж / корпус' },
        ].map(({ k, l }) => (
          <div key={k}>
            <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{l}</label>
            <input value={(form as Record<string, unknown>)[k] as string} onChange={e => set(k as keyof RoomItem, e.target.value)} style={inp} />
          </div>
        ))}
      </div>
      <div>
        <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Описание *</label>
        <textarea value={form.desc} onChange={e => set('desc', e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} />
      </div>
      <div>
        <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>URL фото</label>
        <input value={form.img} onChange={e => set('img', e.target.value)} placeholder="https://..." style={inp} />
        {form.img && <img src={form.img} alt="" style={{ marginTop: 8, height: 80, borderRadius: 4, objectFit: 'cover' }} />}
      </div>
      <div>
        <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Удобства (через запятую)</label>
        <input value={featStr} onChange={e => setFeatStr(e.target.value)} placeholder="Wi-Fi, ТВ, Сплит-система..." style={inp} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!form.highlight} onChange={e => set('highlight', e.target.checked)} style={{ width: 16, height: 16, accentColor: C.accent }} />
          <span style={{ color: C.text2, fontSize: 14 }}>Выделить как «ТОП»</span>
        </label>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8, borderTop: `1px solid ${C.borderSoft}` }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, fontSize: 13, cursor: 'pointer' }}>Отмена</button>
        <button onClick={handleSave} style={{ padding: '10px 24px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default function AdminRooms() {
  const { C } = useTheme()
  const { rooms, setRooms } = useData()
  const [editing, setEditing] = useState<RoomItem | null>(null)

  const save = (r: RoomItem) => { setRooms(rooms.map(x => x.id === r.id ? r : x)); setEditing(null) }
  const reset = () => { if (confirm('Сбросить все номера к стандартным значениям?')) { localStorage.removeItem('om_rooms'); location.reload() } }

  if (editing) return (
    <div>
      <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400, marginBottom: 28 }}>Редактировать номер: {editing.name}</h1>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '28px 32px' }}>
        <RoomForm item={editing} onSave={save} onCancel={() => setEditing(null)} />
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400 }}>Номера</h1>
          <p style={{ color: C.ghost, fontSize: 13, marginTop: 4 }}>Редактирование описаний, параметров и фото номеров</p>
        </div>
        <button onClick={reset} style={{ padding: '8px 16px', background: 'none', border: `1px solid rgba(200,60,60,0.3)`, borderRadius: 4, color: '#c84040', fontSize: 12, cursor: 'pointer' }}>
          Сбросить к умолчанию
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rooms.map(room => (
          <div key={room.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={room.img} alt="" style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{room.name}</p>
                {room.highlight && <span style={{ background: C.accentBg2, border: `1px solid ${C.borderAccent}`, color: C.accent, padding: '1px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>ТОП</span>}
                <span style={{ background: C.isDark ? 'rgba(42,36,32,0.4)' : 'rgba(100,80,60,0.08)', color: C.ghost, padding: '1px 8px', borderRadius: 20, fontSize: 10 }}>{room.category}</span>
              </div>
              <p style={{ color: C.faint, fontSize: 13 }}>{room.area} · {room.capacity} · {room.floor}</p>
            </div>
            <button onClick={() => setEditing(room)} style={{ padding: '8px 16px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
              Изменить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
