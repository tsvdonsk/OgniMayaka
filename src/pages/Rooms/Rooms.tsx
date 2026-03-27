import { useState } from 'react'
import clsx from 'clsx'
import { useData } from '../../context/DataContext'
import type { RoomItem } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import Lightbox from '../../components/Lightbox/Lightbox'
import type { LightboxItem } from '../../components/Lightbox/Lightbox'
import styles from './Rooms.module.scss'

function RoomCard({ room, onImageClick }: { room: RoomItem; onImageClick: () => void }) {
  const { t } = useLanguage()
  return (
    <div className={clsx(styles.card, room.highlight && styles.cardHighlight)}>
      <div className={styles.cardImgWrap} style={{ cursor: 'pointer' }} onClick={onImageClick}>
        <img src={room.img} alt={room.name} className={styles.cardImg} />
        <div className={styles.cardImgOverlay} />
        <span className={styles.cardCategory}>{room.category}</span>
        {room.highlight && (
          <span className={styles.cardTop}>{t('rooms_top')}</span>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{room.name}</h3>
        <p className={styles.cardDesc}>{room.desc}</p>
        <div className={styles.cardMeta}>
          {[
            { l: t('rooms_area'), v: room.area },
            { l: t('rooms_capacity'), v: room.capacity },
            { l: t('rooms_bed'), v: room.bed },
            { l: t('rooms_location'), v: room.floor },
          ].map(d => (
            <div key={d.l}>
              <p className={styles.cardMetaLabel}>{d.l}</p>
              <p className={styles.cardMetaValue}>{d.v}</p>
            </div>
          ))}
        </div>
        <div className={styles.cardFeatures}>
          {room.features.map(f => (
            <span key={f} className={styles.cardFeature}>{f}</span>
          ))}
        </div>
        <a
          href="https://xn----8sbajzomfh0p.xn--p1ai"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardBtn}
        >
          {t('rooms_book')}
        </a>
      </div>
    </div>
  )
}

export default function Rooms() {
  const { rooms } = useData()
  const { t } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lightboxItems: LightboxItem[] = rooms.map(r => ({ url: r.img, type: 'image', caption: r.name }))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.badge}>{t('rooms_title')}</span>
          <h1 className={styles.title}>{t('rooms_pageTitle')}</h1>
          <p className={styles.desc}>{t('rooms_pageDesc')}</p>
          <div className={styles.promo}>
            <span className={styles.promoIcon}>✦</span>
            <p className={styles.promoText}><strong>{t('rooms_promoDiscount')}</strong>{t('rooms_promoDetails')}</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} onImageClick={() => setLightboxIndex(i)} />
          ))}
        </div>

        <div className={styles.included}>
          <h3 className={styles.includedTitle}>{t('rooms_includedTitle')}</h3>
          <p className={styles.includedDesc}>{t('rooms_includedDesc')}</p>
          <div className={styles.includedGrid}>
            {[t('rooms_inc1'), t('rooms_inc2'), t('rooms_inc3'), t('rooms_inc4'), t('rooms_inc5'), t('rooms_inc6')].map(item => (
              <div key={item} className={styles.includedItem}>
                <span className={styles.includedIcon}>◈</span>
                <span className={styles.includedText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={i => setLightboxIndex(i)}
        />
      )}
    </div>
  )
}
