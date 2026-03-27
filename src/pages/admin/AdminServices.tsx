import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { ServiceItem } from '../../context/DataContext'

export default function AdminServices() {
  const { C } = useTheme()
  const { freeServices, setFreeServices, paidServices, setPaidServices } = useData()
  const [freeText, setFreeText] = useState(freeServices.join('\n'))
  const [freeSaved, setFreeSaved] = useState(false)
  const [editPaid, setEditPaid] = useState<ServiceItem | null>(null)
  const [newPaid, setNewPaid] = useState({ name: '', price: '' })

  const saveFree = () => {
    setFreeServices(freeText.split('\n').map(s => s.trim()).filter(Boolean))
    setFreeSaved(true)
    setTimeout(() => setFreeSaved(false), 2000)
  }

  const savePaid = (item: ServiceItem) => {
    setPaidServices(paidServices.map(x => x.id === item.id ? item : x))
    setEditPaid(null)
  }

  const removePaid = (id: string) => { if (confirm('Удалить услугу?')) setPaidServices(paidServices.filter(x => x.id !== id)) }

  const addPaid = () => {
    if (!newPaid.name.trim()) return
    setPaidServices([...paidServices, { id: Date.now().toString(), name: newPaid.name.trim(), price: newPaid.price.trim() }])
    setNewPaid({ name: '', price: '' })
  }

  const inp = (small = false) => ({ background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, padding: small ? '7px 10px' : '9px 12px', fontSize: small ? 13 : 14, outline: 'none', boxSizing: 'border-box' as const })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Free services */}
      <div>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400, marginBottom: 6 }}>Бесплатные услуги</h1>
        <p style={{ color: C.ghost, fontSize: 13, marginBottom: 20 }}>Одна услуга — одна строка</p>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '24px 28px' }}>
          <textarea value={freeText} onChange={e => setFreeText(e.target.value)} rows={18}
            style={{ ...inp(), width: '100%', resize: 'vertical', lineHeight: 1.8, fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <button onClick={saveFree} style={{ padding: '10px 24px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {freeSaved ? '✓ Сохранено' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>

      {/* Paid services */}
      <div>
        <h2 style={{ color: C.text, fontSize: 20, fontWeight: 400, marginBottom: 6 }}>Платные услуги</h2>
        <p style={{ color: C.ghost, fontSize: 13, marginBottom: 20 }}>Управление прайс-листом</p>

        {/* Add new */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '20px 24px', marginBottom: 16 }}>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, fontWeight: 500 }}>+ Добавить услугу</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={newPaid.name} onChange={e => setNewPaid(s => ({ ...s, name: e.target.value }))} placeholder="Название услуги" style={{ ...inp(true), flex: 1 }} />
            <input value={newPaid.price} onChange={e => setNewPaid(s => ({ ...s, price: e.target.value }))} placeholder="Цена (напр. 500 ₽/час)" style={{ ...inp(true), width: 160 }} />
            <button onClick={addPaid} style={{ padding: '7px 16px', background: C.accentBg2, border: `1px solid ${C.borderAccent}`, borderRadius: 4, color: C.accent, fontSize: 13, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>
              Добавить
            </button>
          </div>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          {paidServices.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: i < paidServices.length - 1 ? `1px solid ${C.borderSoft}` : 'none', background: i % 2 === 0 ? 'transparent' : (C.isDark ? 'rgba(42,36,32,0.1)' : 'rgba(100,80,60,0.03)') }}>
              {editPaid?.id === item.id ? (
                <>
                  <input value={editPaid.name} onChange={e => setEditPaid(s => s ? { ...s, name: e.target.value } : s)} style={{ ...inp(true), flex: 1 }} />
                  <input value={editPaid.price} onChange={e => setEditPaid(s => s ? { ...s, price: e.target.value } : s)} style={{ ...inp(true), width: 150 }} />
                  <button onClick={() => savePaid(editPaid)} style={{ padding: '5px 12px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 3, color: '#080806', fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>✓</button>
                  <button onClick={() => setEditPaid(null)} style={{ padding: '5px 10px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 12, cursor: 'pointer' }}>✗</button>
                </>
              ) : (
                <>
                  <span style={{ color: C.muted, fontSize: 14, flex: 1 }}>{item.name}</span>
                  <span style={{ color: C.accent, fontSize: 14, fontWeight: 500, minWidth: 120 }}>{item.price}</span>
                  <button onClick={() => setEditPaid(item)} style={{ padding: '5px 12px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 12, cursor: 'pointer' }}>✎</button>
                  <button onClick={() => removePaid(item.id)} style={{ padding: '5px 10px', background: 'none', border: `1px solid rgba(200,60,60,0.3)`, borderRadius: 3, color: '#c84040', fontSize: 12, cursor: 'pointer' }}>✕</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
