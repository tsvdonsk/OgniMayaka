import { useState } from 'react'
import { useData } from '../../context/DataContext'
import styles from './Home.module.scss'

export default function HeroNewsPanel() {
  const { news } = useData()
  const [expanded, setExpanded] = useState<string | null>(null)
  const published = news.filter(n => n.published).sort((a, b) => b.date.localeCompare(a.date))
  if (published.length === 0) return null

  return (
    <div className={styles.newsWrap}>
      <p className={styles.newsLabel}>Новости</p>
      <div className={styles.newsCards}>
        {published.map(item => (
          <div
            key={item.id}
            className={styles.newsCard}
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className={styles.newsCardTop}>
              <div className={styles.newsCardBody}>
                <div className={styles.newsCardMeta}>
                  <span style={{ fontSize: 14 }}>{item.emoji}</span>
                  <p className={styles.newsCardTitle}>{item.title}</p>
                </div>
                <p className={styles.newsCardDate}>
                  {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </p>
              </div>
              <span className={styles.newsCardArrow}>{expanded === item.id ? '▴' : '▾'}</span>
            </div>
            {expanded === item.id && (
              <div className={styles.newsExpanded}>
                <p className={styles.newsExpandedText}>{item.content}</p>
                {item.media.length > 0 && item.media[0].type === 'image' && (
                  <img src={item.media[0].url} alt="" className={styles.newsExpandedImg} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
