import clsx from 'clsx'
import { useData } from '../../context/DataContext'
import type { RoomItem } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import styles from './Rooms.module.scss'

function RoomCard({ room }: { room: RoomItem }) {
  const { t } = useLanguage()
  return (
    <div className={clsx(styles.card, room.highlight && styles.cardHighlight)}>
      <div className={styles.cardImgWrap}>
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.badge}>{t('rooms_title')}</span>
          <h1 className={styles.title}>Выберите свой номер</h1>
          <p className={styles.desc}>16 номеров и А-фрейм дом. От уютного стандарта до просторных апартаментов.</p>
          <div className={styles.promo}>
            <span className={styles.promoIcon}>✦</span>
            <p className={styles.promoText}><strong>Скидка 30%</strong> · 01.02–31.03.26 · будние дни · бассейн и сауна включены</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {rooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>

        <div className={styles.included}>
          <h3 className={styles.includedTitle}>Включено в стоимость проживания</h3>
          <p className={styles.includedDesc}>Для всех гостей, независимо от типа номера</p>
          <div className={styles.includedGrid}>
            {['Подогреваемый бассейн (10:00–22:00)', 'Финская сауна', 'Парковка на территории', 'Wi-Fi', 'Мангальная зона', 'Причал для судов'].map(item => (
              <div key={item} className={styles.includedItem}>
                <span className={styles.includedIcon}>◈</span>
                <span className={styles.includedText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
