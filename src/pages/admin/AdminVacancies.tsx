import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import type { VacancyItem } from '../../context/DataContext'

const emptyVacancy = (): VacancyItem => ({
  id: Date.now().toString(),
  title: '',
  department: '',
  salary: '',
  schedule: '',
  requirements: '',
  duties: '',
  conditions: '',
  contact: '+7 (928) 77-33-550',
  published: false,
})

function VacancyForm({ item, onSave, onCancel }: { item: VacancyItem; onSave: (v: VacancyItem) => void; onCancel: () => void }) {
  const { C } = useTheme()
  const [form, setForm] = useState<VacancyItem>(item)
  const set = (k: keyof VacancyItem, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const inp = { background: C.isDark ? 'rgba(42,36,32,0.3)' : '#fff', border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, padding: '10px 12px', fontSize: 14, width: '100%', boxSizing: 'border-box' as const, outline: 'none' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Должность *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Например: Администратор" style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Отдел</label>
          <input value={form.department} onChange={e => set('department', e.target.value)} placeholder="Например: Служба размещения" style={inp} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Зарплата</label>
          <input value={form.salary} onChange={e => set('salary', e.target.value)} placeholder="от 35 000 ₽" style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>График работы</label>
          <input value={form.schedule} onChange={e => set('schedule', e.target.value)} placeholder="2/2, 5/2 и т.д." style={inp} />
        </div>
        <div>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Контакт для отклика</label>
          <input value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="+7 (928) 77-33-550" style={inp} />
        </div>
      </div>

      {[
        { key: 'requirements' as const, label: 'Требования', placeholder: 'Каждое требование — отдельная строка' },
        { key: 'duties' as const, label: 'Обязанности', placeholder: 'Каждая обязанность — отдельная строка' },
        { key: 'conditions' as const, label: 'Условия', placeholder: 'Каждое условие — отдельная строка' },
      ].map(f => (
        <div key={f.key}>
          <label style={{ display: 'block', color: C.ghost, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{f.label}</label>
          <textarea
            value={form[f.key]}
            onChange={e => set(f.key, e.target.value)}
            rows={4}
            placeholder={f.placeholder}
            style={{ ...inp, resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit' }}
          />
        </div>
      ))}

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

export default function AdminVacancies() {
  const { C } = useTheme()
  const { vacancies, setVacancies } = useData()
  const [editing, setEditing] = useState<VacancyItem | null>(null)
  const [isNew, setIsNew] = useState(false)

  const save = (v: VacancyItem) => {
    if (isNew) setVacancies([v, ...vacancies])
    else setVacancies(vacancies.map(x => x.id === v.id ? v : x))
    setEditing(null); setIsNew(false)
  }
  const remove = (id: string) => { if (confirm('Удалить вакансию?')) setVacancies(vacancies.filter(x => x.id !== id)) }
  const togglePub = (id: string) => setVacancies(vacancies.map(x => x.id === id ? { ...x, published: !x.published } : x))

  if (editing) return (
    <div>
      <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400, marginBottom: 28 }}>{isNew ? 'Новая вакансия' : 'Редактировать вакансию'}</h1>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '28px 32px' }}>
        <VacancyForm item={editing} onSave={save} onCancel={() => { setEditing(null); setIsNew(false) }} />
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 400 }}>Вакансии</h1>
        <button onClick={() => { setEditing(emptyVacancy()); setIsNew(true) }}
          style={{ padding: '10px 20px', background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: 'none', borderRadius: 4, color: '#080806', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em' }}>
          + Добавить вакансию
        </button>
      </div>

      {vacancies.length === 0 && <p style={{ color: C.ghost, fontSize: 14 }}>Вакансий пока нет.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {vacancies.map(item => (
          <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: C.text, fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{item.title || 'Без названия'}</p>
              <p style={{ color: C.ghost, fontSize: 12 }}>{item.department} · {item.salary} · {item.schedule}</p>
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
