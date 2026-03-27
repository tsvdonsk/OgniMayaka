import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import styles from './News.module.scss'

export default function News() {
  const { news } = useData()
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)

  const published = news
    .filter(n => n.published)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.badge}>{t('nav_news')}</span>
        <h1 className={styles.title}>{t('news_title')}</h1>

        <div className={styles.list}>
          {published.map(item => {
            const open = expanded === item.id
            return (
              <article key={item.id} className={styles.card}>
                <button
                  className={styles.cardHeader}
                  onClick={() => setExpanded(open ? null : item.id)}
                >
                  <div className={styles.cardLeft}>
                    <span className={styles.emoji}>{item.emoji}</span>
                    <div className={styles.cardMeta}>
                      <p className={styles.cardTitle}>{item.title}</p>
                      <p className={styles.cardDate}>
                        {new Date(item.date).toLocaleDateString('ru-RU', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {item.media.find(m => m.type === 'image') && (
                    <img
                      src={item.media.find(m => m.type === 'image')!.url}
                      alt=""
                      className={styles.cardThumb}
                    />
                  )}
                  <span className={styles.arrow}>{open ? '▴' : '▾'}</span>
                </button>

                {open && (
                  <div className={styles.cardBody}>
                    {item.content.split('\n\n').map((para, i) => (
                      <p key={i} className={styles.para}>{para}</p>
                    ))}
                    {item.media.length > 0 && (
                      <div className={styles.mediaRow}>
                        {item.media.map(m => m.type === 'image' && (
                          <img key={m.id} src={m.url} alt={m.caption || ''} className={styles.mediaImg} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
