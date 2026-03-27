import { useEffect, useCallback } from 'react'
import styles from './Lightbox.module.scss'

export interface LightboxItem {
  url: string
  type: 'image' | 'video'
  caption?: string
}

interface Props {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNav: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNav }: Props) {
  const item = items[index]

  const prev = useCallback(() => {
    onNav((index - 1 + items.length) % items.length)
  }, [index, items.length, onNav])

  const next = useCallback(() => {
    onNav((index + 1) % items.length)
  }, [index, items.length, onNav])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(`.${styles.inner}`)) return
    if ((e.target as HTMLElement).closest(`.${styles.close}`)) return
    if ((e.target as HTMLElement).closest(`.${styles.navBtn}`)) return
    if (items.length > 1) {
      e.clientX < window.innerWidth / 2 ? prev() : next()
    } else {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.inner} onClick={e => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video
            key={item.url}
            src={item.url}
            controls
            autoPlay
            className={styles.media}
          />
        ) : (
          <img key={item.url} src={item.url} alt={item.caption || ''} className={styles.media} />
        )}
      </div>

      {item.caption && (
        <div className={styles.caption}>{item.caption}</div>
      )}

      {items.length > 1 && (
        <div className={styles.counter}>{index + 1} / {items.length}</div>
      )}

      <button className={styles.close} onClick={onClose} aria-label="Закрыть">✕</button>

      {items.length > 1 && (
        <>
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={prev} aria-label="Назад">‹</button>
          <button className={`${styles.navBtn} ${styles.next}`} onClick={next} aria-label="Вперёд">›</button>
        </>
      )}
    </div>
  )
}
